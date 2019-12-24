// 1.字符串新增方法
// includes()
let s = 'Hello World!'
s.includes('o') // true
s.startsWith('Hello') // true
s.endsWith('!') // true

// 模板字符串
// String.raw() 用来充当模板字符串的处理函数，返回一个斜杠都被转义


// 2.Number.parseFloat() ,Number.parseInt() 
// 将parseFloat(),parseInt()挂载到Number对象上

// Number.isInterger(23) 判断是否整数

// 3.箭头函数
// (1)函数体内this对象，就是定义时所在对象，而不是使用时所在对象
// this 对象的指向是可变的，但是在箭头函数中，它是固定的。
// (2)不可当作构造函数，不可以使用new

// 下面代码中有几个this? 1个，就是foo函数的
function foo () {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id)
      }
    }
  }
}
var f = foo.call({id: 1}) // id: 1
var t1 = f().call({id: 2})// id: 1
var t2 = f()().call({id: 2}) // id: 2

// 4.什么是尾调用？某个函数最后一步，是调用另一个函数
function f(x) {
  return g(x)
}

// 5.数组方法？
Array.isArray(arr) // true or false
Math.max.apply(null, [14, 3, 17])
// Math.max(...[14, 3, 77]) 等同于 Math.max(14, 3, 77)
let arr1 = [1, 2, 3]
let arr2 = [3, 4, 5]
arr1.push(...arr2)

// 合并数组
// es5
[1, 2].concat(more)
// es6
// [1, 2, ...more]

// Array.from() 将类数组对象和可遍历对象转成真正数组
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
}
// ES5
var arr1 = [].slice.call(arrayLike) // ['a', 'b', 'c']
// ES6
let arr2 = Array.from(arrayLike) // ['a','b','c']

// Array.of(3, 11, 8) // [3, 11, 8]

// Array.fill() 用于空数组的初始化非常方便

// entries(),keys(),values()
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1
for (let elem of ['a', 'b'].values()) {
  console.log(elem)
}
// 'a'
// 'b'
for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem)
}
// 0 'a'
// 1 'b'

// includes()
[1, 2, 3].includes(2) // true

// Object.keys(),Object.values(),Object.entires()

// 6. Proxy,属于元编程,拦截，代理
var obj = new Proxy ({}, {
  get: function (target, key, receiver) {
    return Reflect.get(target, key, receiver)
  },
  set: function (target, key, value, receiver) {
    return Reflect.set(target, key, value, receiver)
  }
})
var proxy = new Proxy({}, {
  get: function (target, property) {
    return 35
  }
})
proxy.time // 35
proxy.name // 35
proxy.title // 35

//7 Promise
// Promise是异步编程的一种解决方案，所谓promise，简单说是一个容器，里面保存着某个未来才会结束的事件(通常是一个异步操作)的结果。从语法上说，promise是一个对象，从它可以获取异步操作信息

// promise三种状态：
// pending(进行中), fulfilled(已成功), rejected(已失败)
// 避免层层嵌套的回调函数

// const p = Promise.all([p1, p2, p3]) 多个promise实例
// p1,p2,p3都fulfilled,p 才fulfilled
// 有一个reject,就reject

// const p = Promise.race([p1,p2,p3]) 
// 有一个实例率先改变,p就跟着改变

// Promise.resolve() 和 Promise.reject()

// 8 结构赋值
// ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为结构。