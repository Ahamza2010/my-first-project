const connectFourBoard = document.getElementById("connectFourBoard");
const restartBtn = document.getElementById("restartBtn");
const gameStatus = document.getElementById("gameStatus");

const ROWS = 6;
const COLS = 7;

let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
let currentPlayer = 1;
let gameActive = true;

function createBoard() {
  connectFourBoard.innerHTML = "";
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", handleCellClick);
      connectFourBoard.appendChild(cell);
    }
  }
  gameStatus.textContent = "Player 1's turn"; // Initialize the game status
}

function handleCellClick(event) {
  if (!gameActive) return;

  const col = parseInt(event.target.dataset.col);
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === 0) {
      board[row][col] = currentPlayer;
      const cell = document.querySelector(
        `.cell[data-row="${row}"][data-col="${col}"]`
      );
      cell.classList.add(`player${currentPlayer}`);
      if (checkWin(row, col)) {
        gameStatus.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
      } else if (board.flat().every((cell) => cell !== 0)) {
        gameStatus.textContent = "It's a tie!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        gameStatus.textContent = `Player ${currentPlayer}'s turn`; // Update the turn message
      }
      break;
    }
  }
}

function checkWin(row, col) {
  return (
    checkDirection(row, col, 1, 0) || // Horizontal
    checkDirection(row, col, 0, 1) || // Vertical
    checkDirection(row, col, 1, 1) || // Diagonal \
    checkDirection(row, col, 1, -1) // Diagonal /
  );
}

function checkDirection(row, col, rowIncrement, colIncrement) {
  let count = 0;
  let r = row;
  let c = col;

  // Check backward direction
  while (
    r >= 0 &&
    r < ROWS &&
    c >= 0 &&
    c < COLS &&
    board[r][c] === currentPlayer
  ) {
    count++;
    r -= rowIncrement;
    c -= colIncrement;
  }

  r = row + rowIncrement;
  c = col + colIncrement;

  // Check forward direction
  while (
    r >= 0 &&
    r < ROWS &&
    c >= 0 &&
    c < COLS &&
    board[r][c] === currentPlayer
  ) {
    count++;
    r += rowIncrement;
    c += colIncrement;
  }

  return count >= 4;
}

function restartGame() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  currentPlayer = 1;
  gameActive = true;
  gameStatus.textContent = "Player 1's turn"; // Reset to Player 1's turn
  createBoard();
}

createBoard();
restartBtn.addEventListener("click", restartGame);
