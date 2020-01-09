import React from 'react';
import { isFunction, emptyFn } from '../../utils/function.js';
import { isUndefined } from '../../utils/object.js';
import { DESC, ASC } from '../../utils/constant.js';
import classNames from '../../utils/class-names.js';
import './THeadTH.css';

function isColumnSortable(column) {
    return !(
        column.sortable === false ||
        (isUndefined(column.dataIndex) && isUndefined(column.sorter))
    );
}

function onColumnClick(column, direction, onClick) {
    const callback = isFunction(onClick) ? onClick : emptyFn;
    return () => {
        callback(column, direction === DESC ? ASC : DESC);
    };
}

function THeadTH(props) {
    const column = props.column;
    const sortable = isColumnSortable(column);
    const className = classNames(
        props.sortedColumn === column ? 'sorted ' + props.sortedDirection : '',
        sortable ? 'sortable' : 'not-sortable'
    );

    return (
        <th
            className={className}
            onClick={
                sortable
                    ? onColumnClick(
                          column,
                          props.sortedDirection,
                          props.onHeaderClick
                      )
                    : undefined
            }
        >
            {column.text}
        </th>
    );
}

export default React.memo(THeadTH);
