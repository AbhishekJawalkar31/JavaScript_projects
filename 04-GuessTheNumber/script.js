let randomNumber = parseInt(Math.random() * 100 + 1);

const userInput = document.querySelector("#guessField");
const submit = document.querySelector("#subt");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p");

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if(playGame) {
    submit.addEventListener("click", function(e){
        e.preventDefault();

        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}


function validateGuess(guess) {
    if(isNaN(guess) || guess < 1 || guess > 100) {
        alert("Please enter valid number");
    }
    else {
        prevGuess.push(guess); 

        if(numGuess >= 10) {
            displayMessage(`Game Over. Random number was ${randomNumber}`);

            endGame();
        }

        else {
            checkGuess(guess);
        }

        displayGuess(guess);
    }

}

function checkGuess(guess) {
    if(guess === randomNumber) {
        displayMessage(`Congratulations! You guessed it right.`);
        endGame();
    }

    else if(guess < randomNumber) {
        displayMessage(`Your number is less`);
    }

    else {
        displayMessage(`Your number is greater`);
    }
}

function displayGuess(guess) { 
    userInput.value = " ";
    guessSlot.innerHTML += `${guess}   `;
    numGuess++;
    remaining.innerHTML--;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}<h2>`; 
}
   
function endGame() {
    userInput.value = " ";
    userInput.setAttribute("disabled", " ");
    p.classList.add("button");
    p.innerHTML = `<button id="newGame">Start new game</button>`;
    startOver.appendChild(p); 

    playGame = false;
    newGame(); 
}

function newGame() {
    const newGameButton = document.querySelector("#newGame");

    newGameButton.addEventListener("click", function(e){
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = " ";
        remaining.innerHTML = `${10}`;
        userInput.removeAttribute("disabled");
        startOver.removeChild(p);

        playGame = true;
    })
}