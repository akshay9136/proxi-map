## proxi-map

[![npm version](https://img.shields.io/npm/v/proxi-map)](https://www.npmjs.com/package/proxi-map)
[![Build Status](https://app.travis-ci.com/akshay9136/proxi-map.svg?branch=main)](https://app.travis-ci.com/akshay9136/proxi-map)
[![Coverage Status](https://coveralls.io/repos/github/akshay9136/proxi-map/badge.svg)](https://coveralls.io/github/akshay9136/proxi-map)
[![Known Vulnerabilities](https://snyk.io/test/npm/proxi-map/badge.svg)](https://snyk.io/test/npm/proxi-map)
[![npm downloads/month](https://img.shields.io/npm/dm/proxi-map)](https://www.npmjs.com/package/proxi-map)

A lightweight JavaScript library to create variants of an object by using its immutable proxy.

## Install
`npm install proxi-map`

## Usage
```javascript
import Imap from 'proxi-map';

const data = {
    category1: {
        activeProducts: 2,
        products: [
            { name: 'product11', active: false },
            { name: 'product12', active: true },
            { name: 'product13', active: true },
        ],
    },
    category2: {
        activeProducts: 2,
        products: [
            { name: 'product21', active: true },
            { name: 'product22', active: true },
        ],
    },
};

const newData = Imap(data)
    .category1
    .activeProducts(3)
    .backtrack(-1) // 1 step back
    .products[0].active(true)
    .unwrap();

console.log(newData.category1);
// {
//     activeProducts: 3,
//     products: [
//       { name: 'product11', active: true },
//       { name: 'product12', active: true },
//       { name: 'product13', active: true }
//     ]
// }
console.log(
    data == newData, // false
    data.category1 == newData.category1, // false
    data.category2 == newData.category2 // true
);
```

## Usage with [Ramda](https://www.npmjs.com/package/ramda)

`npm install ramda`

```javascript
import Imap from 'proxi-map';
import * as R from 'ramda';

// remove inactive products from category1
const newData = Imap(data)
    .category1
    .products(R.filter(R.prop('active')))
    // equivalent to: (arr) => arr.filter(obj => obj.active)
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
