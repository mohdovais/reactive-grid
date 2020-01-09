import React from 'react';
import THeadTH from './THeadTH.jsx';

function THead(props) {
    console.log('render head');
    return (
        <thead>
            <tr>
                {props.columns.map((column, i) => (
                    <THeadTH
                        key={column.key}
                        column={column}
                        columnIndex={i}
                        sortedColumn={props.sortedColumn}
                        sortedDirection={props.sortedDirection}
                        onHeaderClick={props.onHeaderClick}
                    />
                ))}
            </tr>
        </thead>
    );
}

export default React.memo(THead);
