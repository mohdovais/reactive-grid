import React from 'react';
import TR from './TBodyTR.jsx';
import pure from './../../utils/pure-component';

function TBody(props) {
	return <tbody>{props.data.map((record) => <TR columns={props.columns} data={record} />)}</tbody>;
}

export default pure(TBody);
