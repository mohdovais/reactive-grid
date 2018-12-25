import {isFunction} from './../../utils/function.js';
import {ASC} from './../../utils/constant.js';

export default function sort(data, column, direction) {
    return data.slice().sort(compareFunction(column, direction));
}

function compareFunction(column, direction) {
    const sortingProperty = column.dataIndex;
    return isFunction(column.sorter)
        ? customCompare(column.sorter, direction)
        : compare(sortingProperty, direction)
}

function compare(sortingProperty, direction){
    const dir = direction === ASC ? 1 : -1;
    return function(firstEl, secondEl) {
        const a = firstEl[sortingProperty];
        const b = secondEl[sortingProperty];

        if (a < b) {
            return -1 * dir;
        }

        if (a > b) {
            return 1 * dir;
        }

        return 0;
    };
}

function customCompare(sorter, direction){
    const dir = direction === ASC ? 1 : -1;
    return function(firstEl, secondEl){
        return sorter(firstEl, secondEl) * dir;
    }
}