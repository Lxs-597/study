### Symbol
- 创建Symbol
```js
  let symbol = Symbol()

  let object = Object.create(null)

  object[symbol] = 'symbol'

  console.log(object[symbol])  // symbol
```

- 带描述信息的symbol
```js
  let symbol = Symbol('discription')

  console.log(symbol)  // Symbol(discription)
```

**Symbol的描述信息存储在Symbol的\[[Description]]属性中,只有当调用Symbol的toString()方法才能访问该属性。**

- 判断Symbol
```js
  let symbol = Symbol()

  typeof symbol  // symbol

  Object.prototype.toString.call(symbol)  // [object Symbol]
```

- Symbol的使用
```js
  let firstName = Symbol('first name')
  let middleName = Symbol('middle name')
  let lastName = Symbol('last name')

  let person = {
    [firstName]: 'first'
  }

  Object.defineProperty(person, middleName, {
    value: 'middle'
  })

  Object.defineProperties(person, {
    [lastName]: {
      value: 'zake',
      writeable: false
    }
  })
```

- 共享Symbol
```js
  let id = Symbol.for('id')

  let uid = Symbol.for('id')

  console.log(id === uid)  // true
```

**通过 `Symbol.for()` 创建的Symbol被存放在一个全局的 `Symbol` 注册表中，`Symbol.for('id')` 中的 `id` 作为 `Symbol` 的唯一标识符，同时也作为描述符存放在注册表中，当通过 `Symbol.for()` 访问时，如果注册表中存在同一标识符的 `Symbol`，则返回该 `Symbol` ，否则就会以该标识符新建一个 `Symbol`**

- Symbol的检索
```js
  let id1 = Symbol.for('id')
  let id2 = Symbol.for('id')
  let id3 = Symbol('id')

  console.log(Symbol.keyFor(id1))  // id
  console.log(Symbol.keyFor(id2))  // id
  console.log(Symbol.keyFor(id3))  // undefined
```
**可以通过 `Symbol.keyFor()` 检索全局注册表中与 `Symbol` 有关的键。**

- Symbol的类型转换
```js
  let symbol = Symbol()

  console.log(symbol + '')      // 报错
  console.log(symbol + 1)       // 报错
  console.log(Boolean(symbol))  // true
```

**`Symbol` 不能转换为数字或者字符串，也不能与逻辑运算符以外的数学操作符一起使用， `Symbol` 可以转换为 `boolean` 值，因为它属于非空值类型。**