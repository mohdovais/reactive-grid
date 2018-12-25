import React from 'react';
import THead from './THead.jsx';
import TBody from './TBody.jsx';
import pure from './../../utils/pure-component.js';

function Table(props) {
	const columns = props.columns;
	const data = props.data;
	return (
		<table>
			<THead
				columns={columns}
				sortedColumn={props.sortedColumn}
				sortedDirection={props.sortedDirection}
				onHeaderClick={props.onHeaderClick}
			/>
			<TBody columns={columns} data={data} />
		</table>
	);
}

export default pure(Table);
