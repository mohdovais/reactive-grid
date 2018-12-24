import React from 'react';
import Panel from './../panel/Panel.jsx';
import Table from './Table.jsx';
import classNames from './../../utils/class-names.js';
import { prefix, EMPTY_MESSAGE } from './../../utils/constant.js';
import style from './Panel.css';

function forcedArray(value) {
	return Array.isArray(value) ? value : [];
}

function getChild(columns, data) {
	return data.length === 0 ? EMPTY_MESSAGE : <Table columns={columns} data={data} />;
}

export default function GridPanel(props) {
	const columns = forcedArray(props.columns);
	const data = forcedArray(props.data);

	return (
		<Panel
			className={classNames(`${prefix}-grid`, props.className)}
			title={props.title}
			dockedItems={props.dockedItems}
			style={props.style}
		>
			{getChild(columns, data)}
		</Panel>
	);
}
