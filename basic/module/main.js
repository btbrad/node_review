const counter1 = require('./util/counter')
const counter2 = require('./util/counter')

console.log(counter1.count())
console.log(counter2.count())
console.log(counter2.count())

// counter.js并没有因为被require了两次而初始化两次
