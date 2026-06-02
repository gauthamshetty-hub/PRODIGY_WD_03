
// Select Elements

const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");


// Variables

let currentPlayer = "X";

let gameActive = true;

let gameState = ["", "", "", "", "", "", "", "", ""];


// Winning Conditions

const winningConditions = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];


// Handle Cell Click

function handleCellClick(){

    const index = this.getAttribute("data-index");

    // Ignore if already filled

    if(gameState[index] !== "" || !gameActive){

        return;

    }

    // Update Cell

    gameState[index] = currentPlayer;

    this.innerHTML = currentPlayer;

    // Check Winner

    checkWinner();

}


// Check Winner Function

function checkWinner(){

    let roundWon = false;

    for(let i = 0; i < winningConditions.length; i++){

        const condition = winningConditions[i];

        const a = gameState[condition[0]];

        const b = gameState[condition[1]];

        const c = gameState[condition[2]];

        if(a === "" || b === "" || c === ""){

            continue;

        }

        if(a === b && b === c){

            roundWon = true;

            break;

        }

    }

    // Winner

    if(roundWon){

        statusText.innerHTML = `Player ${currentPlayer} Wins!`;

        gameActive = false;

        return;

    }

    // Draw

    if(!gameState.includes("")){

        statusText.innerHTML = "Match Draw!";

        gameActive = false;

        return;

    }

    // Change Player

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.innerHTML = `Player ${currentPlayer} Turn`;

}


// Restart Game

function restartGame(){

    currentPlayer = "X";

    gameActive = true;

    gameState = ["", "", "", "", "", "", "", "", ""];

    statusText.innerHTML = "Player X Turn";

    cells.forEach(cell => cell.innerHTML = "");

}


// Event Listeners

cells.forEach(cell => cell.addEventListener("click", handleCellClick));

restartBtn.addEventListener("click", restartGame);