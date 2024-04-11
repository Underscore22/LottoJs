// Chargement des nombres

onStartSpiel();

function start(e) {
  e.dataTransfer.effectAllowed="move";
  e.dataTransfer.setData("text/plain", e.target.id);
}
function over(e) {
  return false;
}
function drop(e) {
  e.preventDefault();
  var ob = e.dataTransfer.getData("text");

  var childrens = e.currentTarget.children.length;
  if(childrens == 5){
    var btnspielen = document.getElementById('spielbutton');
    btnspielen.style.display = 'flex';
    btnspielen.style.transition = '7rem 2s 4rem 2s';
    btnspielen.style.transitionTimingFunction = 'ease-in-out';
  }
  if(childrens < 6){
    e.currentTarget.appendChild(document.getElementById(ob));
  }else {
    var draggableNummers = document.querySelectorAll('.nombre');
    draggableNummers.forEach((item) => {
      item.draggable = false;
    });
    var limiteText = document.getElementById('limiteText');
    limiteText.textContent = "Limit erreicht...";
    limiteText.style.color = "red";
    limiteText.style.position = "relative";

    setTimeout(function () {
      limiteText.textContent = "";
    }, 3000);

  }

  e.stopPropagation();
  return false;
}

function onStartSpiel() {
  document.addEventListener('DOMContentLoaded', function() {
    var nombres = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49];

    var nummersDiv = document.getElementById('allnumbers');

    nombres.forEach((item, i) => {
      var divNumber = document.createElement('div');
      divNumber.className = 'nombre';
      divNumber.setAttribute('draggable', 'true');
      divNumber.setAttribute('id', i);
      divNumber.textContent = item;
      nummersDiv.appendChild(divNumber);

    });

  });
}

function generateNummer() {
  var nombres = [];

  for(var i = 0; i < 6; i++){
    var randomNumbers = Math.floor(Math.random() * 49) + 1;
    nombres.push(randomNumbers);
  }
  return nombres;
}

function zeigtNummer() {
  renisializeColor();
  var nummersDiv = document.getElementById('allnumbers');
  var ondropZahlen = [];
  var richtigeZahlen = [];
  var gewalhtenummer = document.getElementById('gewalhtenummer').children;

  var randomNumbers = generateNummer();

  nummersDiv.innerHTML="";

  for(var i=0; i<gewalhtenummer.length; i++){
    ondropZahlen.push(parseInt(gewalhtenummer[i].textContent));
  }

  _randomNumbers(randomNumbers, ondropZahlen, nummersDiv);


  for(var j=0; j<ondropZahlen.length; j++){
    for(var i=0; i<randomNumbers.length; i++){
      if(randomNumbers.includes(ondropZahlen[j])){

        gewalhtenummer[j].style.backgroundColor = 'green';
        gewalhtenummer[j].style.color = 'white';
      }
    }
  }

}
function ergebnis(ergebnis) {
  switch (ergebnis) {
    case 0:
    case 1:
    case 2:
      alert("Shade...");
      break;
    case 3:
    case 4:
    case 5:
      alert("Herzlichen Glückwunsch !");
      break;
    case 6:
      alert("UNGLAUBLICH");
      break;
    default:
      break;

  }
}
function replay() {
  location.reload();
}
function sortNumber(randomNumbers) {
  var nummerGesorted = randomNumbers.slice();
  var temp;

  for (var i = 0; i < randomNumbers.length; i++) {
    for (var j = 0; j < (randomNumbers.length - i - 1); j++) { // randomNumbers.length - i - 1 garantit que nous ne comparons que les éléments qui sont réellement non triés à chaque itération, ce qui permet d'éviter des comparaisons inutiles et d'améliorer l'efficacité de l'algorithme.
      if (nummerGesorted[j] > nummerGesorted[j+1]) {
        temp = nummerGesorted[j];
        nummerGesorted[j] = nummerGesorted[j+1];
        nummerGesorted[j+1] = temp;
      }
    }
  }
  return nummerGesorted;

}
function _randomNumbers(randomNumbers, ondropZahlen, nummersDiv) {

  var correctZahlen = 0;

  var nummerGesorted = sortNumber(randomNumbers);

  nummerGesorted.forEach((item, i) => {

    var divNumber = document.createElement('div');

    divNumber.className = 'nombre';
    divNumber.setAttribute('draggable', 'false');
    divNumber.setAttribute('id', i);
    divNumber.textContent = item;

    if (ondropZahlen.includes(item)) {
      divNumber.style.backgroundColor = 'green';
      divNumber.style.color = 'white';

      correctZahlen++;
      console.log("correctZahlen -->", correctZahlen);
    }
    nummersDiv.appendChild(divNumber);
  });

  setTimeout(function () {
    ergebnis(correctZahlen);
  }, 1000);
  setTimeout(function () {
    replay();
  }, 2500);
}
function renisializeColor() {
  var gewalhtenummer = document.getElementById('gewalhtenummer').children;

  for(var i=0; i<gewalhtenummer.length; i++){
    gewalhtenummer[i].style.backgroundColor = '';
    gewalhtenummer[i].style.color = '';
  }
}
