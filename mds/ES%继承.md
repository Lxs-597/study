- 原型继承
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
      super()
    }
  }

  let child = new Child('child')

  child.sayName()  // 'child'
```