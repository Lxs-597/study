### 继承

- 构造函数继承
```js
  function Parent(name) {
    this.name = name

    this.sayName = function() {
      console.log(this.name)
    }
  }

  function Child(name) {
    Parent.call(this, name)
  }

  let parent = new Parent('parent')
  let child = new Child('child')

  parent.sayName()  // parent
  child.sayName()  // child

  console.log(parent.sayName === child.sayName)  // false 没有实现方法的公用
  console.log(child instanceof Child)  // true
  console.log(child instanceof Parent)  // false 原型指向不正确
```

- 混合继承
```js
  function Parent(name) {
    this.name = name
  }

  function Child(name) {
    Parent.call(this, name)
  }

  function inherit(Parent, Child) {
    let F = function() {}
    F.prototype = Parent.prototype
    Child.prototype = new F()
    Child.prototype.constructor = Child
  }

  inherit(Parent, Child)

  Child.prototype.sayName = function() {
    console.log(this.name)
  }

  let child = new Child('child')

  child.sayName()  // 'child'

  console.log(child.constructor)  // [Function: Child]
  console.log(child instanceof Child)  // true
  console.log(child instanceof Parent)  // true
```

- ES6中类的继承
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