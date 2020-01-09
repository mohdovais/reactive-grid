import React from 'react';

import { arrayFrom } from '../../utils/array.js';
import { EMPTY_MESSAGE } from '../../utils/constant.js';
import THead from './THead.jsx';
import TBody from './TBody.jsx';

function Table(props) {
    return arrayFrom(props.data).length === 0
        ? EMPTY_MESSAGE
        : renderTable(props);
}

function renderTable(props) {
    //const columns = props.children;
    const columns = React.Children.map(props.children, column =>
        Object.assign({}, column.props, {
            key: column.key
        })
    );
    return (
        <table width="100%">
            <THead
                columns={columns}
                sortedColumn={props.sortedColumn}
                sortedDirection={props.sortedDirection}
                onHeaderClick={props.onHeaderClick}
            />
            <TBody
                columns={columns}
                data={props.data}
                onChange={props.onChange}
                rowKey={props.rowKey}
            />
        </table>
    );
}

export default React.memo(Table);
