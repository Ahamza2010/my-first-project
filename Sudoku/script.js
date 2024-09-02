const sudokuBoard = document.getElementById("sudokuBoard");
const checkSolutionBtn = document.getElementById("checkSolutionBtn");
const gameStatus = document.getElementById("gameStatus");

const initialBoard = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9],
];

function createBoard(board) {
  sudokuBoard.innerHTML = "";
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (board[row][col] !== null) {
        cell.textContent = board[row][col];
      } else {
        const input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = 9;
        input.addEventListener("input", function () {
          if (input.value > 9) input.value = 9;
          if (input.value < 1) input.value = "";
        });
        cell.appendChild(input);
      }
      sudokuBoard.appendChild(cell);
    }
  }
}

function getBoardState() {
  const board = [];
  const cells = sudokuBoard.querySelectorAll(".cell");
  for (let row = 0; row < 9; row++) {
    const rowData = [];
    for (let col = 0; col < 9; col++) {
      const cell = cells[row * 9 + col];
      if (cell.textContent) {
        rowData.push(parseInt(cell.textContent, 10));
      } else {
        const input = cell.querySelector("input");
        if (input && input.value) {
          rowData.push(parseInt(input.value, 10));
        } else {
          rowData.push(null);
        }
      }
    }
    board.push(rowData);
  }
  return board;
}

function isValid(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) {
      return false;
    }
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[startRow + r][startCol + c] === num) {
        return false;
      }
    }
  }
  return true;
}

function checkSolution() {
  const board = getBoardState();
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        gameStatus.textContent = "The boxes are empty, you idiot!";
        return;
      }
      if (
        board[row][col] !== null &&
        !isValid(board, row, col, board[row][col])
      ) {
        gameStatus.textContent = "Incorrect solution!";
        return;
      }
    }
  }
  gameStatus.textContent = "Correct solution!";
}

createBoard(initialBoard);
checkSolutionBtn.addEventListener("click", checkSolution);
