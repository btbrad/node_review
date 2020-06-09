const http = require('http')
const qs = require('querystring')
const multiparty = require('multiparty')

http
  .createServer((req, res) => {
    // let arr = []
    // req.on('data', (buffer) => {
    //   arr.push(buffer)
    // })
    // req.on('end', () => {
    //   let query = qs.parse(Buffer.concat(arr).toString())
    //   console.log(query)
    // })
    if (req.url === '/upload' && req.method === 'POST') {
      let form = new multiparty.Form({
        uploadDir: './database',
      })

      form.parse(req)
      form.on('field', (name, value) => {
        console.log('字段', name, value)
      })
      form.on('file', (name, file) => {
        console.log('文件', name, file)
      })
      form.on('close', () => {
        console.log('表单解析完成')
      })
    }
  })
  .listen(8080, () => {
    console.log('server si running at http://localhost:8080')
  })
