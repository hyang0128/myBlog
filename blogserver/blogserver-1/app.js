const queryString = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

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

    //解析postData
    getPostData(req).then(postData => {
        req.body = postData
        
        const blogdata = handleBlogRouter(req, res)
        if (blogdata) {
            res.end(JSON.stringify(blogdata))
            return
        }

        const userdata = handleUserRouter(req, res)
        if (userdata) {
            res.end(JSON.stringify(userdata))
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