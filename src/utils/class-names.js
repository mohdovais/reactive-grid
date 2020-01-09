const valid = /-?[_a-zA-Z]+[_a-zA-Z0-9-]*/;
export default function classNames() {
    const sep = ' ';
    return Array.prototype.slice
        .call(arguments)
        .filter(className => typeof className === 'string')
        .join(sep)
        .split(sep)
        .reduce(function(accum, item) {
            if (valid.test(item) && accum.indexOf(item) === -1) {
                accum.push(item);
            }
            return accum;
        }, [])
        .join(sep);
}
