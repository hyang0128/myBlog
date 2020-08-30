var express = require('express');
var router = express.Router();
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog')

const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

const loginCheck = require('../middleware/loginCheck')

router.get('/list', (req, res, next) => {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    if (req.query.isadmin) {
        if (req.session.username == null) {
            res.json(new ErrorModel('未登录'))
            return
        }

        author = req.session.username
    }

    const result = getList(author, keyword);
    result.then(listData => {
        res.json(new SuccessModel(listData, "blog list"))
    })
});
router.get('/detail', (req, res, next) => {
    const id = req.query.id
    const result = getDetail(id)
    result.then(detailData => {
        res.json(new SuccessModel(detailData, "blog detail"))
    })
});

router.post('/add', loginCheck, (req, res, next) => {
    const author = req.session.username
    req.body.author = author
    const result = newBlog(req.body)
    result.then(data => {
        res.json(new SuccessModel(data, 'new blog'))
    })
});

router.post('/update', loginCheck, (req, res, next) => {
    const id = req.query.id
    const result = updateBlog(id, req.body);
    result.then(data => {
        if (data) {
            res.json(new SuccessModel({
                id
            }, 'update'));
        } else {
            res.json(new ErrorModel('update fail'))
        }
    })
});


router.post('/delete', loginCheck, (req, res, next) => {
    const author = req.session.username
    const id = req.query.id
    const result = deleteBlog(id, author);
    result.then(data => {
        if (data) {
            res.json(new SuccessModel({
                id
            }, 'delete'));
        } else {
            res.json(new ErrorModel('delete fail'))
        }
    })
});
module.exports = router;