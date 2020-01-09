//import Model from './Model.js';
//import { arrayFrom } from '../utils/array.js';
import Observable from './Observable.js';
import { customEvent } from './CustomEvent.js';

function applyFilters(source, filters) {
    return filters.reduce(
        (accumulator, filter) => accumulator.filter(filter),
        source
    );
}

function applySorters(source, sorters) {
    return sorters.reduce(
        (accumulator, sorter) => accumulator.sort(sorter),
        source
    );
}

function Store(config) {
    const me = this;
    const prototype = Object.getPrototypeOf(me);
    const options = Object.assign({}, config);
    const observable = new Observable();

    let dataSource = [];
    let dataFiltered = [];
    let dataPage = [];

    let filters = [];
    let sorters = [];

    let pageSize = 25;
    let currentPage = 1;
    let totalPages = 1;

    function setDataSource(data) {
        dataSource = data;
        dataFiltered = applyFilters(dataSource, filters);

        totalPages = Math.floor(dataFiltered.length / pageSize);
        currentPage = Math.max(Math.min(currentPage, totalPages), 1);

        dataPage = Object.freeze(
            applySorters(dataFiltered, sorters).slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
            )
            //.map(record => record.get())
        );

        observable.dispatch(customEvent('change', me));
    }

    Object.assign(me, {
        getDataSource: function() {
            return dataSource;
        },
        setData: function(records) {
            setDataSource(prototype.insert.call(me, [], records));
        },

        getPage: () => dataPage,

        getCurrentPage: () => currentPage,
        setCurrentPage: page => {
            currentPage = page | 0;
            setDataSource(dataSource);
        },

        getPageSize: () => pageSize,
        setPageSize: size => {
            pageSize = size | 0;
            setDataSource(dataSource);
        },

        getTotalPages: () => totalPages,

        insert: function(records, index) {
            setDataSource(
                prototype.insert.call(me, me.getDataSource(), records, index)
            );
        },

        subscribe: function(type, callback) {
            observable.subscribe(type, callback);
        },
        unsubscribe: function(type, callback) {
            observable.unsubscribe(type, callback);
        }
    });

    me.setData(options.data);
}

Object.assign(Store.prototype, {
    getDataSource: function() {
        return [];
    },

    getTotalCount: function() {
        return this.getDataSource().length;
    },

    getCount: function() {
        return this.getDataSource().length;
    },

    getAll: function() {
        return this.getDataSource().map(record => record.get());
    },

    insert: function(dataSource, records, index = 0) {
        return Object.freeze(
            dataSource.slice(0, index).concat(
                //arrayFrom(records).map(record => new Model(record)),
                records,
                dataSource.slice(index)
            )
        );
    },

    add: function(records) {
        this.insert(this.getCount(), records);
    }
});

export default Store;
