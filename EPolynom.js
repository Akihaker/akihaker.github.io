function Mult2polynoms(a, b) {
	let ab = new Array();
	ab = [0, 0, 0];
	ab[0] = a[0] * b[2] + a[1] * b[1] + a[2] * b[0];
	ab[1] = a[1] * b[2] + a[2] * b[1];
	ab[2] = a[2] * b[2];
	return ab;
}

function Sum2polynoms(a, b) {
	let ab = new Array();
	ab[0] = a[0] + b[0];
	ab[1] = a[1] + b[1];
	ab[2] = a[2] + b[2];
	return ab;
}

function Comp2polynoms(a, b) {
	if (a[0] == b[0] && a[1] == b[1] && a[2] == b[2]) {
		return true;
	}
	return false;
}

function ATpolynom(a, b) {
	a[0] += b[0];
	a[1] += b[1];
	a[2] += b[2];
}


function ConstrE(degree, maze) {

	let arr = new Array();
	let finalp = new Array();
	finalp = [0, 0, 0];

	if (degree == 1) {
		if (maze == 1) {
			arr.push(0);
			let b = MyRandom(3, 1);
			let c = MyRandom(5, 1);
			let p = [0, b, c];
			arr.push(p);
			ATpolynom(finalp, p);
		} else if (maze == 2) {
			arr.push(0);
			let d = [0, 0, MyRandom(3, 1)];

			arr.push(d);
			arr.push(1);

			let b1 = MyRandom(2, 1);
			b1 = (b1 > 0) ? b1 : -b1;
			let c1 = MyRandom(3, 1);
			let p1 = [0, b1, c1];

			arr.push(p1);
			ATpolynom(finalp, Mult2polynoms(d, p1));

			let b2 = MyRandom(3, 0);
			let c2 = MyRandom(5, 0);
			let p2 = [0, b2, c2];
			if (b2 != 0) {
				arr.push(0);
				arr.push([0, b2, 0]);
			}
			if (c2 != 0) {
				arr.push(0);
				arr.push([0, 0, c2]);
			}
			ATpolynom(finalp, p2);

		} else if (maze == 3) {
			arr.push(0);
			let p1 = new Array();
			let d = [0, 0, 1];

			m = MyRandomN(2);
			if (m == 1) {
				d = [0, 0, MyRandom(2, 1)];

				arr.push(d);
				arr.push(1);
		
				let b1 = MyRandom(1, 1);
				let c1 = MyRandom(2, 1);
				p1 = [0, b1, c1];
				arr.push(p1);
			} else if (m == 2) {
				let b1 = MyRandom(3, 1);
				p1 = [0, b1, 0];
				arr.push(p1);
			}

			arr.push(1);

			let b2 = MyRandom(1, 1);
			let c2 = MyRandom(2, 1);
			let p2 = [0, b2, c2];
			arr.push(p2);

			ATpolynom(finalp, Mult2polynoms(d, Mult2polynoms(p1, p2)));

			let p = [-finalp[0], 0, 0];
			arr.push(0);
			arr.push(p);
			ATpolynom(finalp, p);
		}
	}


	if (degree == 2) {
		if (maze == 1) {
			arr.push(0);
			let D = MyRandomN(7) - 1;
			D *= D;
			let bc = new Array();
			for (let i = 0; i <= 10; ++i) {
				let b2 = D + i * 4;
				if (b2 <= 169 && b2 >= 0) {
					let b = Math.floor(Math.sqrt(b2));
					if (b * b == b2) {
						bc.push([1, b, i]);
					}
				}
				b2 = D - i * 4;
				if (b2 <= 169 && b2 >= 0) {
					let b = Math.floor(Math.sqrt(b2));
					if (b * b == b2) {
						bc.push([1, b, -i]);
					}
				}
			}
			if (bc.length == 0) {
				return ConstrE(degree, maze);
			}
			let i = MyRandomN(bc.length) - 1;
			let a = bc[i][0];
			let b = bc[i][1];
			let c = bc[i][2];

			if (a == 0 || b == 0 || c == 0) {
				return ConstrE(degree, maze);
			}
			arr.push([a, 0, 0]);
			if (b != 0) {
				arr.push(0);
				arr.push([0, b, 0]);
			}
			if (c != 0) {
				arr.push(0);
				arr.push([0, 0, c]);
			}
			ATpolynom(finalp, bc[i]);
			
		} else if (maze == 2) {
			arr.push(0);

			let a = MyRandom(3, 1);
			a = (a * a == 1) ? 2 * a : a;

			let D = MyRandomN(14) - 1;
			D *= D;
			let bc = new Array();
			for (let i = 1; i <= 12; ++i) {
				let b2 = D + i * 4 * a;
				if (b2 <= 169 && b2 > 0) {
					let b = Math.floor(Math.sqrt(b2));
					if (b * b == b2) {
						bc.push([a, b, i]);
					}
				}
				b2 = D - i * 4 * a;
				if (b2 <= 169 && b2 > 0) {
					let b = Math.floor(Math.sqrt(b2));
					if (b * b == b2) {
						bc.push([a, b, -i]);
					}
				}
			}
			if (bc.length == 0) {
				return ConstrE(degree, maze);
			}
			let i = MyRandomN(bc.length) - 1;
			a = bc[i][0];
			let b = bc[i][1];
			let c = bc[i][2];
			arr.push([a, 0, 0]);
			if (b != 0) {
				arr.push(0);
				arr.push([0, b, 0]);
			}
			if (c != 0) {
				arr.push(0);
				arr.push([0, 0, c]);
			}
			ATpolynom(finalp, bc[i]);

		} else if (maze == 3) {
			arr.push(0);
			let a = MyRandom(2, 1);
			let b = MyRandom(6, 1);
			let c = MyRandom(9, 1);
			let D = b * b - 4 * a * c;
			if (D < 0 || Math.floor(Math.sqrt(D)) * Math.floor(Math.sqrt(D)) == D) {
				return ConstrE(degree, maze);
			}
			let p = [a, b, c];
			arr.push([a, 0, 0]);
			arr.push(0);
			arr.push([0, b, 0]);
			arr.push(0);
			arr.push([0, 0, c]);
			ATpolynom(finalp, p);
		}
	}
	arr.push(0);


	// reconstructor 
	if (finalp[2 - degree] == 0) {
		return ConstrE(degree, maze);
	}

	if ((degree == 1 && finalp[2] == 0) || (degree == 2 && (finalp[2] == 0 && finalp[1] == 0))) {
		return ConstrE(degree, maze);
	}

	if (degree == 2 && finalp[1] * finalp[1] - 4 * finalp[0] * finalp[2] < 0) {
		return ConstrE(degree, maze);
	}
	//-----

	return [arr, finalp];

}