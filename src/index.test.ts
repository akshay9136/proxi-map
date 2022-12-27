import Imap from './index';
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

test('with value', () => {
    const newData = Imap(data)
        .category1
        .products[0].active(true)
        .unwrap();
    expect(newData).not.toBe(data);
    expect(newData.category1).not.toBe(data.category1);
    expect(newData.category2).toBe(data.category2);
    const { products } = newData.category1;
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
