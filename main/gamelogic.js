"use strict";

// creates defualt 3x3 baord

const currentBoard = new TicTacToeBoard(3);
currentBoard.create();

//creates board based on user-selected dimensions
function renderBoard() {
  let currentBoard;
  const gameSizeOptionTab = document.querySelector(".options-container");

  gameSizeOptionTab.addEventListener("click", (e) => {
    if (!e.target.classList.contains("options")) return;
    Array.from(gameSizeOptionTab.children).forEach((e) => {
      e.classList.remove("options--active");
    });
    let gameDimensions;
    e.target.classList.add("options--active"); //change display of selected dimension

    //listen to if dimension is chosen from button click or selected from options tab.
    if (e.target.classList.contains("select-tab")) {
      const idx = e.target.selectedIndex;
      gameDimensions = idx + 6;
    } else {
      gameDimensions = Number(e.target.textContent[0]);
    }

    currentBoard = new TicTacToeBoard(gameDimensions);
    currentBoard.create();
    console.log(currentBoard);
  });
}

renderBoard();
