"use strict";
let winningCombinations = getWinningCombinationsArray(3);
// creates default 3x3 board when user loads page.
(function init() {
  new TicTacToeBoard(3);
  renderBoard();
})();

//creates board based on user-selected dimensions
function renderBoard() {
  const gameSizeOptionTab = document.querySelector(".options-container");

  gameSizeOptionTab.addEventListener("click", (e) => {
    let gameDimensions;
    if (!e.target.classList.contains("options")) return;
    Array.from(gameSizeOptionTab.children).forEach((e) => {
      e.classList.remove("options--active");
    });

    e.target.classList.add("options--active"); //change display of selected dimension button

    if (e.target.classList.contains("select-tab")) {
      const idx = e.target.selectedIndex;
      gameDimensions = idx + 6;
    } else {
      gameDimensions = Number(e.target.textContent[0]);
    }
    winningCombinations = getWinningCombinationsArray(gameDimensions);
    new TicTacToeBoard(gameDimensions);
  });
}

//returns a 2D array with all the winning combinations of positions (all rows, all columns and two diagonals) where each 'winning combination' is an array
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

const container = document.querySelector(".container");
const gameOverWindow = document.querySelector(".game-over");

const options = ["O", "X"];
const players = [0, 1];
let currentOption = 0;
let moves = [[], []];
container.addEventListener("click", playGame);

function playGame(e) {
  if (!e.target.classList.contains("box") || !e.target.innerText == "") return;

  const gameOverText = document.querySelector(".game-over-text");

  const position = e.target.dataset.location;
  e.target.textContent = options[players[currentOption]];
  moves[currentOption].push(Number(position));

  //check if player that just made a move won the game
  if (moves[currentOption].length > 2) {
    const result = currentPlayerWon(moves[currentOption]);
    if (result) {
      gameOverText.textContent = `Player ${currentOption + 1} has won!`;
      gameOver();
      return;
    }
  }

  //change active player
  currentOption = currentOption == 1 ? 0 : 1;

  //if all 9 moves are played an no winner -> draw
  if (moves.flat().length === 9) {
    gameOverText.textContent = "DRAW!";
    gameOver();
  }
}
//checks if board contains any winning combinatino of X or Os

function currentPlayerWon(currentPlayerMoves) {
  let result = false;
  winningCombinations.forEach((combination) => {
    if (combination.every((i) => currentPlayerMoves.includes(i))) {
      result = true;
    }
  });
  return result;
}

const gameOver = () => {
  container.removeEventListener("click", playGame);
  gameOverWindow.classList.remove("hide");
  gameOverWindow.classList.add("show");
};
