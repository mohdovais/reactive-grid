export function arrayFrom(array) {
	if (array === undefined) {
		return [];
	}

	if (Array.isArray(array)) {
		return array.slice();
    }
    
    return [array];
}
