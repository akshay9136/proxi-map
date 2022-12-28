import Imap from './index';
// import * as R from 'ramda';

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
