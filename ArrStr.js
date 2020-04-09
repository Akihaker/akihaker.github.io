function ArrStr(arr) {
	let str = ``;
	let bglobal = false;
	for (let i = 0; i < arr.length; ++i) {
		if (arr[i] == 0 || arr[i] == 1) {
			continue;
		}
		if (arr[i] == `\\dfrac{` || arr[i] == `}{` || arr[i] == `}`) {
			str += arr[i];
			continue;
		}

		let k = 0;
		let st = 1;
		if (arr[i + 1] == 1 || arr[i - 1] == 1) {
			for (let j = 0; j < arr[i].length; ++j) {
				if (arr[i][j] != 0) {
					++k;
				}
			}
			let i2 = i;
			while (arr[i2 - 1] == 1) {
				i2 -= 2;
				let arrseq = true;
				for (let j = 0; j < arr[i2].length; ++j) {
					if (arr[i2][j] != arr[i][j]) {
						arrseq = false;
					}
				}
				if (arrseq) {
					st = 0;
				}
			}
			i2 = i;
			while (arr[i2 + 1] == 1) {
				i2 += 2;
				let arrseq = true;
				for (let j = 0; j < arr[i2].length; ++j) {
					if (arr[i2][j] != arr[i][j]) {
						arrseq = false;
					}
				}
				if (arrseq && st != 0) {
					st += 1;
				}
			}
		}


		if (k == 1) {
			if (arr[i][2] == -1) {
				str += `-`;
				continue;
			} else if (arr[i][2] == 1) {
				if (bglobal && arr[i + 1] == 1 && (arr[i + 2] == `\\dfrac{` || arr[i + 3] == 1)) {
					str += `+`;
				}
				if(arr[i + 1] == 1) {
					arr[i + 1] = 0;
				}
				continue;
			}
		}

		if (st == 0) {
			continue;
		}

		if (k > 1) {
			str += `(`;
		}

		let bbracket = false;
		for (let j = 0; j < 3; ++j) {
			if (arr[i][j] == 0) {
				continue;
			}

			if (arr[i][j] > 0 && (bbracket || 
				(bglobal && arr[i-1] != 1 && arr[i-1] != `\\dfrac{` && arr[i-1] != `}{`))) {
				str += `+`;
			}

			if (arr[i][j] == 1) {
				if (j == 2) {
					str += `1`;
				}
			} else if (arr[i][j] == -1) {
				str += `-`;
				if (j == 2) {
					str += `1`;
				}
			} else {
				str += `${arr[i][j]}`;
			}

			if (j == 1) {
				str += `x`;
			} else if (j == 0) {
				str += `x^2`;
			}

			bbracket = true;
		}

		if (k > 1) {
			str += `)`;
		}

		if (st > 1) {
			str += `^${st}`;
		}

		bglobal = true;
	}
	return str;
}


function ArrSignStr(Sign, arr) {
	let str = ``;

	let m1 = new Array();
	let m2 = new Array();
	let k = 1;
	for (let i = 1; i < arr.length; ++i) {
		if (arr[i] == 0) {
			if (MyRandomBool()) {
				m1.push(arr.slice(k, i));
			} else {
				for (let j = 0; j < arr[k].length; ++j) {
					arr[k][j] *= -1;
				}
				m2.push(arr.slice(k, i));
			}
			k = i + 1;
		}
	}

	//--

	//--

	let arr1 = new Array();
	let arr2 = new Array();
	arr1.push(0);
	arr2.push(0);
	for (let i = 0; i < m1.length; ++i) {
		for (let j = 0; j < m1[i].length; ++j) {
			arr1.push(m1[i][j]);
		}
		arr1.push(0);
	}
	for (let i = 0; i < m2.length; ++i) {
		for (let j = 0; j < m2[i].length; ++j) {
			arr2.push(m2[i][j]);
		}
		arr2.push(0);
	}

	if (arr1.length == 1) {
		arr1 = arr2.slice();
		arr2 = [0];
		k = false;
		for (let i = 0; i < arr1.length; ++i) {
			if (arr1[i] == 0) {
				k = true;
				continue;
			}
			if (arr1[i] == `\\dfrac{`) {
				continue;
			}
			if (k) {
				for (let j = 0; j < arr1[i].length; ++j) {
					arr1[i][j] *= -1;
				}
				k = false;
			}
		}
	}

	str += ArrStr(arr1) + Sign + ArrStr(arr2);

	if (arr2.length == 1) {
		str += `0`;
	}

	return str;
}



function getAnswer(totalgap) {

	let ans = ``;

	if (totalgap.length == 0) {
		ans += `\\varnothing`;
	}

	for (let i = 0; i < totalgap.length; ++i) {
		let a1 = totalgap[i][0];
		let a2 = totalgap[i][1];

		if (a1[0].equals(a2[0])) {
			ans += `\\{${a1[0].toTeX()}\\}`;
			if (i != totalgap.length - 1) {
				ans += ` \\cup `;
			}
			continue;
		}

		if (a1[1] == 0) {
			ans += `(`;
		} else {
			ans += `[`;
		}

		if (a1[0].equals(minf)) {
			ans += `-\\infty, `;
		} else {
			ans += `${a1[0].toTeX()}, `;
		}

		if (a2[0].equals(pinf)) {
			ans += `+\\infty`;
		} else {
			ans += `${a2[0].toTeX()}`;
		}


		if (a2[1] == 0) {
			ans += `)`;
		} else {
			ans += `]`;
		}

		if (i != totalgap.length - 1) {
			ans += ` \\cup `;
		}
	}

	return ans;
}