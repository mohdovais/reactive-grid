import React from 'react';
import Grid from './component/grid/Panel.jsx';
import gen from './data';
import style from './App.css';

const columns = [
	{
		text: 'Column One',
		dataIndex: 'column1'
	},
	{
		text: 'Column Two',
		dataIndex: 'column2'
	},
	{
		text: 'Column Three',
		dataIndex: 'column3'
	},
	{
		text: 'Column Four',
		dataIndex: 'column4'
	},
	{
		text: 'Column Five',
		dataIndex: 'column5'
	},
	{
		text: 'Column Six',
		dataIndex: 'column6'
	},
	{
		text: 'Column Seven',
		dataIndex: 'column7'
	},
	{
		text: 'Column Eight',
		dataIndex: 'column8',
		style: function(column, record) {
			return {
				textAlign: 'right',
				backgroundColor: record.column8 < 500 ? 'rgba(255,0,0,0.1)' : 'inherit'
			};
		}
	}
];

export default class Application extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			random: Math.random()
		};
	}

	componentDidMount() {
		return;
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

	render() {
		return (
			<Grid
				style={{ height: '400px' }}
				title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
				columns={columns}
				data={gen(8, 25)}
				tools={[ <button>WTF</button> ]}
			/>
		);
	}
}
