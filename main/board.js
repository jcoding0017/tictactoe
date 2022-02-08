"use strict";

class TicTacToeBoard {
  constructor(dimensions) {
    this.dimensions = dimensions;
  }

  getDimensions() {
    return this.dimensions;
  }

  createRowsArray() {
    const rows = [];
    let row = [];
    let nthRow = 0;

    for (let i = 0; i < this.getDimensions() ** 2; i++) {
      row.push(i);
      if (row.length == this.getDimensions()) {
        rows.push([...row]);
        nthRow++;
        row = [];
      }
    }
    return rows;
  }

  createColumnsArray() {
    const columns = [];
    return columns;
  }

  createDiagonalsArray() {
    const diagonals = [];
    return diagonals;
  }

  //   findWinningCombinations() {
  //     const rows = this.createRowsArray();
  //     const columns = this.createColumnsArray();
  //     const diagonals = this.createDiagonalsArray();

  //     const winningCombinations = [...rows, ...columns, ...diagonals];
  //     return winningCombinations;
  //   }

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
    container.style.gridTemplateColumns = `repeat(${this.getDimensions()}, 1fr)`;

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
}

let x = new TicTacToeBoard(9);

x.createBoardHtml();
x.decorateBoardCss();
