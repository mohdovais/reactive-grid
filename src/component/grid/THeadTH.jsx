import React from 'react';
import pure from '../../utils/pure-component.js';
import { isFunction, emptyFn } from '../../utils/function.js';
import style from './THeadTH.css';

function isColumnSortable(column) {
	return !(column.sortable === false || (column.dataIndex == undefined && column.sorter === undefined));
}

function onColumnClick(column, onClick) {
	const callback = isFunction(onClick) ? onClick : emptyFn;
	return (event) => {
		callback(event, column);
	};
}

function THeadTH(props) {
	const column = props.column;
	const sortable = isColumnSortable(column);
	const classNames = [
		props.sortedColumn === column ? 'sorted ' + props.sortedDirection : '',
		sortable ? 'sortable' : 'not-sortable'
	].join(' ').trim();
	return (
		<th className={classNames} onClick={sortable && onColumnClick(column, props.onHeaderClick)}>
			{column.text}
		</th>
	);
}

export default pure(THeadTH);
