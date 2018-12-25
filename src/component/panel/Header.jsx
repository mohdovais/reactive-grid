import React from 'react';
import { prefix } from '../../utils/constant.js';
import pure from './../../utils/pure-component';
import style from './Header.css';

const classPrefix = `${prefix}-panel-header`;

function Header(props) {
	const children = props.children;
	return children.length === 0 ? null : (
		<header className={`${classPrefix}`}>
			<h4 className={`${classPrefix}-title`}>{children}</h4>
			<div className={`${classPrefix}-tools`}>
				<button title={props.collapsed ? 'Expand' : 'Collapse'} onClick={props.onCollapse}>
				{props.collapsed ? '◀' : '▲'}
				</button>
			</div>
		</header>
	);
}

export default pure(Header);
