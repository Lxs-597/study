### Set
> Set集合是一种含有一些相互独立的非重复值的有序列表。
- 创建Set集合并添加元素
```js
  let set = new Set()
  set.add(5)  // 通过add方法向集合中添加元素
  set.add('5')

  console.log(set.size)  // 2 通过size属性可以访问set集合的长度
```
> Set集合中不会对存值进行类型转换，1和字符串'1'是两个相互独立的元素，内部使用`Object.is()`方法检测两个值是否一致，但+0、-0和0被视为是相等的元素
```js
  let set = new Set()
  let key1 = {}
  let key2 = {}

  set.add(key1).add(key2)

  console.log(set.size) // 2 由于key1和key2不会被转换为字符串，所有key1和key2是两个独立的元素
```

```js
  let set = new Set()
  set.add(+0).add(-0).add(0)

  console.log(set.size)  // 1
  console.log(set)  // Set { 0 }, +0、-0、0被视为是相同的元素，向Set集合中添加相同的元素会被忽略
```

- Set实现数组去重
```js
  const array = [1, 2, 3, 3, 4, 4, 5]
  console.log([...new Set(array)])  // [ 1, 2, 3, 4, 5 ]
```

- Set.prototype.has()、Set.prototype.delete()、Set.prototype.clear()
```js
  let set = new Set()

  set.add(5).add(6)
  set.has(5)  // true 通过Set集合的has方法可以检查Set集合中是否存在某个值

  set.delete(5)  // 通过delete方法可以移除某个值，成功会返回true 否则返回false
  set.has(5)  // false

  set.clear()

  console.log(set.size)  // 0 clear方法移除集合中所有元素
```

- Set.prototype.forEach()
```js
  let set = new Set(['a', 'b'])

  set.forEach((value, key, input) => {
    console.log(value, key, input)  // 类似于数组的forEach方法 a a Set { 'a', 'b' } 、b b Set { 'a', 'b' }，第二个可选参数与数组的forEach方法一样，为当前的this值
  })
```

### Weak Set
将对象存储在Set集合与存储在变量中一样，只要Set中的引用存在，垃圾回收机制就不会释放该引用的内存，所以Set集合可以被看作是一个强引用的集合，而WeakSet保存的是对象的弱引用，当对象的最后一个强引用被移除时，就无法访问WeakSet中key的引用了。
- WeakSet的创建
```js
  let weakSet = new WeakSet()
  let key = {}
  weakSet.add(key)

  console.log(weakSet.has(key))  // true
```
- 想WeakSet实例的add方法中传入非对象参数会导致程序错误

- WeakSet不是可迭代对象，所有不能使用for-of循环，也不能使用keys()、values()或者entries()进行访问

- 不支持forEach方法以及size属性