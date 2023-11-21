# [anypath](https://github.com/jsmini/anypath)

[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jsmini/anypath/blob/master/LICENSE)
[![CI](https://github.com/jsmini/anypath/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/jsmini/anypath/actions/workflows/ci.yml)
[![npm](https://img.shields.io/badge/npm-0.3.0-orange.svg)](https://www.npmjs.com/package/@jsmini/anypath)
[![NPM downloads](http://img.shields.io/npm/dm/@jsmini/anypath.svg?style=flat-square)](http://www.npmtrends.com/@jsmini/anypath)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/jsmini/anypath.svg)](http://isitmaintained.com/project/jsmini/anypath 'Percentage of issues still open')

最好用的深层取值赋值库，支持 Object、Array 和 Map。

[Engilsh](./README.md) | 简体中文

虽然深层取值我们可以使用ES新的`?`语法，避免报错，如下所示：

```js
const a = { b: { c: 1 } };
console.log(a?.b?.c); // 1
```

但对于深层赋值操作，我们就无能为力了，如下所示：

```js
const a = {};
a?.b?.c = 1; // 报错
```

但是使用本库，我们可以轻松实现深层取值和赋值，如下所示：

```js
import { get, set } from '@jsmini/anypath';

const a = {};
set(a, 'b.c', 1);
console.log(get(a, 'b.c')); // 1
```

支持 Object、Array 和 Map，如下所示：

```js
import { set } from '@jsmini/anypath';

const a = {};
set(a, 'b:map.c[].0', 1);
```

## 兼容性

单元测试保证支持如下环境：

| IE  | CH  | FF  | SF  | OP  | IOS | 安卓 | Node  |
| --- | --- | --- | --- | --- | --- | ---- | ----- |
| 6+  | 23+ | 4+  | 6+  | 10+ | 5+  | 2.3+ | 0.10+ |

## 目录介绍

```
.
├── demo 使用demo
├── dist 编译产出代码
├── doc 项目文档
├── src 源代码目录
├── test 单元测试
├── CHANGELOG.md 变更日志
└── TODO.md 计划功能
```

## 如何使用

通过npm下载安装代码

```bash
$ npm install --save @jsmini/anypath
```

如果你是node环境

```js
var name = require('@jsmini/anypath').name;
```

如果你是webpack等环境

```js
import { name } from '@jsmini/anypath';
```

如果你是浏览器环境

```html
<script src="node_modules/@jsmini/anypath/dist/index.aio.js"></script>

<script>
  var name = jsmini_anypath.name;
</script>
```

## 文档

- [API](https://github.com/jsmini/anypath/blob/master/doc/api.md)

## 贡献指南 ![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

首次运行需要先安装依赖

```bash
$ npm install
```

一键打包生成生产代码

```bash
$ npm run build
```

运行单元测试，浏览器环境需要手动测试，位于`test/browser`

```bash
$ npm test
```

修改package.json中的版本号，修改README.md中的版本号，修改CHANGELOG.md，然后发布新版

```bash
$ npm run release
```

将新版本发布到npm

```bash
$ npm publish
```

重命名项目名称，首次初始化项目时需要修改名字，或者后面项目要改名时使用，需要修改`rename.js`中的`fromName`和`toName`，会自动重命名下面文件中的名字

- README.md 中的信息
- package.json 中的信息
- config/rollup.js 中的信息
- test/browser/index.html 中的仓库名称

```bash
$ npm run rename # 重命名命令
```

## 贡献者列表

[contributors](https://github.com/jsmini/anypath/graphs/contributors)

## 更新日志

[CHANGELOG.md](https://github.com/jsmini/anypath/blob/master/CHANGELOG.md)

## 计划列表

[TODO.md](https://github.com/jsmini/anypath/blob/master/TODO.md)

## 谁在使用
