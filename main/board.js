"use strict";

//TicTacToeBoard that takes 1 argument, dimensions, and renders on web-page upon instantiation
class TicTacToeBoard {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.create();
  }

  getDimensions() {
    return this.dimensions;
  }

  createBoardHtml() {
    const container = document.querySelector(".container");
    container.innerHTML = "";
    for (let i = 0; i < this.getDimensions() ** 2; i++) {
      const html = `<div class="box" data-location="${i}"></div>`;
      container.insertAdjacentHTML("beforeend", html);
    }
  }

  decorateBoardCss() {
    const container = document.querySelector(".container");
    container.style.gridTemplateColumns = `repeat(${this.getDimensions()}, minmax(0, 1fr)`;

    //border-top for all row except first row.
    const allBoxes = document.querySelectorAll(".box");
    allBoxes.forEach((row) => {
      if (
        Number(row.getAttribute("data-location")) >
        this.getDimensions() - 1
      ) {
        row.style.borderTop = "solid black";
      }
    });

    //border right for all columns except last column
    allBoxes.forEach((column) => {
      if (
        (Number(column.getAttribute("data-location")) + 1) %
          this.getDimensions() !=
        0
      ) {
        column.style.borderRight = "solid black";
      }
    });
  }

  create() {
    this.createBoardHtml();
    this.decorateBoardCss();
  }
}
