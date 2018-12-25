import React from 'react';
import TH from './THeadTH';
import pure from './../../utils/pure-component.js';

function THead(props) {
	return (
		<thead>
			<tr>
				{props.columns.map((column) => (
					<TH
						column={column}
						sortedColumn={props.sortedColumn}
						sortedDirection={props.sortedDirection}
						onHeaderClick={props.onHeaderClick}
					/>
				))}
			</tr>
		</thead>
	);
}

export default pure(THead);
