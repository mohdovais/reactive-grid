import React from 'react';
import ColGroup from './ColGroup.jsx';
import THead from './THead.jsx';
import TBody from './TBody.jsx';
import pure from './../../utils/pure-component';

function Table(props) {
	const columns = props.columns;
	const data = props.data;
	return (
		<table>
			<THead columns={columns} />
			<TBody columns={columns} data={data} />
		</table>
	);
}

export default pure(Table);
