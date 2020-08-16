const getList = (auhor, keyword) => {
    return [{
        id: 1,
        title: 'title a',
        content: 'content A',
        createTime: 11111111111,
        author: 'sansan'
    }, {
        id: 2,
        title: 'title b',
        content: 'content b',
        createTime: 11111111111,
        author: 'sanss'
    }]
}

const getDetail = (id) => {
    return {
        id: 1,
        title: 'title a',
        content: 'content A',
        createTime: 11111111111,
        author: 'sansan'
    }
}

const newBlog = (blogData = {}) => {
    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) => {
    return {
        id: id
    }
}

const deleteBlog = (id) => {
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}