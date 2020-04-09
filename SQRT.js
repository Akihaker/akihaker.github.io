class SQRT {
	constructor(numerator, radical, denumerator) {
		this.numerator = numerator;

		this.sr = (radical < 0) ? -1 : 1;
		this.radical = Math.abs(radical);

		this.denumerator = denumerator;

		if (denumerator < 0) {
			this.denumerator *= -1;
			this.numerator *= -1;
			this.sr *= -1;
		}
		this.normolize();
	}


	normolize() {
		let r = this.radical;
		let c = 0;
		if (r != 0) {
			c = 1;
			for (let i = 2; i * i <= r; ++i) {
				while (r % (i * i) == 0) {
					c *= i;
					r /= (i * i);
				}
			}
		}

		if (r == 1) {
			this.numerator += this.sr * c;
			this.sr = 1;
			this.radical = 0;
			c = 0;
		}


		let a = Math.abs(this.numerator);
		let b = Math.abs(this.denumerator);

		function gcd(a, b) {
			while (b) {
				let c = a % b;
				a = b;
				b = c;
			}
			return a;
		}
		let d = gcd(c, gcd(a, b));


		this.numerator /= d;
		this.denumerator /= d;
		this.radical /= (d * d);

		// alert([this.numerator, this.radical, this.denumerator]);
	}

	toTeX() {
		if (this.numerator == 0 && this.radical == 0) {
			return `0`;
		}

		let sign = ``;

		let strnumerator = ``;
		if (this.numerator != 0) {
			strnumerator = `${this.numerator}`;
		}

		let strradical = ``;
		if (this.radical != 0) {
			strradical = (this.sr == -1) ? `-` 
				: (this.numerator != 0) ? `+` : ``;

			if (this.denumerator != 1 && this.numerator == 0 && this.sr < 0) {
				sign = `-`;
				strradical = ``;
			}

			let r = this.radical;
			let c = 1;
			for (let i = 2; i * i <= r; ++i) {
				while (r % (i * i) == 0) {
					c *= i;
					r /= (i * i);
				}
			}

			if (c == 1) {
				strradical += `\\sqrt{${this.radical}}`;
			} else {
				strradical += `${c}\\sqrt{${r}}`;
			}
		} else {
			if (this.numerator < 0 && this.denumerator != 1) {
				sign = `-`;
				strnumerator = `${Math.abs(this.numerator)}`;
			}
		}

		if (this.denumerator == 1) {
			return `${strnumerator}${strradical}`;
		} else {
			return `${sign}\\dfrac{${strnumerator}${strradical}}{${this.denumerator}}`;
		}
	}

	equals(b) {
		return ((this.numerator + this.sr * Math.sqrt(this.radical)) / this.denumerator == (b.numerator + b.sr * Math.sqrt(b.radical)) / b.denumerator);
	}

	less(b) {
		if ((this.numerator + this.sr * Math.sqrt(this.radical)) / this.denumerator < (b.numerator + b.sr * Math.sqrt(b.radical)) / b.denumerator) {
			return true;
		} else {
			return false;
		}
	}
}