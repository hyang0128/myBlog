const handleUserRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]


    //登录
    if (method === "POST" && path === '/api/user/login') {
        return {
            msg: 'is Login'
        }
    }
}

module.exports = handleUserRouter