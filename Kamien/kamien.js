const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';
const obj = {
    rock: {
        name: rock,
        defeats: scissors
    },
    paper: {
        name: paper,
        defeats: rock
    },
    scissors: {
        name: scissors,
        defeats: paper
    }
}

var winResult = 0;
var loseResult = 0;
var tieResult = 0;
var options = [obj.rock, obj.paper, obj.scissors];

//add events
window.onload = () => {
    document.getElementById(rock)
        .addEventListener('click', function () { init(obj.rock) });
    document.getElementById(paper)
        .addEventListener('click', function () { init(obj.paper) });
    document.getElementById(scissors)
        .addEventListener('click', function () { init(obj.scissors) });
}

//init the game
function init(type) {
    gameBehaviour(type);
}

function gameBehaviour(userInput) {
    let botResponse = options[random(0, 3)]

    console.log(userInput);
    console.log(botResponse);

    showFight(userInput.name, botResponse.name);

    if (userInput === botResponse) {
        tie();
    }
    else if (userInput.defeats == botResponse.name) {
        win();
    }
    else {
        lose();
    }
}

function win() {
    winResult++;
    incrementScore('win', winResult);
    console.log('win');
}

function lose() {
    loseResult++;
    incrementScore('lose', loseResult);
    console.log('lose');
}

function tie() {
    tieResult++
    incrementScore('tie', tieResult);
    console.log('tie');
}

function showFight(userChoice, botChoice) {
    document.getElementById('user').className = `fas fa-hand-${userChoice} icon-game`;
    document.getElementById('bot').className = `fas fa-hand-${botChoice} icon-game`;
}

function incrementScore(id, variable) {
    document.getElementById(id).innerHTML = variable;
}

function random(min, max) {
    return min + Math.floor((max - min) * Math.random());
}

