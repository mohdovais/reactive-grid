import React from 'react';
import TD from './TBodyTD.jsx';
import pure from './../../utils/pure-component';

function TBodyTR(props) {
	return <tr>{props.columns.map((column) => <TD column={column} data={props.data} />)}</tr>;
}

export default pure(TBodyTR);
