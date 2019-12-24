// 题目1：
var b = 1
console.log(b++) // 1
console.log(++b) // 3

// 题目2：
function test () {
  message = 'hi' // 省略了var,message成为全局变量，严格模式下会报错
}
test()
alert(message) // hi

// 题目3：判断null
var tmp = null
if (!tmp && typeof tmp != 'undefined' && tmp != 0) {
  alert('null')
}
// 题目4：数组大小排序
let arr = [0, 1, 4, 2, 10]
arr.sort(compare) // 升序
function compare (value1, value2) {
  if (value1 < value2) {
    return 1
  } else if (value1 > value2) {
    return -1
  } else {
    return 0
  }
}

// 或
[1, 2, 3, 4].sort((a, b) => b -a); // 降序 [4, 3, 2, 1] 
// 题目5：数组求和
var values = [1,2,3,4,5]
var sum = values.reduce(function (prev, cur, index, array){
  return prev + cur
})

// 题目6：求一组数中最大最小值
var max = Math.max(3, 54, 32, 16)
var values = [1, 3, 4, 5, 6]
max = Math.max.apply(Math, values)

// 题目7：箭头函数this指向问题？
// (1) 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
// this对象的指向是可变的，但在箭头函数中，它是固定的
// 即可以绑定定义时所在的作用域，而不是运行时所在的作用域
// eg: 
var a = 3
function foo() {
  setTimeout(function () {
    console.log(this.a)
  }, 100)
}
foo.call({a: 2}); //3
// 如果改变箭头函数指向，则是2
// (2)不可以当作构造函数，不可以用new,否则报错

// 题目8：浅拷贝和深拷贝？
// 浅拷贝方法：
// (1)Object.assign()
// const obj = /*....*/
// const copy = Object.assign({}, obj)
// (2) 对象结构运算

// 深拷贝方法：
// （1）JSON.parse()
// 缺点：不能处理循环对象，一个节点引用父级，父级又引用子级；
// Map,Set,RegExp, Date, ArrayBuffer 和其他内置类型在进行序列化时会丢失
// （2） MessageChannel
function structuralClone(obj) {
  return new Promise(resolve => {
    const {port1, port2} = new MessageChannel();
    port2.onmessage = ev => resolve(ev.data);
    port1.postMessage(obj);
  });
}

// const obj = /* ... */;
const clone = await structuralClone(obj);
// （3）
function structuralClone(obj) {
  const oldState = history.state;
  history.replaceState(obj, document.title);
  const copy = history.state;
  history.replaceState(oldState, document.title);
  return copy;
}

// const obj = /* ... */;
const clone = structuralClone(obj); 
// （3）Notification 
function structuralClone(obj) {
  return new Notification('', {data: obj, silent: true}).data;
}

// const obj = /* ... */;
const clone = structuralClone(obj);

// (4)
const deepClone = data => {
  if (data === null || typeof data !== 'object') return data;
  const obj = Array.isArray(data) ? [] : {};
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      obj.push(deepClone(data[i]));
    }
  } else {
    for (let key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
}
// 总结：
// 如果您没有循环对象，并且不需要保留内置类型，则可以使用跨浏览器的JSON.parse(JSON.stringify())获得最快的克隆性能，这让我感到非常惊讶。


// 题目8：数组去重
Array.from(new Set([1,2,3,3,4]))
// 或
// [...new Set([1,2,3,3,4])]

// 题目9: Ajax
// 什么是ajax?客户端与服务端,可以在不刷新整个浏览器的情况下,与服务器进行异步通讯技术

// ajax原理?
// 简单说,通过xmlHttpRequest对象来向服务器发送异步请求,从服务器获得数据,然后用javascript来操作DOM而更新页面
// XMLHttpRequest是ajax的核心机制,它是一种支持异步请求的技术.

// 题目10：
var name = 'World';
(function () {
  console.log('name', name)
  console.log(typeof name === 'undefined') // true
  console.log(undefined == 'undefined') // false
  if (typeof name === undefined) {
    var name = 'Jack'
    console.log('Goodbye ' + name)
  } else {
    console.log('Hello ' + name) // Hello undefined
  }
})()
// 传参进入
(function (name){})(name)

// 题目11：执行顺序？
setTimeout(() => {
  console.log('a')
})
var p = new Promise((resolve, reject) => {
  debugger;
  console.log('b')
  resolve('c')
  console.log(p) 
  console.log(222)
  throw new Error('error ...')
  console.log('d')
}).then(console.log)
console.log('e')
p.then(console.log)
