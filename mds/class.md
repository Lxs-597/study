### class

- ES5中类的实现

```js
  function Person(name) {
    this.name = name
  }

  Person.prototype.sayName = function() {
    console.log(this.name)
  }

  let person = new Person('Jhon')

  person.sayName()  // 'Jhon'
```

- ES6中的类
```js
  // ES6中的类会默认启用严格模式，并且不能手动改变其运行环境
  class Person {
    // 构造函数
    constructor(name) {
      this.name = name
    }

    // 相当于Person.prototype.sayName
    sayName() {
      console.log(this.name)
    }
  }

  let person = new Person('Jhon')

  person.sayName()  // 'Jhon'
```

- 类的三种声明方式
```js
  // 除了以上方法外还可以使用字面量的方式声明类
  let Person = class {}

  // 通过class声明的类跟普通变量一样可以被修改，但在类的内部不能进行修改。
  // 这里的Person2只在类的内部可见
  let Person1 = class Person2 {}

  console.log(typeof Person)   // function
  console.log(typeof Person1)  // function
  console.log(typeof Person2)  // undefined
```

- ES5实现
```js
  let Person = (function() {
    // 由于在内部不能修改类名，所以这里相当于用const声明
    // 上述匿名类与具名类的区别在于const声明的变量名称，相当于const Person2 = (function(){})() 而外部名称是Person
    const Person = function(name) {
      // 检测是否通过new关键字调用
      if (typeof new.target === 'undefined') {
        throw new Error('')
      }

      this.name = name
    }

    Person.prototype.sayName = function() {
      // 检测是否通过new关键字调用实例方法
      if (typeof new.target !== 'undefined') {
        throw new Error('')
      }
      console.log(this.name)
    }

    return Person
  })()

  let person = new Person('Jhon')

  person.sayName()
```