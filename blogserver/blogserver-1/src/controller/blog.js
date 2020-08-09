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

module.exports = {
    getList,
    getDetail
}