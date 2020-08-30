var express = require('express');
var router = express.Router();
const {
    isLogin
} = require('../controller/user')


const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

router.post('/login', function (req, res, next) {
    const {
        username,
        password
    } = req.body
    const result = isLogin(username, password)
    result.then(data => {
        if (data.username) {
            req.session.username = data.username
            req.session.realname = data.realname
            res.json(new SuccessModel('登录成功'))
            return
        }
        res.json(new ErrorModel('登录失败'))
    })
});

module.exports = router;