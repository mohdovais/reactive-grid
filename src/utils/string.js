import { isNullOrUndefined, typeOf } from './object.js';

export function isEmptyString(str) {
    return str === '' || isNullOrUndefined(str);
}

export function isString(str) {
    return typeOf(str) === 'string';
}
