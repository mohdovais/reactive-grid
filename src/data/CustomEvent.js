import { isFunction } from '../utils/function';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */

function CustomEventPolyfill(event, params) {
    params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
    );
    return evt;
}

CustomEventPolyfill.prototype = window.Event.prototype;

export const MadeEvent = isFunction(window.CustomEvent)
    ? CustomEvent
    : CustomEventPolyfill;

export function customEvent(eventName, target) {
    return new MadeEvent(eventName, {
        detail: target
    });
    //object.defineProperty(event, 'target', { writable: false, value: target });
    //return event;
}
