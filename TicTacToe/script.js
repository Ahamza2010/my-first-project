document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const statusText = document.getElementById("status");
  const resetButton = document.getElementById("resetButton");
  let currentPlayer = "X";
  let board = ["", "", "", "", "", "", "", "", ""];

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  resetButton.addEventListener("click", resetGame);

  function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute("data-index");

    if (board[cellIndex] !== "" || checkWinner()) {
      return;
    }

    updateCell(cell, cellIndex);
    if (checkWinner()) {
      statusText.textContent = `Player ${currentPlayer} wins!`;
    } else if (board.every((cell) => cell !== "")) {
      statusText.textContent = "It's a draw!";
    } else {
      switchPlayer();
    }
  }

  function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function checkWinner() {
    return winningConditions.some((condition) => {
      return condition.every((index) => board[index] === currentPlayer);
    });
  }

  function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => (cell.textContent = ""));
    currentPlayer = "X";
    statusText.textContent = "";
  }
});
