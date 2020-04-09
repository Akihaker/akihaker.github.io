function MyRandomBool() {
	return (Math.random() >= 0.5) ? true : false;
}

function MyRandom(max, zero = 0) {
	let sign = MyRandomBool() ? 1 : -1;
	let value = sign * Math.floor(Math.random() * (max + 1));
	if (value == 0 && zero == 1) {
		value = 1 * sign;
	}
	return value;
}

function MyRandomN(max) {
	let value = Math.floor(Math.random() * (max));
	return value + 1;
}


function genSign() {
	let Sign;

	let m = MyRandomN(4);
	if (m == 1) {
		Sign = ` \\geq `;
	} else if (m == 2) {
		Sign = ` > `;
	} else if (m == 3) {
		Sign = ` \\leq `;
	} else if (m == 4) {
		Sign = ` < `;
	}
	// console.log(Sign);
	return [Sign, getLocalGap(Sign)];
}
