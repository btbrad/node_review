const db = require('../libs/database')

module.exports = async (res, get, post, files) => {
  let { title, price, count } = post
  if (!title || !price || !count) {
    res.writeJson({
      error: 1,
      msg: 'database error',
    })
    res.end()
  }

  price = Number(price)
  count = Number(count)

  if (Number.isNaN(price) | Number.isNaN(count)) {
    res.writeJson({
      error: 1,
      msg: 'database error',
    })
    res.end()
    return
  }

  try {
    let data = await db.query(
      'insert into item_table (title, price, count) values (?, ?, ?)',
      [title, price, count]
    ) // 防止注入攻击
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
