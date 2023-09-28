# 文档

这是一个用于操作嵌套数据的js库，包括get、set、getAnypath和setAnypath等功能。

## get函数

get函数是getAnypath的简化形式，它使用由"."分隔的字符串键提取嵌套值。

参数和返回遵循以下规则:

- param { any } obj 从中获取嵌套值的对象/数组/映射。
- param { string } keys 点符号表示的键字符串，用来获取嵌套值。
- return { any } 从嵌套路径中得到的值，否则为undefined。

示例:

```ts
const obj = {
  a: {
    b: new Map([['c', [1, 2. 3]]]),
  },
};
console.log(get(obj, 'a.b.c.0')); // 1
console.log(get(obj, 'a.b.c.1')); // 2
console.log(get(obj, 'a.b.c.2')); // 3
```

## set函数

set函数是setAnypath的简化形式，它在嵌套对象/数组/Map中设置值。

参数和返回遵循以下规则:

- param { any } obj 要设置嵌套值的对象/数组/映射。
- param { string } keys 点符号表示的键字符串，用来设置嵌套值。
- param { any } value 要设置的值。
- return { boolean } 如果值成功设置，返回true，否则返回false。

示例:

```ts
const obj = {};
console.log(set(obj, 'a.b:map.c[].0', 2));
// 返回结果为true，现在的obj对象将是：
// {
//   a: {
//     b: new Map([['c', [2]]]),
//   },
// };
```

注意：如果路径的任何部分不存在，它将被创建并默认设置为空对象，可以通过`:`语法和`[]`指定数据类型。

## getAnypath函数

getAnypath函数用于从对象/数组/映射中获取嵌套值。

函数的参数和返回遵循以下规则:

- param { any } obj 用于访问属性的对象/数组/映射。
- param { AnyPath[] } paths 一个路径数组，用于到达所需的值。
- return { any } 如果路径存在，从路径中找到的值，否则为undefined。

示例:

```ts
const obj = {
  a: {
    b: new Map([['c', [1, 2. 3]]]),
  },
};
console.log(getAnypath(obj, [{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 1 }])); // 2
```

注意:空路径或错误路径将导致结果为undefined。

## setAnypath函数

setAnypath函数将值设置在复杂的嵌套对象/数组/映射中。

当路径不存在，它会用默认值创建路径的缺失部分。

参数和返回遵循以下规则:

- param { any } obj 要设置值的对象/数组/映射。
- param { AnyPath[] } paths 一个路径数组，用来确定要设置值的位置。
- param { any } value 要设置的值。
- return { boolean } 如果值成功设置，返回true，否则返回false。

示例:

```ts
const obj = {};
console.log(
  setAnypath(
    obj,
    [
      { key: 'a' }, // 当type和defaultValue都未指定时，默认为object
      { key: 'b', type: 'map' }, // 指定type
      { key: 'c', defaultValue: () => [1] }, // 指定默认值
      { key: '1' },
    ],
    2,
  ),
);
// 返回结果为true，现在的obj对象将是：
// {
//   a: {
//     b: new Map([['c', [1, 2]]]),
//   },
// };
```
