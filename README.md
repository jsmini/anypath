# [anypath](https://github.com/jsmini/anypath)

[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jsmini/anypath/blob/master/LICENSE)
[![CI](https://github.com/jsmini/anypath/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/jsmini/anypath/actions/workflows/ci.yml)
[![npm](https://img.shields.io/badge/npm-0.2.1-orange.svg)](https://www.npmjs.com/package/@jsmini/anypath)
[![NPM downloads](http://img.shields.io/npm/dm/@jsmini/anypath.svg?style=flat-square)](http://www.npmtrends.com/@jsmini/anypath)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/jsmini/anypath.svg)](http://isitmaintained.com/project/jsmini/anypath 'Percentage of issues still open')

The best deep value assignment library, supporting Object, Array, and Map.

Engilsh | [简体中文](./README-zh_CN.md)

While we can use the new ? syntax of ES for getting deep values to avoid errors, as shown below:

```js
const a = { b: { c: 1 } };
console.log(a?.b?.c); // 1
```

But for assignment operation of deep value, we are powerless, as shown below:

```js
const a = {};
a?.b?.c = 1; // Error
```

However, by using this library, we can easily carryout getting and setting deep values, as shown below:

```js
import { get, set } from '@jsmini/anypath';

const a = {};
set(a, 'b.c', 1);
console.log(get(a, 'b.c')); // 1
```

supporting Object, Array, and Map，as shown below:

```js
import { set } from '@jsmini/anypath';

const a = {};
set(a, 'b:map.c[].0', 1);
```

## Environment Support

unit test ensure it supports the following environments.

| IE/Edge | Chrome | Firefox | Safari | Opera | IOS | Android | Node  |
| ------- | ------ | ------- | ------ | ----- | --- | ------- | ----- |
| 6+      | 23+    | 4+      | 6+     | 10+   | 5+  | 2.3+    | 0.10+ |

## Directory

```
.
├── demo
├── dist  # production code
├── doc   # document
├── src   # source code
├── test  # unit test
├── CHANGELOG.md
└── TODO.md
```

## Usage

npm installation

```bash
$ npm install --save @jsmini/anypath
```

Node.js

```js
var name = require('@jsmini/anypath').name;
```

webpack

```js
import { name } from '@jsmini/anypath';
```

Browser

```html
<script src="node_modules/@jsmini/anypath/dist/index.aio.js"></script>

<script>
  var name = jsmini_anypath.name;
</script>
```

## Document

- [API](https://github.com/jsmini/anypath/blob/master/doc/api.md)

## Contributing Guide ![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

when initialize, install dependencies

```bash
$ npm install
```

builds your code for production to `build` folder

```bash
$ npm run  build
```

run unit test. notice: borwser enviroment need to test manually. test file is in `test/browser`

```bash
$ npm test
```

change the version in package.json and README.md, add your description in CHANGELOG.md, and then release it happily.

```bash
$ npm run release
```

publish the new package to npm

```bash
$ npm publish
```

rename project. you need to edit project name when initialize project or anytime you want to rename the project . you need to rename `formName` and `toname` in file `rename.js`,which will automatically rename project name in the following files

- README.md
- package.json
- config/rollup.js
- test/browser/index.html

```bash
$ npm run rename # rename command
```

## Contributors

[contributors](https://github.com/jsmini/anypath/graphs/contributors)

## CHANGELOG

[CHANGELOG.md](https://github.com/jsmini/anypath/blob/master/CHANGELOG.md)

## TODO

[TODO.md](https://github.com/jsmini/anypath/blob/master/TODO.md)

## who is using
