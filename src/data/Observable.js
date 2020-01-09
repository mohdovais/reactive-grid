import { isUndefined } from '../utils/object.js';

const Observable = function() {
    this.subscribers = {};
};
const prototype = Observable.prototype;

prototype.subscribers = null;

prototype.subscribe = function(type, callback) {
    const subscribers = this.subscribers;
    if (!(type in subscribers)) {
        subscribers[type] = [];
    }
    subscribers[type].push(callback);
};

prototype.unsubscribe = function(type, callback) {
    const subscribers = this.subscribers;
    if (!(type in subscribers)) {
        return;
    }
    var stack = subscribers[type];
    for (var i = 0, l = stack.length; i < l; i++) {
        if (stack[i] === callback) {
            stack.splice(i, 1);
            return;
        }
    }
};

prototype.dispatch = function(event, scope) {
    const subscribers = this.subscribers;
    if (!(event.type in subscribers)) {
        return true;
    }
    var stack = subscribers[event.type].slice();

    for (var i = 0, l = stack.length; i < l; i++) {
        stack[i].call(isUndefined(scope) ? this : scope, event);
    }
    return !event.defaultPrevented;
};

export default Observable;
