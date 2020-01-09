import React from 'react';
import { SET_CURRENT_PAGE, SET_PAGE_SIZE } from '../../useStore';

function Pager(props) {
    const { store, dispatch } = props;
    const { currentPage, totalPages, pageSize, count } = store;
    const start = currentPage * pageSize + 1;
    const end = start + store.page.length - 1;
    return (
        <div>
            <div>
                <button
                    type="button"
                    title="First page"
                    disabled={currentPage === 0}
                    onClick={() =>
                        dispatch({
                            type: SET_CURRENT_PAGE,
                            currentPage: 0
                        })
                    }
                >
                    &lt;&lt;
                </button>
                <button
                    type="button"
                    title="Previous page"
                    disabled={currentPage === 0}
                    onClick={() =>
                        dispatch({
                            type: SET_CURRENT_PAGE,
                            currentPage: currentPage - 1
                        })
                    }
                >
                    &lt;
                </button>
                Page
                <input
                    type="number"
                    title="Page number"
                    value={currentPage + 1}
                    onChange={event =>
                        dispatch({
                            type: SET_CURRENT_PAGE,
                            currentPage: event.target.value | 0
                        })
                    }
                />
                of {totalPages}
                <button
                    type="button"
                    title="Next page"
                    disabled={currentPage === totalPages - 1}
                    onClick={() =>
                        dispatch({
                            type: SET_CURRENT_PAGE,
                            currentPage: currentPage + 1
                        })
                    }
                >
                    &gt;
                </button>
                <button
                    type="button"
                    title="Last page"
                    disabled={currentPage === totalPages - 1}
                    onClick={() =>
                        dispatch({
                            type: SET_CURRENT_PAGE,
                            currentPage: totalPages - 1
                        })
                    }
                >
                    &gt;&gt;
                </button>
                <select
                    title="Page size"
                    value={pageSize}
                    onChange={event =>
                        dispatch({
                            type: SET_PAGE_SIZE,
                            pageSize: event.target.value | 0
                        })
                    }
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={500}>500</option>
                    <option value={1000}>1000</option>
                </select>{' '}
                items per page
            </div>
            <div>
                {start} - {end} of {count} items
            </div>
        </div>
    );
}

export default React.memo(Pager);
