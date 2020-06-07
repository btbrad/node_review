const http = require('http')
const qs = require('querystring')
const url = require('url')

http
  .createServer((req, res) => {
    console.log(req.url)
    // let [url, query] = req.url.split('?')
    // let qArr = query.split('&')
    // let obj = {}
    // qArr.forEach((item) => {
    //   let arr = item.split('=')
    //   obj[arr[0]] = arr[1]
    // })
    // console.log(obj)
    // console.log(url)
    // let params = qs.parse(query)
    // console.log(params)
    let { pathname, query } = url.parse(req.url, true)
    console.log(pathname, query)
  })
  .listen(8080, () => {
    console.log('server is running at http://localhost:8080')
  })
