export default [
	{
		text: 'Column One',
		dataIndex: 'column1'
	},
	{
		text: 'Column Two',
		dataIndex: 'column2',
		sortable: false
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
	},
	{
		text: 'Column Nine',
		renderer: function(value, record, column) {
			return record.column1 + ' ' + record.column2;
		},
		sorter: function(first, second) {
			return first.column8 - second.column8;
		}
	}
];
