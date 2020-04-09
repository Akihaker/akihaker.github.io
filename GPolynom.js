function ConstrG(maze) {
	let arr = new Array();

	if (maze == 1) {
		let m = MyRandomN(2);
		if (m == 1) {
			arr.push(0);
			let a = MyRandom(10, 1);
			let b = MyRandom(10, 1);
			arr.push([a, 0, 0]);
			arr.push(0);
			arr.push([0, b, 0]);
			addzero([a, b, 0]);
		} else if (m == 2) {
			arr.push(0);
			arr.push([0, 0, 1]);
			arr.push(1);
			for (let k = 0; k < 2; ++k) {
				let zc = ConstrE(1, 1);
				arr.push(zc[1]);
				arr.push(1);
				addzero(zc[1]);
			}
			arr.pop();
		}
	} else if (maze == 2) {
		let m = MyRandomN(5);
		if (m <= 3) {
			arr.push(0);
			let a = MyRandomN(4);
			let c = MyRandomN(4);
			let b = 2 * a * c;
			a *= a;
			c *= c;
			b = (MyRandomBool()) ? b : -b;

			if (MyRandomN(4) == 4) {
				a *= -1;
				b *= -1;
				c *= -1;
			}
			let zc = [a, b, c];
			arr.push([a, 0, 0]);
			arr.push(0);
			arr.push([0, b, 0]);
			arr.push(0);
			arr.push([0, 0, c]);
			addzero(zc);
		} else if (m <= 5) {
			arr.push(0);
			let a = MyRandom(4, 1);
			a *= a;
			let c = MyRandom(5, 1);
			c *= c;
			let zc = [a, 0, -c];
			arr.push([a, 0, 0]);
			arr.push(0);
			arr.push([0, 0, -c]);
			addzero(zc);
		}
	} else if (maze == 3) {
		let m = MyRandomN(2);
		if (m == 1) {
			arr.push(0);
			let zc1 = (ConstrE(1, 1))[1];
			let zc2 = (ConstrE(1, 1))[1];
			let zc3 = zc1.slice();
			let d = [0, 0, MyRandom(3, 1)];
			let dzc2 = zc2.slice();

			arr.push([0, 0, 1]);
			arr.push(1);
			arr.push(zc1);
			arr.push(1);
			arr.push(zc2);
			arr.push(0);
			arr.push(d);
			arr.push(1);
			arr.push(zc3);

			ATpolynom(dzc2, d);
			addzero(zc1);
			addzero(dzc2);

		} else if (m == 2) {
			arr.push(0);
			arr.push([0, 0, 1]);
			arr.push(1);

			let zc1 = (ConstrE(1, 1))[1];
			let zc2 = (ConstrE(1, 1))[1];
			let zc3 = (ConstrE(1, 1))[1];
			if (MyRandomBool()) {
				zc3 = MyRandomBool() ? zc1 : zc2;
			}
			arr.push(zc1);
			arr.push(1);
			arr.push(zc2);
			arr.push(1);
			arr.push(zc3);
			addzero(zc1);
			addzero(zc2);
			addzero(zc3);
		}
	}

	arr.push(0);
	return arr;
}
