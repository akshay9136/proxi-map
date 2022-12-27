## proxi-map

[![npm version](https://img.shields.io/npm/v/proxi-map)](https://www.npmjs.com/package/proxi-map)
[![Build Status](https://travis-ci.com/akshay9136/proxi-map.svg?branch=main)](https://travis-ci.com/akshay9136/proxi-map)
[![Coverage Status](https://coveralls.io/repos/github/akshay9136/proxi-map/badge.svg?branch=main)](https://coveralls.io/github/akshay9136/proxi-map?branch=main)
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

const newData = Imap(data)
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

### Usage with [Ramda](https://www.npmjs.com/package/ramda)

`npm install ramda`

```javascript
import Imap from 'proxi-map';
import * as R from 'ramda';

// remove inactive products from category1
const newData = Imap(data)
    .category1
    .products(R.filter(R.prop('active')))
    // equivalent to: .products((arr) => arr.filter(obj => obj.active))
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
