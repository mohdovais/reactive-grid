import React from 'react';
import Panel from './../panel/Panel.jsx';
import Table from './Table.jsx';
import classNames from './../../utils/class-names.js';
import { prefix, EMPTY_MESSAGE, DESC, ASC } from './../../utils/constant.js';
import sort from './column-sort.js';

import style from './Panel.css';

function forcedArray(value) {
	return Array.isArray(value) ? value : [];
}

export default class GridPanel extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			forced: false,
			data: props.data,
			sortedColumn: null,
			sortedDirection: null
		};
		this.onColumnClick = this.onColumnClick.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		if (state.forced) {
			return {
				forced: false,
				data: state.data
			};
		} else {
			return {
				sortedColumn: null,
				sortedDirection: null,
				data: props.data
			};
		}
	}

	render() {
		const props = this.props;
		const state = this.state;
		const columns = forcedArray(props.columns);
		const data = forcedArray(state.data);

		return (
			<Panel
				className={classNames(`${prefix}-grid`, props.className)}
				title={props.title}
				dockedItems={props.dockedItems}
				style={props.style}
			>
				{data.length === 0 ? (
					EMPTY_MESSAGE
				) : (
					<Table
						columns={columns}
						data={data}
						sortedColumn={state.sortedColumn}
						sortedDirection={state.sortedDirection}
						onHeaderClick={this.onColumnClick}
					/>
				)}
			</Panel>
		);
	}

	onColumnClick(event, column) {
		const state = this.state;
		const direction = state.sortedDirection === DESC ? ASC : DESC;
		this.setState({
			data: sort(state.data, column, direction),
			forced: true,
			sortedColumn: column,
			sortedDirection: direction
		});
	}
}
