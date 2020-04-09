

function addzero(polynom, division) {
	let a = polynom[0];
	let b = polynom[1];
	let c = polynom[2];

	if (a == 0 && b == 0) {
		if (c < 0) {
			signofmax *= -1;
		}
		return;
	}
	
	if (a == 0) {
		if (b < 0) {
			signofmax *= -1;
		}
		zeros.push(new SQRT(-c, 0, b));
		if (division == true) {
			dzeros.push(new SQRT(-c, 0, b));
		}
	} else {
		if (a < 0) {
			signofmax *= -1;
		}
		let D = b * b - 4 * a * c;
		if (D >= 0) {
			zeros.push(new SQRT(-b, -D, 2 * a));
			zeros.push(new SQRT(-b, D, 2 * a));
			if (division == true) {
				dzeros.push(new SQRT(-b, -D, 2 * a));
				dzeros.push(new SQRT(-b, D, 2 * a));
			}
		}
	}
}

function getLocalGap(Sign) {
	let s = (signofmax == 1) ? true : false;
	let localgap = new Array();

	// from larger to smaller
	zeros.sort(function(a,b) {
		if (a.equals(b)) {
			return 0;
		}
		if (a.less(b)) {
			return 1;
		} else {
			return -1;
		}
	});

	let arrayofzero = new Array();
	let j = 1;
	for (let i = 0; i < zeros.length; ++i) {
		if (i == zeros.length - 1) {
			arrayofzero.push([zeros[i], j]);
			continue;
		}
		if (zeros[i].equals(zeros[i + 1]) == false) {
			arrayofzero.push([zeros[i], j]);
			j = 0;
		}
		++j;
	}

	// from smaller to larger
	dzeros.sort(function(a,b) {
		if (a.equals(b)) {
			return 0;
		}
		if (a.less(b)) {
			return -1;
		} else {
			return 1;
		}
	});

	for (let i = 1; i < dzeros.length; ++i) {
		if (i == dzeros.length - 1) {
			continue;
		}
		if (dzeros[i].equals(dzeros[i - 1])) {
			dzeros[i] = dzeros[i + 1];
		}
	}

	while (dzeros.length > 1 && dzeros[dzeros.length - 1].equals(dzeros[dzeros.length - 2])) {
		dzeros.pop();
	}



	j = dzeros.length - 1;
	if (Sign == ` > `) {
		let p = [pinf, 0];
		// let p = "+∞)";
		for (let i = 0; i < arrayofzero.length; ++i) {
			if (arrayofzero[i][1] % 2 != 0) {
				if (s == true) {
					localgap.push([[arrayofzero[i][0], 0], p]);
					// localgap.push(`(${arrayofzero[i][0]}, ${p}`);
					s = false;
				} else {
					p = [arrayofzero[i][0], 0];
					// p = `${arrayofzero[i][0]})`;
					s = true;
				}
			} else if (s == true) {
				localgap.push([[arrayofzero[i][0], 0], p]);
				p = [arrayofzero[i][0], 0];
			}
		}
		if (s == true) {
			localgap.push([[minf, 0], p]);
			// localgap.push(`(-∞, ${p}`);
		}
	}

	if (Sign == ` \\geq `) {
		let p = [pinf, 0];
		for (let i = 0; i < arrayofzero.length; ++i) {
			if (arrayofzero[i][1] % 2 != 0) {
				if (s == true) {
					if (j >= 0 && dzeros[j].equals(arrayofzero[i][0])) {
						localgap.push([[arrayofzero[i][0], 0], p]);
						--j;
					} else {
						localgap.push([[arrayofzero[i][0], 1], p]);
					}
					s = false;
				} else {
					if (j >= 0 && dzeros[j].equals(arrayofzero[i][0])) {
						p = [arrayofzero[i][0], 0];
						--j;
					} else {
						p = [arrayofzero[i][0], 1];
					}
					s = true;
				}
			} else {
				if (s == false) {
					if (j >= 0 && dzeros[j].equals(arrayofzero[i][0])) {
						--j;
					} else {
						localgap.push([[arrayofzero[i][0], 1], [arrayofzero[i][0], 1]]);
					}
				} else if (j >= 0 && dzeros[j].equals(arrayofzero[i][0])) {
					localgap.push([[arrayofzero[i][0], 0], p]);
					p = [arrayofzero[i][0], 0];
					--j;
				}
			}
		}
		if (s == true) {
			localgap.push([[minf, 0], p]);
		}
	}

	if (Sign == ` < `) {
		let p = [pinf, 0];
		for (let i = 0; i < arrayofzero.length; ++i) {
			if (arrayofzero[i][1] % 2 != 0) {
				if (s == false) {
					localgap.push([[arrayofzero[i][0], 0], p]);
					s = true;
				} else {
					p = [arrayofzero[i][0], 0];
					s = false;
				}
			} else if (s == false) {
				localgap.push([[arrayofzero[i][0], 0], p]);
				p = [arrayofzero[i][0], 0];
			}
		}
		if (s == false) {
			localgap.push([[minf, 0], p]);
		}
	}

	if (Sign == ` \\leq `) {
		let p = [pinf, 0];
		for (let i = 0; i < arrayofzero.length; ++i) {
			if (arrayofzero[i][1] % 2 != 0) {
				if (s == false) {
					if (j >= 0 && dzeros[j].equals(arrayofzero[i][0])) {
						localgap.push([[arrayofzero[i][0], 0], p]);
						--j;
					} else {
						localgap.push([[arrayofzero[i][0], 1], p]);
					}
					s = true;
				} else {
					if (j >= 0 && dzeros[j].equals(arrayofzero[i][0])) {
						p = [arrayofzero[i][0], 0];
						--j;
					} else {
						p = [arrayofzero[i][0], 1];
					}
					s = false;
				}
			} else {
				if (s == true) {
					if (j >= 0 && dzeros[j].equals(arrayofzero[i][0])) {
						--j;
					} else {
						localgap.push([[arrayofzero[i][0], 1], [arrayofzero[i][0], 1]]);
					}
				} else if (j >= 0 && dzeros[j].equals(arrayofzero[i][0])) {
					localgap.push([[arrayofzero[i][0], 0], p]);
					p = [arrayofzero[i][0], 0];
					--j;
				}
			}
		}
		if (s == false) {
			localgap.push([[minf, 0], p]);
		}
	}
	localgap.reverse();
	// from smaller to larger

	// do not forgert to nullify
	zeros = [];
	dzeros = [];
	signofmax = 1;

	// crossingGaps(localgap);
	return localgap;
}


function crossingGaps(localgap, totalgap) {
	let rewrite = new Array;

	for (let i = 0; i < totalgap.length; ++i) {
		for (let j = 0; j < localgap.length; ++j) {
			let a1 = totalgap[i][0];
			let a2 = totalgap[i][1];
			let b1 = localgap[j][0];
			let b2 = localgap[j][1];

			if (b2[0].less(a1[0])) 
				continue;
			if (a2[0].less(b1[0]))
				continue;


			let lhs;
			let rhs;

			if (a1[0].equals(b1[0])) {
				lhs = [a1[0], Math.min(a1[1], b1[1])];
			} else {
				if (a1[0].less(b1[0])) {
					lhs = b1;
				} else {
					lhs = a1;
				}
			}

			if (a2[0].equals(b2[0])) {
				rhs = [a2[0], Math.min(a2[1], b2[1])];
			} else {
				if (a2[0].less(b2[0])) {
					rhs = a2;
				} else {
					rhs = b2;
				}
			}
			if (lhs[0].equals(rhs[0]) && (lhs[1] == 0 || rhs[1] == 0))
				continue;

			rewrite.push([lhs, rhs]);
		}
	}

	return rewrite;
}

function unionGaps(localgap, totalgap) {
	let rewrite = new Array;

	for (let i = 0; i < totalgap.length; ++i) {
		rewrite.push(totalgap[i]);
	}
	for (let i = 0; i < localgap.length; ++i) {
		rewrite.push(localgap[i]);
	}

	rewrite.sort(function(a,b) {
		if (a[0][0].equals(b[0][0])) {
			if (a[0][1] == 1) {
				return -1;
			} else if (b[0][1] == 1) {
				return 1;
			}
			return 0;
		}
		if (a[0][0].less(b[0][0])) {
			return -1;
		} else {
			return 1;
		}
	});

	for (let i = 1; i < rewrite.length; ++i) {
		let a = rewrite[i];
		let b = rewrite[i - 1];
		if ((a[0][0].less(b[1][0])) || ((b[1][1] == 1 || a[0][1] == 1) && b[1][0].equals(a[0][0]))) {
			rewrite.splice(i, 1);

			if (b[1][0].less(a[1][0]) || (a[1][1] == 1 && a[1][0].equals(b[1][0]))) {
				rewrite[i - 1][1] = a[1];
			}
			
			i -= 1;
		}
	}

	return rewrite;
}