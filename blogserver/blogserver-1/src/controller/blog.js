const {
    exec,
    escape
} = require('../db/mysql')
const xss = require('xss')
const getList = (author, keyword) => {
    author = escape(author)
    // keyword = escape(keyword)
    let sql = `select id,title,content,createtime,author from blogs where 1=1 `;
    if (author) {
        sql += `and author=${author} `
    }
    if (keyword) {
        sql += `and title like %'${keyword}'% `
    }
    sql += `order by createtime desc;`
    return exec(sql)
}

const getDetail = (id) => {
    id = escape(id)
    let sql = `select * from blogs where id=${id}`;
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    let title = escape(xss(blogData.title)),
        content = escape(blogData.content),
        author = escape(blogData.author),
        createTime = Date.now();
    let sql = `insert into blogs (title,content,createtime,author) values(${title},${content},${createTime},${author})`
    return exec(sql).then(insertData => {
        // console.log('insert', insertData)
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    id = escape(id)
    let title = escape(blogData.title),
        content = escape(blogData.content);
    let sql = `update blogs set title = ${title},content=${content} where id=${id}`
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const deleteBlog = (id, author) => {
    id = escape(id)
    author = escape(author)
    let sql = `delete from blogs where id=${id} and author=${author}`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}