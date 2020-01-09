export function arrayFrom(array) {
    if (array === undefined || array === null) {
        return [];
    }

    if (Array.isArray(array)) {
        return array;
    }

    return [array];
}
