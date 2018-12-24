import React from 'react';
import pure from './../../utils/pure-component';
import { isFunction } from './../../utils/function';

function TBodyTD(props) {
	const column = props.column;
	const data = props.data;
	const style = column.style;
	const renderer = column.renderer;
	const value = data[column.dataIndex];

	return (
		<td style={isFunction(style) ? style(column, data) : style}>
			{isFunction(renderer) ? renderer(value, data, column) : value}
		</td>
	);
}

export default pure(TBodyTD);
