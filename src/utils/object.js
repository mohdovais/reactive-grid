const object = Object;
const prototype = object.prototype;

export function isUndefined(obj) {
    return obj === undefined;
}

export function isNull(obj) {
    return obj === null;
}

export function isNullOrUndefined(obj) {
    return isUndefined(obj) || isNull(obj);
}

export function typeOf(obj) {
    return /\[object\s([a-zA-Z]+)\]/
        .exec(prototype.toString.call(obj))[1]
        .toLowerCase();
}

export function hasOwnProperty(obj, prop) {
    return prototype.hasOwnProperty.call(obj, prop);
}

export function isObject(obj) {
    return typeOf(obj) === 'object';
}

export function freezeAssign() {
    return object.freeze(object.assign.apply(object, arguments));
}

export function shallowDiffers(a, b) {
    for (let key in a) if (a[key] !== b[key]) return true;
    for (let key in b) if (!(key in a)) return true;
    return false;
}
