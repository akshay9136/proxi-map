import Impr from './index';
import * as R from 'ramda';

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
    .products(R.filter<any>(R.prop('active')))
    .unwrap();

console.log(newData.category1);
// {
//     active: true,
//     products: [
//       { name: 'product22', active: true },
//       { name: 'product23', active: true }
//     ]
// }
console.log(
    data === newData, // false
    data.category1 === newData.category1, // false
    data.category2 === newData.category2 // true
);
