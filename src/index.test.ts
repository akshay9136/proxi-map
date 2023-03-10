import Imap from './index';
import * as R from 'ramda';

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

test('with value', () => {
    const newData = Imap(data)
        .category1
        .activeProducts(3)
        .backtrack(-1) // 1 step back
        .products[0].active(true)
        .unwrap();
    expect(newData).not.toBe(data);
    expect(newData.category1).not.toBe(data.category1);
    expect(newData.category2).toBe(data.category2);
    const { products, activeProducts } = newData.category1;
    expect(activeProducts).toBe(3);
    expect(products).not.toBe(data.category1.products);
    expect(products[0]).not.toBe(data.category1.products[0]);
    expect(products[0].active).toBe(true);
});

test('with function', () => {
    const newData = Imap(data)
        .category1
        .products(R.filter<any>(R.prop('active')))
        .unwrap();
    expect(newData).not.toBe(data);
    expect(newData.category1).not.toBe(data.category1);
    expect(newData.category2).toBe(data.category2);
    const { products } = newData.category1;
    expect(products).not.toBe(data.category1.products);
    expect(products.length).toBe(2);
});

test('with same value', () => {
    const newData = Imap(data)
        .category1
        .products[0].active(false)
        .unwrap();
    expect(newData.category1).toBe(data.category1);
    const { products } = newData.category1;
    expect(products).toBe(data.category1.products);
    expect(products[0]).toBe(data.category1.products[0]);
});
