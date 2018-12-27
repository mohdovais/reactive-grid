const strings = 'lorem ipsum dolor sit amet consectetur adipiscing elit curabitur eu molestie ligula phasellus facilisis urna ac ornare posuere suspendisse ut orci quam in condimentum nec lacinia risus vehicula et etiam vel enim nisl quis nibh erat vestibulum ante primis faucibus luctus ultrices cubilia curae; sed ex magna nunc tellus velitin hac habitasse platea dictumst donec blandit hendrerit odio porttitor tempor cras pretium eros integer id tincidunt imperdiet proin at dapibus lectus purus gravida sapien eget ultricies eratmorbi a libero interdum pellentesque laoreet efficitur nisi semper lobortis pulvinar nulla aliquam turpis rutrum vitae quisque venenatis mattis velit tristique non varius mauris viverra leo scelerisque iaculisnulla facilisi diam fringilla cursus feugiat aenean vulputate metus ullamcorper fusce euismod iaculis nam tempus sollicitudin praesent fermentum dui augue sem arcu convallis urnadonec commodo consequat finibus justo sagittis vivamus egestas'.split(
	' '
);
const stringsLimit = strings.length - 1;
const randomString = function self(length) {
	const l = length === undefined ? 1 : length;
	const arr = [];
	for(let i=0; i<l; i++){
		arr.push(strings[Math.round(Math.random() * stringsLimit)])
	}
	return arr.join(' ');
};

export default function generate(_columns, _count) {
	const count = _count === undefined ? 1 + Math.round(Math.random() * 25) : _count;
	const columns = _columns === undefined ? 10 : _columns;
	const data = [];

	for (let i = 0; i < count; i++) {
        let row = {};
		for (var j = 1; j < columns; j++) {
            row['column' + j] = randomString(Math.round(Math.random() * 10))
		}
		
		row['column' + j] = Math.round(Math.random() * 1000);
		
        data.push(row);
	}
	return data;
}
