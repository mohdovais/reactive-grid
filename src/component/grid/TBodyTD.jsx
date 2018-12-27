import React from 'react';
import pure from './../../utils/pure-component.js';
import { SPACE } from './../../utils/constant.js';
import { isFunction } from './../../utils/function.js';
import { isEmptyString } from './../../utils/string.js';
import { isUndefined } from './../../utils/object.js';

function emptyCellText(value, emptyText) {
	return isEmptyString(value) ? (isUndefined(emptyText) ? SPACE : emptyText) : value;
}

function TBodyTD(props) {
	const column = props.column;
	const data = props.data;
	const style = column.style;
	const renderer = column.renderer;
	const value = data[column.dataIndex];

	return (
		<td style={isFunction(style) ? style(column, data) : style}>
			{isFunction(renderer) ? renderer(value, data, column) : emptyCellText(value, column.emptyCellText)}
		</td>
	);
}

export default pure(TBodyTD);
