"use strict";

const gameSizeOptionTab = document.querySelector(".options-container");

gameSizeOptionTab.addEventListener("click", (e) => {
  if (!e.target.classList.contains("options")) return;
  Array.from(gameSizeOptionTab.children).forEach((e) => {
    e.classList.remove("options--active");
  });

  e.target.classList.add("options--active");
  const gameDimensions = Number(e.target.textContent[0]);

  const currentBoard = new TicTacToeBoard(gameDimensions);
  currentBoard.createBoardHtml();
  currentBoard.decorateBoardCss();
});

const currentBoard = new TicTacToeBoard(3);
currentBoard.createBoardHtml();
currentBoard.decorateBoardCss();
