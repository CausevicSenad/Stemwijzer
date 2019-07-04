const bigPartyDef = 4;

var subjectIndex = 0;
var choices = new Array(subjects.length);
var maxPoints = subjects.length;

for (i = 0; i < subjects.length; i++) {
	choices[i] = 0;
}

btnSkip.onclick = function() {nextFunc(0)}
btnEens.onclick = function() {nextFunc(1)}
btnGeenmening.onclick = function() {nextFunc(2)}
btnOneens.onclick = function() {nextFunc(3)}

btnStart.onclick = function() {
	btnBack.classList.remove("displayNone");
	btnBack.classList.add("displayBlock");
	mainHeader.classList.remove("displayBlock");
	mainHeader.classList.add("displayNone");
	btnStart.classList.remove("displayInlineBlock");
	btnStart.classList.add("displayNone");
	btnEens.classList.remove("displayNone");
	btnEens.classList.add("displayInlineBlock");
	btnGeenmening.classList.remove("displayNone");
	btnGeenmening.classList.add("displayInlineBlock");
	btnOneens.classList.remove("displayNone");
	btnOneens.classList.add("displayInlineBlock");
	btnSkip.classList.remove("displayNone");
	btnSkip.classList.add("displayInlineBlock");
	titleHeader.innerHTML = subjects[0].title;
	statementText.innerHTML = subjects[0].statement;
	subjectIndex = 0;
	setBtnClr(subjectIndex);
}

btnBack.onclick = function() {
	if (subjectIndex === 0) {
		btnBack.classList.remove("displayBlock");
		btnBack.classList.add("displayNone");
		mainHeader.classList.remove("displayNone");
		mainHeader.classList.add("displayBlock");
		titleHeader.innerHTML = 'Test uw politieke voorkeur';
		statementText.innerHTML = '';
		btnStart.classList.remove("displayNone");
		btnStart.classList.add("displayInlineBlock");
		btnEens.classList.remove("displayInlineBlock");
		btnEens.classList.add("displayNone");
		btnGeenmening.classList.remove("displayInlineBlock");
		btnGeenmening.classList.add("displayNone");
		btnOneens.classList.remove("displayInlineBlock");
		btnOneens.classList.add("displayNone");
		btnSkip.classList.remove("displayInlineBlock");
		btnSkip.classList.add("displayNone");
	} else {
		subjectIndex--;
		titleHeader.innerHTML = subjects[subjectIndex].title;
		statementText.innerHTML = subjects[subjectIndex].statement;
		setBtnClr(subjectIndex);
	}
}

function nextFunc(choice) {
	choices[subjectIndex] = choice;
	subjectIndex++;
	if (subjectIndex === 7) {
		var aSA = allSubjectsAnswered()
		if (aSA == -1) {
			titleHeader.innerHTML = 'Zijn er onderwerpen die u extra belangrijk vindt?';
			statementText.innerHTML = '';
			btnSkip.classList.remove("displayInlineBlock");
			btnSkip.classList.add("displayNone");
			btnBack.classList.remove("displayBlock");
			btnBack.classList.add("displayNone");
			for (i = 0; i < subjects.length; i++) {
				var chkBox = document.createElement("input");
				chkBox.type = "checkbox";
				chkBox.classList.add("importantSubjects");
				statementText.appendChild(chkBox);
				statementText.innerHTML += ' ' + subjects[i].title;
				var br = document.createElement("br");
				statementText.appendChild(br);
			}
			statementText.classList.add("statementList");
			buttonBox.innerHTML = '';
			var btnContinue = document.createElement("button");
			btnContinue.id = "btnContinueIS";
			btnContinue.classList.add("w3-button");
			btnContinue.classList.add("w3-black");
			var btnT = document.createTextNode("Ga verder");
			btnContinue.appendChild(btnT);
			buttonBox.appendChild(btnContinue);
			btnContinueIS.onclick = function() {getPartiesList()};
		} else {
			alert("U heeft nog niet alle stellingen beantwoord");
			titleHeader.innerHTML = subjects[aSA].title;
			statementText.innerHTML = subjects[aSA].statement;
			subjectIndex = aSA;
			setBtnClr(subjectIndex);
		}
	} else {
		titleHeader.innerHTML = subjects[subjectIndex].title;
		statementText.innerHTML = subjects[subjectIndex].statement;
		setBtnClr(subjectIndex);
	}
}

function setBtnClr(index) {
	btnEens.classList.remove("w3-dark-grey");
	btnEens.classList.add("w3-black");
	btnGeenmening.classList.remove("w3-dark-grey");
	btnGeenmening.classList.add("w3-black");
	btnOneens.classList.remove("w3-dark-grey");
	btnOneens.classList.add("w3-black");

	switch (choices[index]) {
		case 1:
			btnEens.classList.remove("w3-black");
			btnEens.classList.add("w3-dark-grey");
			break;
		case 2:
			btnGeenmening.classList.remove("w3-black");
			btnGeenmening.classList.add("w3-dark-grey");
			break;
		case 3:
			btnOneens.classList.remove("w3-black");
			btnOneens.classList.add("w3-dark-grey");
			break;
	}
}

function allSubjectsAnswered() {
	for (i = 0; i < choices.length; i++) {
		if (choices[i] == 0) {
			return i;
		}
	}
	return -1;
}

function calculatePoints() {
	for (i = 0; i < choices.length; i++) {
		for (j = 0; j < subjects[i].parties.length; j++) {
			var partyPosition = subjects[i].parties[j].position;
			var importantSubject = document.getElementsByClassName('importantSubjects')[i];
			var partyName = subjects[i].parties[j].name;

			if (choices[i] === 1 && partyPosition == "pro") {
				if (importantSubject.checked) {
					addPoints(partyName, 2);
				} else {
					addPoints(partyName, 1);
				}
			} else if (choices[i] === 2 && partyPosition == "ambivalent") {
				if (importantSubject.checked) {
					addPoints(partyName, 2);
				} else {
					addPoints(partyName, 1);
				}
			} else if (choices[i] === 3 && partyPosition == "contra") {
				if (importantSubject.checked) {
					addPoints(partyName, 2);
				} else {
					addPoints(partyName, 1);
				}
			}
		}
	}
}

function addPoints(party, points) {
	for (k = 0; k < parties.length; k++) {
		if (parties[k].name == party) {
			parties[k].points += points;
			break;
		}
	}
}

function getPartiesList() {
	calculatePoints();
	for (i = 0; i < document.getElementsByClassName('importantSubjects').length; i++) {
		if (document.getElementsByClassName('importantSubjects')[i].checked) {
			maxPoints++;
		}
	}
	titleHeader.innerHTML = 'Welke partijen wilt u meenemen in het resultaat?';
	statementText.innerHTML = '';
	parties.forEach(function(party) {
		var chkBox = document.createElement('input');
		chkBox.type = "checkbox";
		chkBox.classList.add("partijen");
		statementText.appendChild(chkBox);
		statementText.innerHTML += ' ' + party.name;
		var br = document.createElement('br');
		statementText.appendChild(br);
	});
	statementText.classList.remove("statementList");
	statementText.classList.add("partyList");
	buttonBox.innerHTML = '';

	var btnGP = document.createElement('button');
	btnGP.id = "btnGrotePartijen";
	btnGP.classList.add("w3-button");
	btnGP.classList.add("w3-black");
	btnGP.classList.add("w3-margin-right");
	var btnGPt = document.createTextNode("Selecteer grote partijen");
	btnGP.appendChild(btnGPt);
	buttonBox.appendChild(btnGP);

	var btnSP = document.createElement('button');
	btnSP.id = "btnSecularPartijen";
	btnSP.classList.add("w3-button");
	btnSP.classList.add("w3-black");
	btnSP.classList.add("w3-margin-right");
	var btnSPt = document.createTextNode("Selecteer seculiere partijen");
	btnSP.appendChild(btnSPt);
	buttonBox.appendChild(btnSP);

	var btnAP = document.createElement('button');
	btnAP.id = "btnAllePartijen";
	btnAP.classList.add("w3-button");
	btnAP.classList.add("w3-black");
	var btnAPt = document.createTextNode("Selecteer alle partijen");
	btnAP.appendChild(btnAPt);
	buttonBox.appendChild(btnAP);

	var btnC = document.createElement('button');
	btnC.id = "btnContinueP";
	btnC.classList.add("w3-button");
	btnC.classList.add("w3-black");
	btnC.classList.add("w3-margin-left");
	var btnCt = document.createTextNode("Naar resultaat");
	btnC.appendChild(btnCt);
	buttonBox.appendChild(btnC);

	btnGrotePartijen.onclick = function() {selectGroup(1)};
	btnSecularPartijen.onclick = function() {selectGroup(2)};
	btnAllePartijen.onclick = function() {selectGroup(3)};
	btnContinueP.onclick = function() {getResult()};
}

function selectGroup(group) {
	var partyClasses = document.getElementsByClassName('partijen');
	switch(group) {
		case 1:
			for (i = 0; i < parties.length; i++) {
				partyClasses[i].checked = false;
				if (parties[i].size >= bigPartyDef) {
					partyClasses[i].checked = true;
				}
			}
			btnAllePartijen.innerHTML = 'Selecteer alle partijen';
			btnAllePartijen.onclick = function() {selectGroup(3)};
			break;
		case 2:
			for (i = 0; i < parties.length; i++) {
				partyClasses[i].checked = false;
				if (parties[i].secular) {
					partyClasses[i].checked = true;
				}
			}
			btnAllePartijen.innerHTML = 'Selecteer alle partijen';
			btnAllePartijen.onclick = function() {selectGroup(3)};
			break;
		case 3:
			for (i = 0; i < partyClasses.length; i++) {
				partyClasses[i].checked = true;
			}
			btnAllePartijen.innerHTML = 'Deselecteer alle partijen';
			btnAllePartijen.onclick = function() {selectGroup(4)};
			break;
		case 4:
			for (i = 0; i < partyClasses.length; i++) {
				partyClasses[i].checked = false;
			}
			btnAllePartijen.innerHTML = 'Selecteer alle partijen';
			btnAllePartijen.onclick = function() {selectGroup(3)};
			break;
	}
}

function getResult() {
	if (anyPartySelected()) {
		titleHeader.innerHTML = 'Resultaat';
		var result = [];
		for (i = 0; i < document.getElementsByClassName('partijen').length; i++) {
			if (document.getElementsByClassName('partijen')[i].checked) {
				result.push({"name": parties[i].name, "points": parties[i].points});
			}
		}
		result.sort(function(a, b) {return b.points - a.points});
		result.forEach(function(res) {
			var pts = res.points / maxPoints * 100;
			res.percentage = Math.trunc(pts);
		});
		statementText.innerHTML = '';
		statementText.classList.remove("partyList");
		statementText.classList.add("resultList");
		result.forEach(function(res) {
			statementText.innerHTML += res.percentage + '% ' + res.name + '<br>';
		});
		buttonBox.innerHTML = '';
	} else {
		alert('Selecteer partijen om te vergelijken!');
	}
}

function anyPartySelected() {
	for (i = 0; i < document.getElementsByClassName('partijen').length; i++) {
		if (document.getElementsByClassName('partijen')[i].checked) {
			return true;
		}
	}
	return false;
}