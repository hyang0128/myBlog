const mysql = require('mysql')
const {
    MYSQL_CONF
} = require('../config/db')

const con = mysql.createConnection(MYSQL_CONF)

con.connect()

function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, res) => {
            if (err) {
                console.error(err)
                reject(err)
            }
            resolve(res)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}