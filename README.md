## impros

Use __immutable proxy__ of an object to create its variant.

## Install
`npm install improx`

## Usage
```javascript
import Impr from 'improx';

const data = {
    category1: {
        active: true,
        products: [
            { name: 'product21', active: false },
            { name: 'product22', active: true },
            { name: 'product23', active: true },
        ],
    },
    category2: {
        active: true,
        products: [
            { name: 'product31', active: true },
            { name: 'product32', active: true },
        ],
    },
};

const newData = Impr.of(data)
    .category1
    .products[0].active(true)
    .unwrap();

console.log(newData.category1);
// {
//     active: true,
//     products: [
//       { name: 'product21', active: true },
//       { name: 'product22', active: true },
//       { name: 'product23', active: true }
//     ]
// }
console.log(
    data === newData, // false
    data.category1 === newData.category1, // false
    data.category2 === newData.category2 // true
);
```

## Usage with [Ramda](https://www.npmjs.com/package/ramda)

`npm install ramda`

```javascript
import Impr from 'improx';
import * as R from 'ramda';

// remove inactive products from category1
const newData = Impr.of(data)
    .category1
    .products(R.filter(R.prop('active')))
    .unwrap();

console.log(newData.category1);
// {
//     active: true,
//     products: [
//       { name: 'product22', active: true },
//       { name: 'product23', active: true }
//     ]
// }
```
