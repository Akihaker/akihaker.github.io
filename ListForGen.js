
function checkBox() {
	let maze = parseInt(document.getElementById("maze").value);
	seed = parseInt(document.getElementById("seed").value) || document.getElementById("seed").placeholder;

	seednow = seed;
	pnow = p;

	let v1 = (document.getElementById("polynom1").className == "choise2");
	let v2 = (document.getElementById("polynom2").className == "choise2");
	let g = (document.getElementById("gaps").className == "choise2");
	let f = (document.getElementById("fraction").className == "choise2");
	let s1 = (document.getElementById("system1").className == "choise2");
	let s2 = (document.getElementById("system2").className == "choise2");

	if (!v1 && !v2 && !g && !f && !s1 && !s2) {
		alert("Выберите какую-нибудь тему")
		return;
	}

	document.getElementById("rightwindow").innerHTML = ``;
	CopyLatex = [];
	ShowAns = [];


	for (let question = 0; question < 20; ++question) {

		let ans = ``;
		let finalstr = ``;

		let arr;
		
		if (v1 || v2) {
			let degree = 1;
			if (v2) {
				degree = 2;
			}
			let zc = ConstrE(degree, maze);
			arr = zc[0];
			addzero(zc[1]);

		} else if (g) {
			arr = ConstrG(maze);
		} else if (f) {
			arr = ConstrF(maze);
		} else if (s1 || s2) {
			zc1 = ConstrE(1, maze);
			addzero(zc1[1]);
			let zs1 = genSign();
			let localgap1 = zs1[1];

			zc2 = ConstrE(1, maze);
			addzero(zc2[1]);
			let zs2 = genSign();
			let localgap2 = zs2[1];

			let totalgap;
			if (s1) {
				totalgap = crossingGaps(localgap1, localgap2);
			} else if (s2) {
				totalgap = unionGaps(localgap1, localgap2);
			}
			ans = getAnswer(totalgap);

			if (s1) {
				finalstr = `\\left\\{\\begin{array}{l}`;
			} else if (s2) {
				finalstr = `\\left[\\begin{array}{l}`;
			}
			
			finalstr += ArrSignStr(zs1[0], zc1[0]);
			finalstr += `\\\\`;
			finalstr += ArrSignStr(zs2[0], zc2[0]);
			finalstr += `\\end{array}\\right.`;
		}

		if (!s1 && !s2) {
			let zs = genSign();
			let localgap = zs[1];
			ans = getAnswer(localgap);
			finalstr = ArrSignStr(zs[0], arr);
		}

		if (question == 0) {
			document.getElementById("rightwindow").innerHTML += `
			<div class="Buttons" style="position: relative; text-align: right; user-select: none;">
				<div class="LaTeX" id="AllAns">[показать Все Ответы]</div>
				<div class="LaTeX" id="print">[pdf/печать]</div>
			</div>
			`;
		}
		
		
		document.getElementById("rightwindow").innerHTML += `

		<div class="Buttons" style="position: absolute; right: 0; user-select: none;">
			<div class="LaTeX" id="LaTeXButton${question}">[LaTeX]</div>
			<div class="LaTeX" id="AnsButton${question}">[показать Ответ]</div>
		</div>
		<div id="generated${question}" style="margin-bottom: 5px"></div>
		
		<div id="answer${question}" style="margin-bottom: 5px; display: none; text-align: right;"></div>
		<hr>`;
		
		ans = `\\text{Ответ}: x \\in ` + ans;

		let finalstr2 = `(${question+1}) \\:\\:\\:` + finalstr;
		katex.render(finalstr2, document.getElementById(`generated${question}`));
		katex.render(ans, document.getElementById(`answer${question}`));


		CopyLatex.push(finalstr);
		ShowAns.push(ans);
	}
	Copy_LATEX();
}


document.getElementById("generate").addEventListener("click", checkBox, false);


function nulifycolor() {
	document.getElementById("polynom1").className = "choise";
	document.getElementById("polynom2").className = "choise";
	document.getElementById("gaps").className = "choise";
	document.getElementById("fraction").className = "choise";
	document.getElementById("system1").className = "choise";
	document.getElementById("system2").className = "choise";

}

document.getElementById("polynom1").addEventListener("click", function () {
	nulifycolor();
	document.getElementById("polynom1").className = "choise2";
}, false);

document.getElementById("polynom2").addEventListener("click", function () {
	nulifycolor();
	document.getElementById("polynom2").className = "choise2";
}, false);

document.getElementById("gaps").addEventListener("click", function () {
	nulifycolor();
	document.getElementById("gaps").className = "choise2";
}, false);

document.getElementById("fraction").addEventListener("click", function () {
	nulifycolor();
	document.getElementById("fraction").className = "choise2";
}, false);

document.getElementById("system1").addEventListener("click", function () {
	nulifycolor();
	document.getElementById("system1").className = "choise2";
}, false);

document.getElementById("system2").addEventListener("click", function () {
	nulifycolor();
	document.getElementById("system2").className = "choise2";
}, false);
