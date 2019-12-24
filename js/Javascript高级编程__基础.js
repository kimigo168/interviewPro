// 3.1标识符
// 第一个字符必须是一个字母，下划线或美元符号
// 其他字符可以是字母，下划线、美元符号或数字

// 3.2 数据类型
// Undefined, Null, Boolean, Number 和 String,  复杂Object, ES6 Symbol

typeof undefined // "undefined"
typeof false // "boolean"
typeof 1 // "number"
typeof '123' // "string"
typeof {} // "object"
typeof null // "object"
typeof function () {} // "function"
console.log(null == undefined) // true

// sth instanceof  b,所有的引用类型都是Object的实例，检测一个引用类型和Object构造函数时，
// instanceof始终返回true,检测基本类型，返回false

// 浮点数精度问题  0.1 + 0.2 = 0.300000004
console.log(1/0) // Infinity
console.log(-1/0) // -Infinity
console.log(0/0) // NaN

console.log(isNaN(NaN)) // true
console.log(isNaN(10)) // false
console.log(isNaN('10')) // false,可以被转化为数字10
console.log(isNaN('blue')) // true 不能被转换成数值
console.log(isNaN(true)) // false,可以被转换为数字1

// 3.3数值转换
// Number() 可以将任何数据类型
// parseInt() 和 parseFloat(),专门把字符串转换成数值

Number(null) // 0
Number(undefined) // NaN

parseInt("1234blue") // 1234
parseInt(" ") // NaN
parseInt("070") // 56,八进制
parseInt("70") // 70,十进制
parseInt("0xf") // 15,十六进制

parseInt('0xAF', 16) // 175,带基数
parseInt("AF") // NaN

parseInt("10", 8) // 8,按八进制解析

parseFloat("22.5") // 22.5
parseFloat("22.34.5") // 22.34
parseFloat("0908.5") // 908.5

// 3.4 Object类型
// Object每个实例都具有下列属性和方法：
// constructor: 保存着创建当前对象的函数
// hasOwnProperty(propertyName): 用于检查给定的属性在当前对象实例中是否存在（而不是实例的原型中）！！
// isPrototypeOf(object)：用于检查传入的对象是否是传入对象的原型
// propertyIsEnumerable(propertyName)：
//  toLocaleString()：返回对象的字符串表示，该字符串与执行环境的地区对应。
// toString()：返回对象的字符串表示。
// valueOf()：返回对象的字符串、数值或布尔值表示。通常与 toString()方法的返回值相同。

// hasOwnProperty(propertyName):
// eg:
var o = new Object()
o.prop = 'exist'
o.hasOwnProperty('prop') // true

// isPrototypeOf(object)
// eg:
function object1() {}
function object2() {}
object1.prototype = Object.create(object2.prototype)
const object3 = new object1()
console.log(object1.prototype.isPrototypeOf(object3)) // true
console.log(object2.prototype.isPrototypeOf(object3)); // true

// 3.5
// ~ 按位非 二进制
var num1 = 25
var num2 = ~num1 - 1 // "-26"

// & 按位与 二进制
var result = 25 & 3 // 1

// | 按位或 二进制

// 按位异或 ^
var result = 25 ^ 3 // 26

// << 左移
// >> 右移

null == undefined // true
"NaN" == NaN // false
5 == NaN // false
NaN == NaN // false
NaN != NaN // true
false == 0 // true
true == 1 // true
true == 2 // false
undefined == 0 // false
null == 0 // false
"5" == 5 // false


// for in 循环属性名顺序不可测

// 3.5 break vs continue :break结束循环，不往下执行，continue是结束本次循环，继续下一次
// (1) break
var num = 0;
for (var i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    break;
  }
  num++;
}
alert(num); // 4
// (2) continue
var num = 0;
for (var i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    continue;
  }
  num++;
}
alert(num); // 4

// swtich (expression) {
//   case value: statement
//     break;
//   case value: statement
//     break;
//     default: statement
// }
P86

//4.1 传递参数
function setName (obj) {
  obj.name = 'Nicholas'
  obj = new Object() // 变量引用的是局部变量，局部对象会在函数执行完立即销毁
  obj.name = 'Greg'
}
var person = new Object()
setName(person)
alert(person.name) // 'Nicholas'

// 5.2 Array
// ECMAScript数组与其他语言数组区别，每一项可以保存任何类型的数据

if (Array.isArray(value)) {
  // 判断是否是数组
}
var colors = ['red', 'blue', 'green']
console.log(colors.toString()) // red,blue,green
console.log(colors.valueOf()) // ['red', 'blue', 'green']
// alert要求接收字符串参数，它会在后台调用toString()方法
alert(colors) // red, blue, green alert会转换成字符串

// 栈方法，(LIFO:后进先出)在栈顶插入和移除
// push()：从栈顶插入元素，并返回修改后数组长度
var colors = new Array()
var count = colors.push('red', 'green') // 2
count = colors.push('black') // 3
// pop():从数组末尾移除最后一项，并返回移除的项
var item = colors.pop() // 'black'

// 队列方法：（FIFO:先进先出）
var colors = new Array()
var count = colors.push('red', 'green') // 2
count = colors.push('black') // 3
var item = colors.shift(); // 'red'

// 反队列
var colors = new Array()
var count = colors.unshift('red', 'green') // 2
count = colors.unshift('black') // 3
var item = colors.pop() // 'green'
console.log(colors) // ['black', 'red']

// push()与unshift() 首尾反，返回一致
// pop() 与 shift() 首尾反，返回一致

// 5.3 重排序方法
// reverse() 和 sort()

// sort()升序排序，最小在前，最大在后，但先会调用每个数组项toString()先转换成字符串

// 5.4 
// concat() 拼接一个元素或数组，返回一个副本，原数组不变
// slice() 切割一段数组，start,end,并返回，原数组不变

// splice(0, 2) // 删除数组前两项，并返回，原数组会改变

// 位置方法：indexOf(), lastIndexOf()

// 迭代方法：
// every():对数组每一项执行给定函数，如果每一项都返回true,则返回true
// filter():对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。
// forEach(): 对数组中的每一项运行给定函数。这个方法(没有返回值)。
// map(): 对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
// some():对数组中的每一项运行给定函数，如果该函数对任一项返回 true，则返回 true。

// 归并方法：reduce() 和 reduceRight()

// 5.5 字符串方法：
// slice(), substr(), substring()方法 ，传负数时，返回结果不一样
// 其中，slice()方法会将传入的负值与字符串的长度相加
// substr()方法将负的第一个参数加上字符串的长度，而将负的第二个参数转换为 0。
// 最后，substring()方法会把所有负值参数都转换为 0

// indexOf(),lastIndexOf()
// trim()

// toLowerCase(), toUpperCase()
// toLocalLowerCase(),toLocalUpperCase()针对特定地区

// split(',')
// String.fromCharCode()

// 5.6 Global对象
// encodeURI() 和 encodeURIComponent() 都可以对URI进行编码
// 二者区别？
// (1) encodeURI主要是对整个URI,encodeURIComponent()是对某一段
// (2) encodeURI()不会对本身属于 URI 的特殊字符进行编码，例如冒号、正斜杠、
// 问号和井字号,只对空格， %20，而encodeURIComponent()方法则会使用对应的编码替换所有非字母数字字符

Math.ceil(); // 向上取整
Math.floor(); //向下取整
Math.round(); // 四舍五入

// <html>
//   <head>
//     <title></title>
//   </head>
//   <frameset>
//     <frame src="frame.htm" name="topFrame">
//     <frameset cols="50%, 50%">
//       <frame src="anotherframe.htm" name="leftFrame">
//     </frameset>
//   </frameset>
// </html>
// window.frames[0]或window.frames['topFrame']或top.frames[0]

// 8.1窗口大小
// 页面视口信息
clientWidth = document.documentElement.clientWidth || document.body.clientWidth; // 标准，混杂模式

// window.resizeTo(100, 100) 或 window.resizeBy(100, 50)
window.open(url, param2) // param2可以是_self,_parent,_top,_blank
// window.open("http://www.wrox.com/","wroxWindow","height=400,width=400,top=10,left=10,resizable=yes"); 
// 8.2
// location.search 返回问号到URL末尾的所有内容

function getQueryStringArgs () {
  var qs = (location.search.length > 0 ? location.search.substring(1) : '')
  // 保存数据的对象
  var args = {}
  var items = qs.length > 0 ? qs.split('&') : []
  var item = null
  var name = null
  var value = null
  for (let i = 0; i < items.length; i++) {
    item = items[i].split('=')
    name = decodeURIComponent(item[0])
    value = decodeURIComponent(item[1])
    if (name.length) {
      args[name] = value;
    }
  }
  return args;
}
// URL http://www.wrox.com/WileyCDA/
location.hash = '#section1'
location.search = '?q=javascript'
location.hostname = 'www.yahoo.com'
location.pathname = 'mydir'
location.port = 8080
location.replace('http://www.wrox.com/')

history.go(-1)
history.back()
history.forward()
