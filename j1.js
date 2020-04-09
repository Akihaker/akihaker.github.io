let pinf = new SQRT(10001, 0, 2);
let minf = new SQRT(-10001, 0, 2);

let zeros = new Array();
let dzeros = new Array();
let signofmax = 1;

let CopyLatex = new Array();
let ShowAns = new Array();




document.getElementById("decrease").addEventListener("click", function () {
	let t = parseInt(document.getElementById("maze").value);
	if (t > 1) t -= 1;
	document.getElementById("maze").value = t;
}, false);
document.getElementById("increase").addEventListener("click", function () {
	let t = parseInt(document.getElementById("maze").value);
	if (t < 3) t += 1;
	document.getElementById("maze").value = t;
}, false);


function Copy_LATEX() {
	for (let i = 0; i < 20; ++i) {
		let t = `LaTeXButton${i}`;
		document.getElementById(t).addEventListener("click", function () {
			navigator.clipboard.writeText(`${CopyLatex[i]}`)
				.then(() => {})
			  	.catch(err => {console.log('Something went wrong', err);});
		}, false);
	}

	for (let i = 0; i < 20; ++i) {
		let t = `AnsButton${i}`;
		document.getElementById(t).addEventListener("click", function () {
			let textinbrackets = document.getElementById(t).innerHTML;
			let t2 = `answer${i}`;
			document.getElementById(t2).style.display = (textinbrackets == `[показать Ответ]`) ? `block` : `none`;
			document.getElementById(t).innerHTML = (textinbrackets == `[показать Ответ]`) ? `[скрыть Ответ]` : `[показать Ответ]`;
		}, false);
	}
	
	document.getElementById("AllAns").addEventListener("click", SHALLAnswers, false);
}

function SHALLAnswers() {
	let textinbrackets = document.getElementById("AllAns").innerHTML;
	for (let i = 0; i < 20; ++i) {
		let t = `AnsButton${i}`;
		let t2 = `answer${i}`;
		document.getElementById(t2).style.display = (textinbrackets == `[показать Все Ответы]`) ? `block` : `none`;
		document.getElementById(t).innerHTML = (textinbrackets == `[показать Все Ответы]`) ? `[скрыть Ответ]` : `[показать Ответ]`;
	}
	document.getElementById("AllAns").innerHTML = (textinbrackets == `[показать Все Ответы]`) ? `[скрыть Все Ответы]` : `[показать Все Ответы]`;
}

