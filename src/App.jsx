import React from 'react';
import Grid from './component/grid/Panel.jsx';
import gen from './data';
import columns from './columns.js';
import style from './App.css';


export default class Application extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			random: Math.random()
		};
	}

	/*
	componentDidMount() {
		var me = this;
		me.timer = setInterval(function() {
			me.setState(() => {
				random: Math.random();
			});
		}, 100);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}
	*/

	render() {
		return (
			<Grid
				//style={{ height: '400px' }}
				title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
				columns={columns}
				data={gen(8, 25)}
				tools={[ <button>WTF</button> ]}
			/>
		);
	}
}
