"use strict";

// creates default 3x3 board when user loads page.
let gameDimensions = 3;
let winningCombinations = getWinningCombinationsArray(3);
new TicTacToeBoard(gameDimensions);

//event listener that allows users to change board size
const gameSizeOptionTab = document.querySelector(".options-container");

gameSizeOptionTab.addEventListener("click", (e) => {
  if (!e.target.classList.contains("options")) return;

  Array.from(gameSizeOptionTab.children).forEach((e) => {
    e.classList.remove("options--active");
  });

  e.target.classList.add("options--active");
  gameDimensions = Number(e.target.textContent[0]);

  renderBoard();
});

//event listener to the select tag.
const gameDimensionsDropdown = document.querySelector("select");
gameDimensionsDropdown.addEventListener("change", function (e) {
  if (this.value === "placeholder") return;
  gameDimensions = Number(this.value);
  Array.from(gameSizeOptionTab.children).forEach((tab) => {
    tab.classList.remove("options--active");
  });

  e.target.classList.add("options--active");
  renderBoard();
});

//creates new board and resets all saved data
function renderBoard() {
  restartGame();
  winningCombinations = getWinningCombinationsArray(gameDimensions);
  new TicTacToeBoard(gameDimensions);
}

const options = ["O", "X"];
let totalMovesPlayed = 0;
let currentPlayerOption = 0;
let allMoves = [[], []];

const gameContainer = document.querySelector(".container");
gameContainer.addEventListener("click", playGame);

function playGame(e) {
  if (!e.target.classList.contains("box") || !e.target.innerText == "") return;

  const markedLocation = e.target.dataset.location;
  e.target.textContent = options[currentPlayerOption];
  allMoves[currentPlayerOption].push(Number(markedLocation));

  totalMovesPlayed++;

  //check if player that just made a move won
  if (allMoves[currentPlayerOption].length >= gameDimensions) {
    console.log("this ran ");
    let playerWon = currentPlayerWon(allMoves[currentPlayerOption]);
    console.log(playerWon);
    if (playerWon) {
      gameOverText.textContent = `Player ${currentPlayerOption + 1} has won!`;
      endGame();
      return;
    }
  }

  //change active player
  currentPlayerOption = currentPlayerOption == 1 ? 0 : 1;

  //checks if draw happened
  if (totalMovesPlayed === gameDimensions ** 2) {
    gameOverText.textContent = "DRAW!";
    endGame();
  }
}

//renders the UI of game over and disables users from further clicking
function endGame() {
  gameContainer.removeEventListener("click", playGame);
  gameOverWindow.classList.add("show");
  gameOverWindow.classList.remove("hide");
}

//  returns a 2D array with all the winning combinations of positions (all rows, all columns and two diagonals) where each 'winning combination' is an array
function getWinningCombinationsArray(dimensions) {
  let rows = [];
  let columns = Array.from(Array(dimensions), () => []); // creates array with empty arrays [ [] * dimensions  ]
  let diagonals = [];

  (function createRows() {
    let currentRow = 0;
    let row = [];
    for (let i = 0; i < dimensions ** 2; i++) {
      row.push(i);
      if (row.length == dimensions) {
        rows.push([...row]);
        currentRow++;
        row = [];
      }
    }
  })();

  (function createColumns() {
    for (let i = 0; i < dimensions ** 2; i++) {
      columns[i % dimensions].push(i);
    }
  })();

  (function createDiagonals() {
    let diagonals1 = [];
    let diagonals2 = [];
    for (let i = 0; i < dimensions ** 2; i += dimensions + 1) {
      diagonals1.push(i);
    }
    for (let i = dimensions - 1; i < dimensions ** 2 - 1; i += dimensions - 1) {
      diagonals2.push(i);
    }
    diagonals.push(diagonals1);
    diagonals.push(diagonals2);
  })();

  return [...rows, ...columns, ...diagonals];
}

// check if the player that made the most recent move has won the game
function currentPlayerWon(currentPlayerMovesArray) {
  let result = false;
  winningCombinations.forEach((combination) => {
    if (combination.every((i) => currentPlayerMovesArray.includes(i))) {
      result = true;
    }
  });
  return result;
}
const gameOverText = document.querySelector(".game-over-text");
const gameOverWindow = document.querySelector(".game-over");
//deals with restart button
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", restartGame);

function restartGame() {
  const squares = document.querySelectorAll(".box");
  squares.forEach((square) => (square.textContent = ""));
  allMoves = [[], []];
  currentPlayerOption = 0;
  totalMovesPlayed = 0;
  gameContainer.addEventListener("click", playGame);
  gameOverWindow.classList.add("hide");
  gameOverWindow.classList.remove("show");
}

// close modal that shows 'player x has won'
const closeGameOverWindowButton = document.querySelector(".quit");
closeGameOverWindowButton.addEventListener("click", () => {
  gameOverWindow.classList.remove("show");
  gameOverWindow.classList.add("hide");
});
