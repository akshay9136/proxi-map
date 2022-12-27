import { copyByPath, isFunction, isObject, shallowCopy } from './utils';

const proxyGetter = (root: any, path: any[]) => (obj: any) => {
    return new Proxy(obj, {
        get(target, name, parent) {
            if (Reflect.has(target, name)) {
                const value = Reflect.get(target, name, parent);
                const proxy = proxyGetter(root, path.concat(name));
                const applyReducer = (reducer: any) => {
                    const val = isFunction(reducer) ? reducer(value) : reducer;
                    if (val !== value) {
                        root = shallowCopy(root);
                        parent = copyByPath(root, path);
                        parent[name] = val;
                    }
                    if (isObject(parent[name])) {
                        return Object.assign(
                            { unwrap: () => root },
                            proxy(parent[name])
                        );
                    }
                    return { unwrap: () => root };
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

export default class Imap {
    constructor(obj: any) {
        return proxyGetter(obj, [])(obj);
    }
    static of(obj: any) {
        return new Imap(obj) as any;
    }
}
