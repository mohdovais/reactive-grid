import React from 'react';
import pure from './../../utils/pure-component';

function ColGroup(props) {
	return <colgroup>{props.columns.map((column) => <col style={column.style} />)}</colgroup>;
}

export default pure(ColGroup);
