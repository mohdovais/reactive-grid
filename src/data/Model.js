import { isUndefined, isObject, hasOwnProperty } from './../utils/object.js';
import { isString } from './../utils/string.js';
import Observable from './Observable.js';
import { customEvent } from './CustomEvent.js';

const CHANGE = 'change';
const object = Object;
const keys = object.keys;

export default class Model {
    constructor(data, options) {
        const config = Object.assign({}, options);
        this._crudState = config.commit === true ? 'R' : 'C';
        this._modified = {};
        this._data = Object.assign({}, data);
        this._observable = new Observable();
    }

    get(fieldName) {
        return isUndefined(fieldName) ? this._data : this._data[fieldName];
    }

    set(fieldName, value, options) {
        const me = this;

        if (isObject(fieldName)) {
            keys(fieldName).forEach(prop => {
                me.set(prop, fieldName[prop], value);
            });

            me._observable.dispatch(customEvent(CHANGE, me));
        }

        if (isString(fieldName) && me.get(fieldName) !== value) {
            if (!hasOwnProperty(me._modified, fieldName)) {
                me._modified[fieldName] = me._data[fieldName];
            } else if (me._modified[fieldName] === value) {
                delete me._modified[fieldName];
            }

            me._crudState =
                me._crudState !== 'C' && keys(me._modified).length === 0
                    ? 'R'
                    : 'U';

            Object.assign(me._data, {
                [fieldName]: value
            });

            me._observable.dispatch(customEvent(CHANGE, me));
        }

        return me;
    }

    reject() {
        const me = this;
        if (me.isModified()) {
            Object.assign(me._data, me._modified);
            me.commit();
            me._observable.dispatch(customEvent(CHANGE, me));
        }

        return me;
    }

    commit() {
        var me = this;
        me._modified = {};
        me._crudState = 'R';
        return me;
    }

    drop() {
        this._crudState = 'D';
        return this;
    }

    isModified(fieldName) {
        return (
            this._crudState === 'U' &&
            (isUndefined(fieldName) ||
                hasOwnProperty(this._modified, fieldName))
        );
    }

    getModifiedProps() {
        return keys(this._modified);
    }

    isDropped() {
        return this._crudState === 'D';
    }

    subscribe() {
        const observable = this._observable;
        observable.subscribe.apply(observable, arguments);
    }

    unsubscribe() {
        const observable = this._observable;
        observable.unsubscribe.apply(observable, arguments);
    }
}

Model.prototype.name = 'Model';
