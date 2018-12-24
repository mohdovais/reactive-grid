//https://gist.github.com/developit/b3231344b6b056374bc630fa58308616
import { Component } from 'react';

export default function pure(target) {
	if (target.prototype && target.prototype.render) {
		target.prototype.shouldComponentUpdate = shouldComponentUpdate;
	} else {
		return target.__scuWrap || (target.__scuWrap = wrap(target));
	}
}

function wrap(fn) {
	class Wrap extends Wrapper {}
	Wrap.prototype.renderChild = fn;
	return Wrap;
}

class Wrapper extends Component {
	shouldComponentUpdate(props) {
		return shallowDiffers(props, this.props);
	}
	render(props, state, context) {
		return this.renderChild(props, context);
	}
}

export function shouldComponentUpdate(props, state) {
	return shallowDiffers(props, this.props) || shallowDiffers(state, this.state);
}

function shallowDiffers(a, b) {
	for (let key in a) if (a[key] !== b[key]) return true;
	for (let key in b) if (!(key in a)) return true;
	return false;
}
