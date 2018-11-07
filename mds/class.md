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

- ES6中的类也是一等公民
> 一等公民是指一个可以传入函数、可以从函数返回，并且可以赋值给变量的值。

```js
  // 将类作为参数传入函数
  function createClass(classDef) {
    return new classDef()
  }

  let instance = createClass(class {
    sayHi() {
      console.log('hi')
    }
  })

  instance.sayHi()  // 'hi'
```

- 通过立即调用类表达式创建单例

```js
  // 可直接调用匿名类表达式省略Person
  let person = new class Person {
    constructor(name) {
      this.name = name
    }

    sayName() {
      console.log(this.name)
    }
  }('Jhon')

  person.sayName()  // 'Jhon'
```

- 类中的getter和setter
```js
  class CustomClass {
    constructor() {
      this.num = 1
    }

    get count() {
      return this.num
    }

    set count(value) {
      this.num = value
    }
  }

  let instance = new CustomClass()

  console.log(instance.count)  // 1

  instance.count = 10

  console.log(instance.count)  // 10
```
使用ES5的实现
```js
  let CustomClass = (function() {
    const CustomClass = function() {
      if (typeof new.target === 'undefined') {
        // 判断是否通过new关键字调用
        throw new Error('必须使用new关键字调用构造函数')
      }

      this.num = 1
    }

    Object.defineProperty(CustomClass.prototype, 'count', {
      get() {
        return this.num
      },
      set(value) {
        this.num = value
      }
    })

    return CustomClass
  })()

  let instance = new CustomClass()
  instance.count = 10

  console.log(instance.count)
```

- 类中的计算属性
```js
  let methodName = 'sayName'
  let propertyName = 'name'
  class Person {
    constructor(name) {
      this.fullName = name
    }

    [methodName]() {
      console.log(this.fullName)
    }

    get [propertyName]() {
      return this.fullName
    }

    set [propertyName](newName) {
      this.fullName = newName
    }
  }
```

- 类的静态方法

```js
  class Person {
    // 通过static关键字标识的方法会作为类的静态方法，只能由类本身调用，不会出现在实例的原型链中
    static sayHi() {
      console.log('hi')
    }
  }

  Person.sayHi()  // 'hi'
```

- 类的继承
```js
  class Parent {
    constructor(name) {
      this.name = name
    }

    sayName() {
      console.log(this.name)
    }
  }

  class Child extends Parent {
    constructor(name) {
      // 调用super()方法继承父类属性及方法
      // 在子类中使用constructor构造函数必须调用super()方法，否则会抛出错误，如果不使用constructor，默认会调用super并传入所有参数，相当于调用
      // constructor(...args) {
      //   super(...args)
      // }
      super(name)
    }
  }

  let child = new Child('child')

  child.sayName()  // 'child'
```