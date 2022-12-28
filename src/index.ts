import {
    copyByPath,
    findByPath,
    isFunction,
    isObject,
    shallowCopy,
} from './utils';

type Key = string | number | symbol;
type Obj = { [key: Key]: any };

const proxyWrapper = (root: Obj, path: Key[]) => (obj: Obj) => {
    return new Proxy(obj, {
        get(target, name, parent) {
            if (Reflect.has(target, name)) {
                const value = Reflect.get(target, name, parent);
                const proxy = proxyWrapper(root, path.concat(name));
                const applyReducer = (reducer: any) => {
                    const val = isFunction(reducer) ? reducer(value) : reducer;
                    if (val !== value) {
                        root = shallowCopy(root);
                        parent = copyByPath(root, path);
                        parent[name] = val;
                    }
                    const utils = {
                        unwrap: () => root,
                        backtrack: (index: number) => {
                            const _path = path.concat(name).slice(0, index);
                            const _obj = findByPath(root, _path);
                            return proxyWrapper(root, _path)(_obj);
                        },
                    };
                    if (isObject(parent[name])) {
                        return Object.assign(utils, proxy(parent[name]));
                    }
                    return utils;
                };
                Object.defineProperties(applyReducer, {
                    length: { writable: true },
                    name: { writable: true },
                });
                if (isObject(value)) {
                    Object.assign(applyReducer, proxy(value));
                    return applyReducer;
                }
                return applyReducer;
            }
        },
    });
};

export default function Imap(obj: Obj) {
    return proxyWrapper(obj, [])(obj);
}
