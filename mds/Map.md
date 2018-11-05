### Map

> Map类型是一种以键值对存储数据的有序列表，其中键名和值支持所有数据类型，键名的等价判断是通过`Object.is()`方法实现的，与对象的属性名总是会被强制转换为字符串不同。5和字符串'5'会被判定为两种类型。

- 创建Map
```js
  let map = new Map()  // 创建map实例

  map.set('key', 'value').set('key2', 'value2')  // 通过set()方法像map实例中添加属性

  map.get('key')  // value 通过get()方法获取信息
  map.get('key3')  // undefined 如果get()方法传入的键不存在 会返回undefined

  console.log(map.has('key'))  // true 通过has()方法检测键名在Map集合中是否存在
  console.log(map.size)  // 通过size属性可以访问集合的长度
```

- 以对象作为Map的键
```js
  let map = new Map()
  let key1 = {}
  let key2 = {}

  map.set(key1, 'key1').set(key2, 'key2')

  map.get(key1)  // key1
  map.get(key2)  // key2
```
- Map的初始化方法
> 可以通过向Map构造函数传入一个数组来初始化一个Map集合，数组中的每一个元素都是一个子数组，分别代表集合的键和值

```js
  let map = new Map([['key1', 'value1'], ['key2', 'value2']])

  console.log(map)  // Map { 'key1' => 'value1', 'key2' => 'value2' }

  console.log(map.size)  // 2
```

- Map的forEach()方法

```js
  let map = new Map([['key1', 'value1'], ['key2', 'value2']])

  map.forEach((value, key, input) => {
    console.log(value)  // map集合中对应键的值
    console.log(key)  // map集合中的键名
    console.log(input)  // 遍历的map集合
  })
```

- Map集合支持的方法
   - set(key, value) 向map集合中添加一组键值对
   - has(key) 检测集合中是否包含某个key的值
   - get(key) 获取map集合中key的值，没有则返回undefined
   - delete(key) 从map中移除指定的键名及对应的值，成功返回true
   - clear() 移除map集合中所有的键值对
   - size 获取map集合的长度
   - forEach(callback(value, key, input)) 分别对应值、键、输入的map集合以及一个可选的this值

### WeakMap
> WeakMap与WeakSet类似，WeakMap的键必须是非null的对象，并且只保存对象的弱引用，当这个对象的最后一个强引用被移除时，WeakMap集合中对应的键值也会被销毁

- 创建WeakMap

```js
  let key1 = {}, key2 = {}
  let weakMap = new WeakMap([[key1, 'key1'], [key2, 'key2']])

  console.log(weakMap.get(key1))  // 'key1'
  console.log(weakMap.has(key2))  // true
```

- WeakMap支持的方法
  - set(key, value)
  - get(key)
  - has(key)
  - delete(key)

> WeakMap没有size属性和forEach()方法，也没有clear()方法