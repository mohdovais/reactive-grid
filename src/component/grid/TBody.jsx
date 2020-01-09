import React from 'react';
import TBodyTR from './TBodyTR.jsx';

function TBody(props) {
    return (
        <tbody>
            {props.data.map(record => (
                <TBodyTR
                    key={record[props.rowKey]}
                    record={record}
                    columns={props.columns}
                />
            ))}
        </tbody>
    );
}

export default React.memo(TBody);
