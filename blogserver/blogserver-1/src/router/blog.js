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
        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData, "blog list")
        })
    }

    //获取博客详情
    if (method === "GET" && path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then(detailData => {
            return new SuccessModel(detailData, "blog detail")
        })
    }

    //新建博客
    if (method === "POST" && path === '/api/blog/add') {
        const author = 'zhangsan'
        req.body.author = author
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data, 'new blog')
        })
    }

    //编辑博客
    if (method === "POST" && path === '/api/blog/update') {
        const result = updateBlog(id, req.body);
        return result.then(data => {
            if (data) {
                return new SuccessModel({
                    id
                }, 'update');
            } else {
                return new ErrorModel('update fail')
            }
        })
    }

    //删除博客
    if (method === "POST" && path === '/api/blog/delete') {
        const author = 'zhangsan'
        const result = deleteBlog(id, author);
        return result.then(data => {
            if (data) {
                return new SuccessModel({
                    id
                }, 'delete');
            } else {
                return new ErrorModel('delete fail')
            }
        })
    }
}

module.exports = handleBlogRouter