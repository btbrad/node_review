
(async() => {
  const mysql = require('mysql2/promise')
  const cfg = {
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'node-test'
  }
  const connection = await mysql.createConnection(cfg)
  // console.log('connection', connection)

  let ret = await connection.execute(`
    CREATE TABLE IF NOT EXISTS test (
      id INT NOT NULL AUTO_INCREMENT,
      message VARCHAR(45) NULL,
      PRIMARY KEY (id))
  `)
    console.log('ret', ret)
})()