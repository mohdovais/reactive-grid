import {isNullOrUndefined} from './object.js'; 

export function isEmptyString(str) {
	return str === '' || isNullOrUndefined(str);
}
