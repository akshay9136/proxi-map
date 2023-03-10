type Key = string | number | symbol;
type Obj = { [key: Key]: any };

function isObject(el: any) {
    return typeof el === 'object' && el !== null;
}

function isFunction(el: any) {
    return typeof el === 'function';
}

function shallowCopy(el: Obj) {
    if (Array.isArray(el)) return el.slice();
    if (isObject(el)) return { ...el };
    return el;
}

function copyByPath(obj: Obj, path: Key[]) {
    return path.reduce((acc: Obj, key: Key) => {
        acc[key] = shallowCopy(acc[key]);
        return acc[key];
    }, obj);
}

function findByPath(obj: Obj, path: Key[]) {
    return path.reduce((acc: Obj, key: Key) => acc[key], obj);
}

export {
    isObject,
    isFunction,
    shallowCopy,
    copyByPath,
    findByPath,
};
