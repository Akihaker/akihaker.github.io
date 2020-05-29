
function ConstrF(maze) {

	let arr = new Array();
	if (maze == 1) {
		arr.push(0);
		arr.push([0, 0, 1]);
		arr.push(1);
		arr.push(`\\dfrac{`);

		let zc1 = [0, MyRandom(3), MyRandom(6)];
		let zc2 = [0, MyRandom(3), MyRandom(6)];
		if (zc2[1] == 0) {
			zc2[2] = (MyRandomN(5) + 1) * (MyRandomBool() ? -1 : 1);
		}
		if (zc1[1] == 0) {
			zc1[2] = (MyRandomN(5) + 1) * (MyRandomBool() ? -1 : 1);
		}
		if (zc1[1] == 0 && zc2[1] == 0) {
			zc2[1] = 1;
		}

		arr.push(zc1);
		arr.push(`}{`);
		arr.push(zc2);
		arr.push(`}`);

		addzero(zc1);
		addzero(zc2, true);

	} else if (maze == 2) {
		arr.push(0);
		arr.push([0, 0, 1]);
		arr.push(1);
		arr.push(`\\dfrac{`);
		let k1 = MyRandomN(2);
		let k2 = (k1 == 1) ? 2 : MyRandomN(2);
		for (let i = 0; i < k1 + k2; ++i) {
			if (i == k1) {
				arr.push(`}{`);
			}
			let zc = (ConstrE(1, 1))[1];
			addzero(zc, (i >= k1));
			arr.push(zc);
			if (i != k1 - 1 && i != k1 + k2 - 1) {
				arr.push(1);
			}
		}
		arr.push(`}`);
	} else if (maze == 3) {
		arr.push(0);

		let z1 = [0, 0, (MyRandomBool()) ? 1 : -1];
		let z2 = [0, 0, (MyRandomBool()) ? 1 : -1];

		let zc1 = [0, MyRandom(3), MyRandom(6)];
		let zc2 = [0, Math.abs(MyRandom(3)), MyRandom(6)];
		if (zc2[1] == 0) {
			zc2[2] = Math.abs((MyRandomN(5) + 1) * (MyRandomBool() ? -1 : 1));
		}
		if (zc1[1] == 0) {
			zc1[2] = (MyRandomN(5) + 1) * (MyRandomBool() ? -1 : 1);
		}
		if (zc1[1] == 0 && zc2[1] == 0) {
			zc2[1] = 1;
		}

		

		arr.push(z1);
		arr.push(1);
		arr.push(`\\dfrac{`);
		arr.push(zc1);
		arr.push(`}{`);
		arr.push(zc2);
		arr.push(`}`);

		arr.push(0);
		
		let zc3;
		let zc4;
		if (zc1[1] != 0) {
			if (zc2[1] != 0) {
				zc4 = MyRandomBool() ? zc2.slice() : [0, 0, Math.abs(MyRandomN(5, 1))];
			} else {
				zc4 = [0, 0, Math.abs(MyRandomN(5, 1))];
			}
			
		} else {
			zc4 = [0, Math.abs(MyRandom(3)), MyRandom(6)];
			if (zc4[1] == 0) {
				zc4[2] = Math.abs(MyRandomN(5, 1));
			}
		}
		if (zc2[1] != 0 && !Comp2polynoms(zc4, zc2)) {
			zc3 = [0, 0, MyRandom(6, 1)];
		} else {
			zc3 = [0, MyRandom(3), MyRandom(6)];
			if (zc3[1] == 0) {
				zc3[2] = MyRandom(6, 1);
			}
		}

		if (zc3[1] == 0 && zc4[1] == 0) {
			let i = 2;
			while (i <= Math.abs(zc3[2]) && i <= Math.abs(zc4[2])) {
				if (zc3[2] % i == 0 && zc4[2] % i == 0) {
					zc3[2] /= i;
					zc4[2] /= i;
				} else {
					i += 1;
				}
			}
		}

		if (zc4[2] == -1 && zc4[1] == 0) {
			zc4 = Mult2polynoms(zc4, [0, 0, -1]);
			zc3 = Mult2polynoms(zc3, [0, 0, -1]);
		}
		if (zc4[2] == 1 && zc4[1] == 0) {
			arr.push(Mult2polynoms(z2, zc3));
		} else {
			arr.push(z2);
			arr.push(1);
			arr.push(`\\dfrac{`);
			arr.push(zc3);
			arr.push(`}{`);
			arr.push(zc4);
			arr.push(`}`);
		}

		let zc = Sum2polynoms(Mult2polynoms(z1, Mult2polynoms(zc1, zc4)), Mult2polynoms(z2, Mult2polynoms(zc3, zc2)));
		addzero(zc);
		zc = Mult2polynoms(zc2, zc4);
		addzero(zc, true);
	}

	arr.push(0);
	return arr;
}