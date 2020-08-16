const {
    isLogin
} = require('../controller/user')



const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    console.log(d.toGMTString())
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    //登录
    if (method === "POST" && path === '/api/user/login') {
        const {
            username,
            password
        } = req.body
        const result = isLogin(username, password)
        return result.then(data => {
            if (data.username) {
                res.setHeader('Set-Cookie', `username=${username}; path=/;httpOnly;expires=${getCookieExpires()}`);
                return new SuccessModel('登录成功')
            }
            return new ErrorModel('登录失败')
        })
    }
}

module.exports = handleUserRouter