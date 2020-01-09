import React from 'react';
import { SPACE } from '../../utils/constant.js';
import { isFunction } from '../../utils/function.js';
import { isEmptyString } from '../../utils/string.js';
import { isUndefined } from '../../utils/object.js';

function emptyCellText(value, emptyText) {
    return isEmptyString(value)
        ? isUndefined(emptyText)
            ? SPACE
            : emptyText
        : value;
}

function isEditing(value, record, column) {
    const editing = column.editing;
    const hasEditor = !isUndefined(column.editor);
    return (
        hasEditor &&
        (isFunction(editing) ? editing(value, record, column) : editing) ===
            true
    );
}

function getStyle(column, data) {
    return isFunction(column.style) ? column.style(column, data) : column.style;
}

function renderDisplayValue(value, data, column) {
    const renderer = column.renderer;
    return isFunction(renderer)
        ? renderer(value, data, column)
        : emptyCellText(value, column.emptyCellText);
}

function TBodyTD(props) {
    const data = props.record;
    const value = data[props.dataIndex];

    return (
        <td style={getStyle(props, data)}>
            {isEditing(value, data, props)
                ? props.editor(value, data, props, props.onChange)
                : renderDisplayValue(value, data, props)}
        </td>
    );
}

export default React.memo(TBodyTD);
