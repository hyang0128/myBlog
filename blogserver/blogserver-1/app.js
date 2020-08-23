const queryString = require('querystring')
const {
    get,
    set
} = require('./src/db/redis')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    console.log(d.toGMTString())
    return d.toGMTString()
}

// const SESSION_DATA = {}

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    //设置返回格式
    res.setHeader('Content-type', 'application/json')

    const url = req.url

    //解析query
    req.query = queryString.parse(url.split('?')[1])

    //解析cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        let arr = item.split('='),
            key = arr[0].trim(),
            val = arr[1].trim();
        req.cookie[key] = val;
    })

    //解析session
    // let needSetCookie = false
    // let userId = req.cookie.userId
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }

    // } else {
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]

    // 解析 session （使用 redis）
    let needSetCookie = false
    let userId = req.cookie.userid
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        // 初始化 redis 中的 session 值
        set(userId, {})
    }
    // 获取 session
    req.sessionId = userId
    // console.log(req.cookie)
    get(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            // 初始化 redis 中的 session 值
            set(req.sessionId, {})
            // 设置 session
            req.session = {}
        } else {
            // 设置 session
            req.session = sessionData
        }
        // console.log('req.session ', req.session)

        // 处理 post data
        return getPostData(req)
    }).then(postData => {
        req.body = postData

        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogdata => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/;httpOnly;expires=${getCookieExpires()}`);
                }
                if (blogdata) {
                    res.end(JSON.stringify(blogdata))
                }
            })
            return
        }

        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userdata => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/;httpOnly;expires=${getCookieExpires()}`);
                }
                if (userdata) {
                    res.end(JSON.stringify(userdata))
                }
            })
            return
        }

        //404
        res.writeHead(404, {
            "Content-type": "text/plain"
        })
        res.write("404 Not Found\n")
        res.end()
    })
}

module.exports = serverHandle