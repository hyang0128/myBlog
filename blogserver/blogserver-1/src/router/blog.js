const {
    getList,
    getDetail
} = require('../controller/blog')

const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]

    //获取博客列表
    if (method === "GET" && path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword)
        return new SuccessModel(listData, "blog list")
    }

    //获取博客详情
    if (method === "GET" && path === '/api/blog/detail') {
        const id = req.query.id
        const detailData = getDetail(id)
        return new SuccessModel(detailData, 'blog Detail')
    }

    //新建博客
    if (method === "POST" && path === '/api/blog/add') {
        return {
            msg: 'Add blog'
        }
    }

    //编辑博客
    if (method === "POST" && path === '/api/blog/update') {
        return {
            msg: 'Edit blog'
        }
    }

    //删除博客
    if (method === "POST" && path === '/api/blog/delete') {
        return {
            msg: 'delete blog'
        }
    }
}

module.exports = handleBlogRouter