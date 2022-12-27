import { copyByPath, isFunction, isObject, shallowCopy } from './utils';

type Key = string | number | symbol;
type Obj = { [key: Key]: any };

const proxyGetter = (root: Obj, path: Key[]) => (obj: Obj) => {
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

export default function Imap(obj: Obj) {
    return proxyGetter(obj, [])(obj);
}
