
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

  // 创建表
  let ret = await connection.execute(`
    CREATE TABLE IF NOT EXISTS test (
      id INT NOT NULL AUTO_INCREMENT,
      message VARCHAR(45) NULL,
      PRIMARY KEY (id))
  `)
    // console.log('ret', ret)

    // 插入一条数据
    // ret = await connection.execute(`
    //   INSERT INTO test(message) VALUES(?)
    // `, ['abc'])
    // console.log(ret)

    // 查询
    const [rows, fields] = await connection.execute(`
      SELECT * FROM test
    `)
    console.log(JSON.stringify(rows))
})()