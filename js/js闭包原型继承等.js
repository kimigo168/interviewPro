// 1 执行环境：定义了变量或函数有权访问其他数据
// 每个执行环境都有与之关联的变量对象，保存着变量和函数

// 当代码在一个环境中，会创建变量对象的一个作用域链
// 作用域链：保证对执行环境有权访问的所有变量和函数的有序访问。

// 面向对象编程
// 2.1 对象的数据属性：
// [[Configurable]]: 表示能否通过delete删除属性从而重新定义属性，能否修改属性特性，或者能否把属性修改为访问器属性,或直接在对象上定义属性。默认true
// [[Enumerable]]: 表示能否通过for-in 循环返回属性，默认true。
// [[Writable]]:表示能否修改属性值，前面直接在对象上定义属性，它们的默认值为true
// [[Value]]:包含这个属性的数据值
// eg1：
var person = {}
Object.defineProperty(person, 'name', {
  writable: false, // 只读
  value: 'Nicholas'
})
console.log(person.name) // Nicholas
person.name = 'Greg' 
console.log(person.name) // Nicholas

// eg2:
var person = {}
Object.defineProperty(person, 'name', {
  configurable: false, // 不能从对象属性中删除，一旦flase,不能改为true
  value: 'Nicholas'
})
delete person.name
person.name = 'Greg' // 在严格模式下，会报错
console.log(person.name)

// 2.2 对象的访问器属性：
// [[Confirgurable]]:表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或能否把属性修改为数据属性。对于直接在对象上定义属性，这个特性默认为true
// [[Enumerable]]:表示能否通过for-in循环返回属性，对于直接在对象上定义的属性，这个特性默认为true
// [[Get]]:在读取属性时调用的函数，默认undefined
// [[Set]]:在写入属性时调用的函数，默认undefined
var book = {
  _year: 2004,
  edition: 1
}
Object.defineProperty(book, 'year', {
  get: function () {
    return this._year
  },
  set: function (newValue) {
    if (newValue > 2004) {
      this._year = newValue;
      this.edition += newValue - 2004
    }
  }
})
book.year = 2005
console.log(book.edition) // 2

Object.defineProperties(book, {
  _year: {
    value: 2004
  },
  edition: {
    value: 1
  },
  year: {
    get:function (){},
    set: function () {}
  }
})

// 3 创建对象的方法
// 3.1 工厂模式
function createPerson (name, age, job) {
  var o = new Object()
  o.name = name
  o.age = age
  o.job = job
  o.sayName = function () {
    console.log(this.name)
  }
  return o;
}
var person1 = createPerson('Nicholas', 29, 'Software Engineer')
var person2 = createPerson('Greg', 27, 'Doctor')
// 解决了创建多个相似对象的问题，但没解决对象识别的问题（即怎样知道一个对象的类型）

// 3.2 构造函数模式,通过new 
function Person (name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () { // 等同于 new Function(console.log(this.name))
    console.log(this.name)
  }
}
var person1 = new Person('Nicholas', 29, 'Software Engineer')
var person2 = new Person('Greg', 27, 'Doctor')
// 没有显示地创建对象
// 直接将属性和方法赋给this
// 没有return 语句
// 构造函数始终以大写字母开头
console.log(person1.constructor ==  Person) // true
console.log(person1 instanceof Object) // true
console.log(person1 instanceof Person) // true

 // 构造函数和其他函数区别，前者通过new 调用，而其他不行
 // (1) 当作构造函数使用:
 var person = new Person('Nicholas', 29, 'Software Engineer')
 person.sayName(); // 'Nicholas'

//  (2) 作为普通函数调用：
Person('Grey', 27, 'Doctor') // 方法和属性会添加到window
window.sayName();

// (3)在另一个作用域中调用
var o = new Object()
Person.call(o, 'Kristen', 25, 'Nurse')
o.sayName();
// 构造函数地问题：每个方法都要在每个实例上重新创建一遍。
// 改良：
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = sayName
}
function sayName () {
  console.log(this.name)
}
// 缺点，全局中定义了多个方法

// 3.3 原型模式
// 每个函数都有一个prototype(原型)属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含由特定类型的所有实例共享的属性和方法。
// prototype就是通过调用构造函数创建的那个对象实例的原型对象
// 使用原型对象的好处，所有对象实例共享它所包含的属性和方法

function Person (){}
Person.prototype.name = 'Nicholas'
Person.prototype.age = 29
Person.prototype.sayName = function () {
  console.log(this.name)
}

// Object.getPropertyOf() 返回的对象实际是这个对象的原型
console.log(Object.getPrototypeOf(person1) == Person.prototype) // true

person1.hasOwnProperty(); // 会访问实例的属性，不会访问原型的属性，返回true 或 false
Object.getOwnPropertyDescriptor() // 只能用于实例属性

// 原型 与 in
// 无论属性存在实例或原型  'name' in person1 == true

// 重写整个原型对象
Person.prototype = {
  name: 'Nicholas',
  age: 29,
  sayName: function () {
    console.log(this.name)
  }
}
// 以上做法constructor属性不再指向Person
// 解决方法：
Person.prototype = {
  constructor: Person,
  name: 'Nicholas'
}
// 原型的动态性：
var friend = new Person()
Person.prototype.sayHi = function () {
  alert('Hi')
}
friend.sayHi(); // 'Hi'

// eg:
function Person() {}
var friend = new Person()
Person.prototype = {
  constructor: 'Person',
  name: 'nicholas',
  sayName: function () {console.log(this.name)}
}
friend.sayName(); // error
// 纯原型模式问题，共享属性如果是引用类型，修改一个，另一个受影响
// eg:
function Person() {}
Person.prototype = {
  constructor: Person,
  name: 'Nicholas',
  age: 29,
  job: 'Software Engineer',
  friends: ['Shelly', 'Court']
}
var person1 = new Person()
var person2 = new Person()
person1.friends.push('Van')
person2.friends == person1.friends // true

// 3.4组合使用原型模式和构造函数模式
function Person (name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ['Shelby', 'Court']
}
Person.prototype = {
  constructor: Person,
  sayName: function () {
    alert(this.name)
  }
}

// 6.3 继承
// 6.3.1通过原型链来实现继承
function SuperType () {
  this.property = true;
}
SuperType.prototype.getSuperValue = function () {
  return this.property
}
function SubType () {
  this.subproperty = false
}
// 继承了SuperType
SubType.prototype = new SuperType()
SuperType.prototype.getSubValue = function () {
  return this.subproperty
}
var instance = new SubType()
console.log(instance.getSuperValue()) // true

// SuperType继承了Object
// 确定原型和实例的关系
console.log(instance instanceof Object) // true
console.log(instance instanceof SuperType) // true
console.log(instance instanceof SubType) // true

// 给原型添加方法的代码，一定要放在替换原型的语句之后
SubType.prototype = new SuperType()
SubType.prototype.getSubValue = function () {

}
// 通过原型继承的问题，(1)会继承父级的数据,(2)在创建子类型的实例时，不能向超类型的构造函数中传递参数
// eg:
function SuperType () {
  this.colors = ['red', 'blue', 'green']
}
function SubType () {}
SubType.prototype = new SuperType()
var instance1 = new SubType()
instance1.colors.push('black')
console.log(instance1.colors) // 'red,blue,green,black'
var instance2 = new SubType()
console.log(instance2.colors) // 'red,blue,green,black'

// 解决方法
// 6.3.2 借用构造函数,伪对象或经典继承
// 用call,apply借用超类型构造函数
function SuperType () {
  this.colors = ['red', 'blue', 'green']
}
function SubType () {
  // 继承SuperType
  SuperType.call(this)
}
var instance1 = new SubType()
instance1.colors.push('black') // "red, blue, green, black"
var instance2 = new SubType()
console.log(instance2.colors) // "red, blue, green"
// 分析：实际在（未来将要）新建的SubType实例的环境下调用 SuperType构造函数，这样就会在新SubType
// 对象上执行SuperType()函数中定义的所有对象初始化代码，SubType的每个实例都会由自己的colors副本
// 优势：可以传参
function SuperType (name) {
  this.name = name
}
function SubType () {
  SuperType.call(this, 'Nicholas')
  this.age = 19
}
var instance = new SubType()
instance.name // 'Nicholas'
// 借用构造函数方法问题：超类型的原型中定义的方法，对子类型而已不可见，结果所有类型都只能使用构造函数模式，借用构造函数的技术也是很少单独使用的

// 6.3.3 组合继承（伪经典继承）
// 结合原型链和借用构造函数的技术组合一起
// eg:
function SuperType (name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}
SuperType.prototype.sayName = function () {
  console.log(this.name)
}
function SubType (name, age) {
  // 继承属性
  SuperType.call(this, name)
  this.age = age
}
// 继承方法
SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType
SubType.prototype.sayAge = function () {
  console.log(this.age)
}
var instance1 = new SubType('Nicholas', 29)
instance1.colors.push('black') // "red,blue,green,black"
instance1.sayName() // Nicholas
instance1.sayAge() // 29

var instance2 = new SubType('Greg', 27)
instance2.colors // "red,blue,green" 
instance2.sayName() // Greg"
instance2.sayAge() // 27
// 就可以让两个不同的 SubType 实例既分别拥有自己属性——包括 colors 属性，又可以使用相同的方法了。


// 7.2 闭包:有权访问另一个函数作用域中的变量的函数
