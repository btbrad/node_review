const db = require('../libs/database')

module.exports = async (res, get, post, files) => {
  let { id } = get
  try {
    let data = await db.query('delete from item_table where id=?', id)
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
