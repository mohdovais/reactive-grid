import React from 'react';
import Panel from './component/panel/Panel';
import Table from './component/grid/Table';
import Column from './component/grid/Column';
import Pager from './component/pagination/Pager';
import useStore, { LOADE_DATA, SET_SORT } from './useStore';

export default function App() {
    const [store, dispatch] = useStore();
    const onSortChange = (col, direction) => {
        dispatch({
            type: SET_SORT,
            column: col.dataIndex,
            direction,
            sorter: col.sorter
        });
    };

    React.useEffect(() => {
        fetch('data/data-01.json')
            .then(response => response.json())
            .then(data => dispatch({ type: LOADE_DATA, data }));
    }, []);

    return (
        <Panel title="Hello World!">
            <Table
                data={store.page}
                onHeaderClick={onSortChange}
                rowKey="id"
                sortedColumn={store.sortedColumn}
                sortedDirection={store.sortedDirection}
            >
                <Column text="ID" dataIndex="id" key="id" />
                <Column
                    text="First Name"
                    dataIndex="first_name"
                    key="first_name"
                    editing={true}
                    editor={function(value, record, onChange) {
                        return <input type="text" defaultValue={value} />;
                    }}
                />
                <Column
                    text="Last Name"
                    dataIndex="last_name"
                    key="last_name"
                    onClick={function() {
                        debugger;
                    }}
                />
                <Column
                    text="Name"
                    renderer={(value, record, column) =>
                        `${record.first_name} ${record.last_name}`
                    }
                    key="full_name"
                />
                <Column text="Email" dataIndex="email" key="email" />
                <Column
                    text="Gender"
                    dataIndex="gender"
                    renderer={value => {
                        switch (value) {
                            case 'M':
                                return 'Male';
                            case 'F':
                                return 'Female';
                            default:
                                return 'Unknown';
                        }
                    }}
                    key="gender"
                />
                <Column
                    text="Date of Birth"
                    dataIndex="date_of_birth"
                    key="date_of_birth"
                />
            </Table>
            <Pager store={store} dispatch={dispatch} />
        </Panel>
    );
}
