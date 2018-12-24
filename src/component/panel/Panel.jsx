import React from 'react';
import Header from './Header.jsx';
import { prefix } from '../../utils/constant.js';
import { arrayFrom } from './../../utils/array.js';
import classNames from './../../utils/class-names';
import style from './Panel.css';

const classPrefix = `${prefix}-panel`;

function getDockedItems(dock, items) {
	var dockedItems = items.filter((item) => item.dock === dock);
	return dockedItems.length === 0 ? null : <div />;
}

export default class Panel extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false
		};
		this.toggleCollapse = this.toggleCollapse.bind(this);
	}

	render() {
		const props = this.props;
		const dockedItems = arrayFrom(props.dockedItems);
		const tools = arrayFrom(props.tools);
		const collapsed = this.state.collapsed;
		return (
			<section
				className={classNames(classPrefix, collapsed ? classPrefix + '-collapsed' : null, props.className)}
				style={props.style}
			>
				<Header tools={tools} onCollapse={this.toggleCollapse} collapsed={collapsed}>
					{props.title}
				</Header>
				<div className={classNames(classPrefix + '-content-wrapper', collapsed ? 'collapsed' : null)}>
					{getDockedItems('top', dockedItems)}
					<div className={`${classPrefix}-body`}>{props.children}</div>
					{getDockedItems('bottom', dockedItems)}
				</div>
			</section>
		);
	}

	toggleCollapse() {
		this.setState((state) => {
			return {
				collapsed: !state.collapsed
			};
		});
	}
}
