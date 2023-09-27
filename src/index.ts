/* eslint-disable @typescript-eslint/no-explicit-any */
import { type } from '@jsmini/type';

interface ObjectPath {
  key: string;
  defalutValue?: () => Record<string, any>;
}

interface ArrayPath {
  key: number;
  defalutValue?: () => any[];
}

interface MapPath<T> {
  key: T;
  defalutValue?: () => Map<T, any>;
}

type AnyPath = ObjectPath | ArrayPath | MapPath<any>;

export function getAnypath(obj: any, paths: AnyPath[]) {
  if (type(paths) !== 'array' || !paths.length) {
    return undefined;
  }
  let parent = obj;
  for (const path of paths) {
    const t = type(parent);
    if (t === 'object' || t === 'array') {
      parent = parent[path.key];
    } else if (t === 'map') {
      parent = parent.get(path.key);
    } else {
      return undefined;
    }
  }
  return parent;
}

export function setAnypath(obj: any, paths: AnyPath[], value: any): boolean {
  if (type(paths) !== 'array' || !paths.length) {
    return false;
  }
  let parent = obj;
  // 获取容器元素

  for (const path of paths.slice(0, -1)) {
    const t = type(parent);
    if (t === 'object' || t === 'array') {
      // undefined | null
      if (parent[path.key] != null) {
        parent = parent[path.key];
      } else {
        parent[path.key] = path.defalutValue?.();
        parent = parent[path.key];
      }
    } else if (t === 'map') {
      // undefined | null
      if (parent.get(path.key) != null) {
        parent = parent.get(path.key);
      } else {
        if (type(path.defalutValue) !== 'function') {
          return false;
        }
        parent.set(path.key, path.defalutValue?.());
        parent = parent.get(path.key);
      }
    } else {
      return false;
    }
  }

  // 目标节点设置值
  const t = type(parent);
  const path = paths[paths.length - 1];
  if (t === 'object' || t === 'array') {
    parent[path.key] = value;
  } else if (t === 'map') {
    (parent as Map<any, any>).set(path.key, value);
  } else {
    return false;
  }

  return true;
}

function parseKeys(keys: string): AnyPath[] {
  if (typeof keys !== 'string' && typeof keys !== 'number') {
    return [];
  }
  // keys = 'a.0[].c:map.e'
  const paths = String(keys)
    .split('.')
    .map((item) => {
      if (item.includes('[]')) {
        // [] 语法
        return {
          key: item.replace('[]', ''),
          defalutValue: () => [],
        };
      } else if (item.includes(':')) {
        // : 语法
        const [k, v] = item.split(':');
        return {
          key: k,
          defalutValue: () => {
            if (v === 'map') {
              return new Map();
            } else if (v === 'array') {
              // 数组
              return [];
            }
            return {};
          },
        };
      } else {
        // object
        return {
          key: item,
          defalutValue: () => ({}),
        };
      }
    });

  return paths;
}

export function get(obj: any, keys: string) {
  return getAnypath(obj, parseKeys(keys));
}
export function set(obj: any, keys: string, value: any) {
  const paths = parseKeys(keys);
  if (!paths.length) {
    return false;
  }
  return setAnypath(obj, paths, value);
}
