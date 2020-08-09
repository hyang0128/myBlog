const http = require('http');
const queryString = require('querystring');

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0]
    const query = queueMicrotask.parse(url.split('?')[1])

    res.setHeader('Content-type', 'application/json')

})

server.listen(8000)