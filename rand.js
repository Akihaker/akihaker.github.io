let seednow;
let p = 17.17;
let pnow;

function srandom() {
	if (seed == 0) {
		return Math.random();
	}
	seednow = (seednow * pnow) % 1.0;
	pnow = (pnow * p) % 999.999;
	return seednow;
}

function MyRandomBool() {
	return (srandom() >= 0.5) ? true : false;
}

function MyRandom(max, zero = 0) {
	let sign = MyRandomBool() ? 1 : -1;
	let value = sign * Math.floor(srandom() * (max + 1));
	if (value == 0 && zero == 1) {
		value = 1 * sign;
	}
	return value;
}

function MyRandomN(max) {
	let value = Math.floor(srandom() * (max));
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

function MyRandomNnoseed(max) {
	let value = Math.floor(Math.random() * (max));
	return value + 1;
}
