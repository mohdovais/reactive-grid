import React from 'react';

export const LOADE_DATA = 0;
export const SET_SORT = 1;
export const SET_CURRENT_PAGE = 2;
export const SET_PAGE_SIZE = 3;

const ASC = 'ASC';

const initialState = {
    page: [],
    source: [],
    sortedColumn: '',
    sortedDirection: 'ASC',
    currentPage: 0,
    totalPages: 0,
    pageSize: 10,
    count: 0
};

function setCurrentPage(state, currentPage) {
    const { pageSize, source } = state;
    const start = pageSize * currentPage;

    return Object.assign({}, state, {
        currentPage,
        page: source.slice(start, start + pageSize)
    });
}

function setPageSize(state, pageSize) {
    return setCurrentPage(
        Object.assign({}, state, {
            pageSize
        }),
        state.currentPage
    );
}

function setSorting(state, column, direction, sorter) {
    return setCurrentPage(
        Object.assign({}, state, {
            source: state.source.sort(
                compareFunction(column, direction, sorter)
            ),
            sortedColumn: column,
            sortedDirection: direction
        }),
        state.currentPage
    );
}

function compareFunction(column, direction, sorter) {
    return typeof sorter === 'function'
        ? customCompare(sorter, direction)
        : compare(column, direction);
}

function compare(sortingProperty, direction) {
    const dir = direction === ASC ? 1 : -1;
    return function(firstEl, secondEl) {
        const a = firstEl[sortingProperty];
        const b = secondEl[sortingProperty];

        if (a < b) {
            return -1 * dir;
        }

        if (a > b) {
            return 1 * dir;
        }

        return 0;
    };
}

function customCompare(sorter, direction) {
    const dir = direction === ASC ? 1 : -1;
    return (firstEl, secondEl) => sorter(firstEl, secondEl) * dir;
}

function reducer(state, action) {
    switch (action.type) {
        case LOADE_DATA:
            return setCurrentPage(
                Object.assign({}, state, {
                    source: action.data,
                    count: action.data.length,
                    totalPages: Math.ceil(action.data.length / state.pageSize)
                }),
                state.currentPage
            );
        case SET_CURRENT_PAGE:
            return setCurrentPage(state, action.currentPage | 0);
        case SET_PAGE_SIZE:
            return setPageSize(state, action.pageSize | 0);
        case SET_SORT:
            return setSorting(
                state,
                action.column,
                action.direction,
                action.sorter
            );
    }
    return state;
}

export default function(state) {
    return React.useReducer(reducer, Object.assign({}, initialState, state));
}
