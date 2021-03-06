const {
    isLogin
} = require('../controller/user')
const { set } = require('../db/redis')


const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')


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
                req.session.username = data.username
                req.session.realname = data.realname
                // 同步到 redis
                set(req.sessionId, req.session)
                return new SuccessModel('登录成功')
            }
            return new ErrorModel('登录失败')
        })
    }
}

module.exports = handleUserRouter