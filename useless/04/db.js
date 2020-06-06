// 客户端
const MongoClient = require('mongodb').MongoClient;
// 连接URL
const url = 'mongodb://localhost:27017';
// 数据库名
const dbName = 'test';
(async function() {
  // 0.创建客户端
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    // 1.连接数据库(异步)
    await client.connect();
    console.log('连接成功');
  } catch (error) {
    console.error(error);
  }
  client.close();
})();

/**
 *  want to conquer MongoDB in 2 hours, no Way !
 */