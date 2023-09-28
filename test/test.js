const expect = require('expect.js');

// ts 测试编译后文件
const { getAnypath, setAnypath, get, set } = require('../src/index.ts');

describe('getAnypath', function () {
  it('obj key', function () {
    const obj = {
      a: 1,
      b: { c: 2 },
    };
    expect(getAnypath(obj, [{ key: 'a' }])).to.equal(1);
    expect(getAnypath(obj, [{ key: 'b' }, { key: 'c' }])).to.equal(2);
  });
  it('array key', function () {
    const obj = {
      a: [0, 1],
    };
    expect(getAnypath(obj, [{ key: 'a' }, { key: 0 }])).to.equal(0);
    expect(getAnypath(obj, [{ key: 'a' }, { key: 1 }])).to.equal(1);
  });
  it('map key', function () {
    const obj = {
      a: new Map([['b', 1]]),
    };
    expect(getAnypath(obj, [{ key: 'a' }, { key: 'b' }])).to.equal(1);
  });
  it('mixed key', function () {
    const obj = {
      a: [new Map([['b', 1]])],
    };
    expect(getAnypath(obj, [{ key: 'a' }, { key: 0 }, { key: 'b' }])).to.equal(
      1,
    );
  });
  it('paths = []', function () {
    const obj = {
      a: 1,
    };
    expect(getAnypath(obj, [])).to.equal(undefined);
  });
  it('paths = not array', function () {
    const obj = {
      a: 1,
    };
    expect(getAnypath(obj)).to.equal(undefined);
    expect(getAnypath(obj, 1)).to.equal(undefined);
  });
  it('error paths', function () {
    const obj = {
      a: 1,
    };
    expect(getAnypath(obj, [{ key: 'b' }, { key: 'c' }])).to.equal(undefined);
  });
});

describe('setAnypath', function () {
  it('obj key', function () {
    const obj2 = {
      a: { b: 1 },
    };
    expect(setAnypath(obj2, [{ key: 'a' }, { key: 'c' }], 1)).to.equal(true);
    // 测试保留原有值
    expect(getAnypath(obj2, [{ key: 'a' }, { key: 'b' }])).to.equal(1);
    // 测试设置新值
    expect(getAnypath(obj2, [{ key: 'a' }, { key: 'c' }])).to.equal(1);
    // 测试设置已有值
    expect(setAnypath(obj2, [{ key: 'a' }, { key: 'b' }], 2)).to.equal(true);
    expect(getAnypath(obj2, [{ key: 'a' }, { key: 'b' }])).to.equal(2);

    // 测试defaultValue
    const obj3 = {};
    expect(
      setAnypath(
        obj3,
        [
          {
            key: 'a',
            defalutValue: () => ({
              b: 1,
            }),
          },
          { key: 'c' },
        ],
        1,
      ),
    ).to.equal(true);
    expect(getAnypath(obj3, [{ key: 'a' }, { key: 'b' }])).to.equal(1);
    expect(getAnypath(obj3, [{ key: 'a' }, { key: 'c' }])).to.equal(1);

    // 测试defaultValue
    const obj4 = {};
    expect(
      setAnypath(
        obj4,
        [
          {
            key: 'a',
            type: 'array',
          },
          { key: 0 },
        ],
        1,
      ),
    ).to.equal(true);
    expect(Array.isArray(getAnypath(obj4, [{ key: 'a' }]))).to.equal(true);
    expect(getAnypath(obj4, [{ key: 'a' }, { key: 0 }])).to.equal(1);
  });
  it('array key', function () {
    const obj = { a: [0] };
    // 测试设置已有值
    expect(setAnypath(obj, [{ key: 'a' }, { key: 0 }], 10)).to.equal(true);
    expect(getAnypath(obj, [{ key: 'a' }, { key: 0 }])).to.equal(10);
    // 测试设置新值
    expect(setAnypath(obj, [{ key: 'a' }, { key: 1 }], 2)).to.equal(true);
    expect(getAnypath(obj, [{ key: 'a' }, { key: 1 }])).to.equal(2);
  });
  it('map key', function () {
    const obj2 = {
      a: new Map([['b', 1]]),
    };
    expect(setAnypath(obj2, [{ key: 'a' }, { key: 'c' }], 1)).to.equal(true);
    // 测试保留原有值
    expect(getAnypath(obj2, [{ key: 'a' }, { key: 'b' }])).to.equal(1);
    // 测试设置新值
    expect(getAnypath(obj2, [{ key: 'a' }, { key: 'c' }])).to.equal(1);
    // 测试设置已有值
    expect(setAnypath(obj2, [{ key: 'a' }, { key: 'b' }], 2)).to.equal(true);
    expect(getAnypath(obj2, [{ key: 'a' }, { key: 'b' }])).to.equal(2);

    // 测试defaultValue
    const obj3 = {};
    expect(
      setAnypath(
        obj3,
        [
          {
            key: 'a',
            defalutValue: () => new Map([['b', 1]]),
          },
          { key: 'c', defalutValue: () => ({}) },
          { key: 'd' },
        ],
        1,
      ),
    ).to.equal(true);
    expect(getAnypath(obj3, [{ key: 'a' }, { key: 'b' }])).to.equal(1);
    expect(
      getAnypath(obj3, [{ key: 'a' }, { key: 'c' }, { key: 'd' }]),
    ).to.equal(1);
  });
  it('mixed key', function () {
    const obj = {
      a: [new Map([['b', 1]])],
    };
    expect(getAnypath(obj, [{ key: 'a' }, { key: 0 }, { key: 'b' }])).to.equal(
      1,
    );
  });
  it('error paths', function () {
    const obj = {
      a: 1,
    };
    expect(setAnypath(obj, [])).to.equal(false);
    expect(setAnypath(obj)).to.equal(false);
    expect(setAnypath(obj, 1)).to.equal(false);
  });
});

describe('get', function () {
  it('normal key', function () {
    const obj = {
      a: [new Map([['b', { c: 1 }]])],
    };
    expect(get(obj, 'a[].0.b:map.c')).to.equal(1);
  });

  it('error key', function () {
    const obj = {
      a: 1,
      b: { c: 2 },
    };
    expect(get(obj)).to.equal(undefined);
    expect(get(obj, 1)).to.equal(undefined);
  });
});

describe('set', function () {
  it('normal key', function () {
    // mixed key
    const obj1 = {};
    expect(set(obj1, 'a[].0.b:map.c', 1)).to.equal(true);
    expect(get(obj1, 'a[].0.b:map.c', 1)).to.equal(1);

    // array key
    const obj2 = {};
    expect(set(obj2, 'a:array.0.b', 1)).to.equal(true);
    console.log(obj2);
    expect(get(obj2, 'a:array.0.b', 1)).to.equal(1);

    const obj3 = {};
    // 不认识的key
    expect(set(obj3, 'a:abc.b', 1)).to.equal(true);
    expect(get(obj3, 'a:abc.b', 1)).to.equal(1);
  });

  it('error key', function () {
    const obj = {
      a: 1,
      b: { c: 2 },
    };
    expect(set(obj)).to.equal(false);
  });
});
