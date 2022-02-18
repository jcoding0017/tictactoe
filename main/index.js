"use strict";
// old code for 3by3 tictactoe

const restartButton = document.querySelector(".restart");
const gameOverWindow = document.querySelector(".game-over");
const container = document.querySelector(".container");

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const options = ["O", "X"];
const players = [0, 1];
let currentOption = 0;

//position of O's in arr[0], position of X's in arr[1]
let moves = [[], []];

function init() {
  const closeGameOverWindowbtn = document.querySelector(".quit");
  console.log(closeGameOverWindowbtn);
  container.addEventListener("click", playGame);
  restartButton.addEventListener("click", restartGame);
  closeGameOverWindowbtn.addEventListener("click", () => {
    console.log("this");
  });
}

function playGame(e) {
  if (!e.target.innerText == "") return;

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

function restartGame() {
  const squares = document.querySelectorAll(".box");
  squares.forEach((square) => (square.textContent = ""));
  moves = [[], []];
  currentOption = 0;
  container.addEventListener("click", playGame);
  gameOverWindow.classList.add("hide");
  gameOverWindow.classList.remove("show");
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

init();
