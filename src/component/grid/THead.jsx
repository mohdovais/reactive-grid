import React from 'react';
import pure from './../../utils/pure-component';

function THead(props) {
	return (
		<thead>
			<tr>{props.columns.map((column) => <th>{column.text}</th>)}</tr>
		</thead>
	);
}

export default pure(THead);
