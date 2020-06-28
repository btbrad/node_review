const path = require('path')

module.exports = {
  // database
  DB_HOST: 'localhost',
  DB_PORT: 3306,
  DB_USER: 'root',
  DB_PASS: '123456',
  DB_NAME: 'node-test20200623',

  // http
  HTTP_PORT: 8080,
  HTTP_ROOT: path.resolve(__dirname, '../static/'),
  HTTP_UPLOAD: path.resolve(__dirname, '../static/upload/'),
}
