import React from 'react';
import TD from './TBodyTD.jsx';

function TBodyTR(props) {
    return (
        <tr>
            {props.columns.map(column => (
                <TD {...column} record={props.record} />
            ))}
        </tr>
    );
}

export default React.memo(TBodyTR);
