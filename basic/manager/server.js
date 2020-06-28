const config = require('./config')
const db = require('./libs/database')

;(async () => {
  let res = await db.query('SELECT * FROM item_table')
  console.log(res)
})()
