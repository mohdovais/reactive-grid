export function isUndefined(obj) {
	return obj === undefined;
}

export function isNull(obj) {
	return obj === null;
}

export function isNullOrUndefined(obj) {
	return isUndefined(obj) || isNull(obj);
}
