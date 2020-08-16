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

const handleBlogRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const id = req.query.id

    //获取博客列表
    if (method === "GET" && path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword)
        return new SuccessModel(listData, "blog list")
    }

    //获取博客详情
    if (method === "GET" && path === '/api/blog/detail') {
        const detailData = getDetail(id)
        return new SuccessModel(detailData, 'blog Detail')
    }

    //新建博客
    if (method === "POST" && path === '/api/blog/add') {
        const data = newBlog(req.body)
        return new SuccessModel(data, 'new blog')
    }

    //编辑博客
    if (method === "POST" && path === '/api/blog/update') {
        const data = updateBlog(id, req.body);
        return new SuccessModel(data, 'update');
    }

    //删除博客
    if (method === "POST" && path === '/api/blog/delete') {
        const result = deleteBlog(id);
        return result ? new SuccessModel() : new ErrorModel();
    }
}

module.exports = handleBlogRouter