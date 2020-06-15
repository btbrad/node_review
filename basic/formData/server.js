const http = require('http')
const multiparty = require('multiparty')

http
  .createServer((req, res) => {
    if (req.method === 'POST') {
      let form = new multiparty.Form({ uploadDir: './upload/' })

      form.parse(req)

      form.on('field', (name, value) => {
        console.log('filed:', name, value)
      })

      form.on('file', (name, value) => {
        console.log('file:', name, value)
      })

      form.on('close', () => {
        console.log('完事')
      })
    }
  })
  .listen(8080, () => {
    console.log('server is running at http://localhost:8080')
  })
