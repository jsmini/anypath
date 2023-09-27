# Documentation

This is a JavaScript library for working with nested data, including functionalities such as get, set, getAnypath, and setAnypath.

## get Function

The get function is a simplified version of getAnypath. It uses a string key separated by "." to extract nested values.

Detailed Description: This function accepts a dot notation string and retrieves the nested properties accordingly.

The parameters and return follow these rules:

- param {any} obj Object/array/map from which to get the nested value.
- param {string} keys Dot notation string representing the key to access the nested value.
- return {any} The value obtained from the nested path, or undefined if not found.

Example:

```ts
const obj = {
  a: {
    b: {
      c: 2,
    },
  },
};
console.log(get(obj, 'a.b.c')); // 2
```

## set Function

The set function is a simplified version of setAnypath. It sets values within nested object/array/map.

Detailed Description: This function accepts a dot notation string and sets the value to the nested property accordingly.

The parameters and return follow these rules:

- param {any} obj Object/array/map where the nested value will be set.
- param {string} keys Dot notation string representing the key to set the nested value.
- param {any} value The value to set.
- return {boolean} Returns true if the value was successfully set, false otherwise.

Example:

```ts
const obj = {};
console.log(set(obj, 'a.b.c', 2));
// Returns true, now obj equals to { a: { b: { c: 2}}}
```

Note: If any part of the path doesn't exist, it will be created and defaulted to an empty object.

## getAnypath Function

The getAnypath function is used to get nested values from an object/array/map.

Detailed Description: It can retrieve values from directly nested properties (like a.b.c) or from deeper array/map levels.

The function parameters and return follow these rules:

- param {any} obj Object/array/map used to access properties.
- param {AnyPath[]} paths An array of paths to reach the desired value.
- return {any} The value found in the path, if it exists, otherwise it returns undefined.

Example:

```ts
const obj = {
  a: {
    b: {
      c: 2,
    },
  },
};
console.log(getAnypath(obj, [{ key: 'a' }, { key: 'b' }, { key: 'c' }])); // 2
```

Note: Empty or incorrect paths will result in undefined.

## setAnypath Function

The setAnypath function sets a value in a complex nested object/array/map.

Detailed Description: This function can set values to deeply nested properties, even if parts of the path don't exist. It will create missing parts of the path with default values.

The parameters and return follow these rules:

- param {any} obj Object/array/map where the value will be set.
- param {AnyPath[]} paths An array of paths to determine where to set the value.
- param {any} value The value to set.
- return {boolean} Returns true if the value was successfully set, false otherwise.

Example:

```ts
const obj = {};
console.log(
  setAnypath(
    obj,
    [{ key: 'a' }, { key: 'b', defaultValue: () => ({}) }, { key: 'c' }],
    2,
  ),
);
// Returns true, now obj equals to { a: { b: { c: 2}}}
```

Note: The setAnypath function cannot work in cases where the path is invalid or when trying to set a value to a non-object value.
