function isObject(el: any) {
    return typeof el === 'object' && el !== null;
}

function isFunction(el: any) {
    return typeof el === 'function';
}

function shallowCopy(el: any) {
    if (Array.isArray(el)) return el.slice();
    if (isObject(el)) return { ...el };
    return el;
}

function copyByPath(obj: any, path: any[]) {
    return path.reduce((acc: { [x: string]: any; }, key: string | number) => {
        acc[key] = shallowCopy(acc[key]);
        return acc[key];
    }, obj);
}

export {
    isObject,
    isFunction,
    shallowCopy,
    copyByPath 
};
