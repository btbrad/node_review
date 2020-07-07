const db = require('../libs/database')

module.exports = async (res, get, post, files) => {
  try {
    let data = await db.query(`Select * from item_table`)
    res.writeJson({
      error: 0,
      data,
    })
  } catch (e) {
    console.log(`database error:${e}`)
    res.writeJson({
      error: 1,
      msg: 'database error',
    })
  }
  res.end()
}
