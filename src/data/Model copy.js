import {
    isUndefined,
    isObject,
    hasOwnProperty,
    freezeAssign
} from './../utils/object.js';
import { isString } from './../utils/string.js';
import Observable from './Observable.js';
import { customEvent } from './CustomEvent.js';

const CHANGE = 'change';
const object = Object;
const keys = object.keys;

export default function Model(props, options) {
    const me = this;
    const config = object.assign({}, options);
    let crudState = config.commit === true ? 'R' : 'C';
    let modified = {};
    let data = freezeAssign({}, props);
    const observable = new Observable();

    me.get = function(fieldName) {
        return isUndefined(fieldName) ? data : data[fieldName];
    };

    me.set = function set(fieldName, value, options) {
        if (isObject(fieldName)) {
            keys(fieldName).forEach(prop => {
                set(prop, fieldName[prop], value);
            });

            observable.dispatch(customEvent(CHANGE, me));
        }

        if (isString(fieldName) && me.get(fieldName) !== value) {
            if (!hasOwnProperty(modified, fieldName)) {
                modified[fieldName] = data[fieldName];
            } else if (modified[fieldName] === value) {
                delete modified[fieldName];
            }

            crudState =
                crudState !== 'C' && keys(modified).length === 0 ? 'R' : 'U';

            data = freezeAssign({}, data, {
                [fieldName]: value
            });

            observable.dispatch(customEvent(CHANGE, me));
        }

        return me;
    };

    me.reject = function() {
        if (me.isModified()) {
            data = freezeAssign({}, data, modified);
            me.commit();
            observable.dispatch(customEvent(CHANGE, me));
        }

        return me;
    };

    me.commit = function() {
        modified = {};
        crudState = 'R';
        return me;
    };

    me.drop = function() {
        crudState = 'D';
        return me;
    };

    me.isModified = function(fieldName) {
        return (
            crudState === 'U' &&
            (isUndefined(fieldName) || hasOwnProperty(modified, fieldName))
        );
    };

    me.getModifiedProps = function() {
        return keys(modified);
    };

    me.isDropped = function() {
        return crudState === 'D';
    };

    me.subscribe = function() {
        observable.subscribe.apply(observable, arguments);
    };

    me.unsubscribe = function() {
        observable.unsubscribe.apply(observable, arguments);
    };
}
