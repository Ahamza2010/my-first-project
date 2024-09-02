const minesweeperBoard = document.getElementById('minesweeperBoard');
const restartBtn = document.getElementById('restartBtn');

const ROWS = 10;
const COLS = 10;
const MINES = 10;

let board = [];
let revealed = [];

function createBoard() {
    for (let row = 0; row < ROWS; row++) {
        board[row] = [];
        revealed[row] = [];
        for (let col = 0; col < COLS; col++) {
            board[row][col] = 0;
            revealed[row][col] = false;
            const cell = document.createElement('div');
            cell.classList.add('cell', 'hidden');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', revealCell);
            minesweeperBoard.appendChild(cell);
        }
    }
}

function placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
        const row = Math.floor(Math.random() * ROWS);
        const col = Math.floor(Math.random() * COLS);
        if (board[row][col] !== -1) {
            board[row][col] = -1;
            minesPlaced++;
        }
    }
}

function countAdjacentMines(row, col) {
    let count = 0;
    for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === -1) {
                count++;
            }
        }
    }
    return count;
}

function updateNumbers() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col] !== -1) {
                board[row][col] = countAdjacentMines(row, col);
            }
        }
    }
}

function revealCell(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    if (!revealed[row][col]) {
        if (board[row][col] === -1) {
            // Game over
            revealMines();
            alert('Game over!');
        } else {
            revealEmptyCells(row, col);
            renderBoard();
            if (checkWin()) {
                alert('You win!');
            }
        }
    }
}

function revealEmptyCells(row, col) {
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS || revealed[row][col]) {
        return;
    }

    revealed[row][col] = true;
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    cell.classList.remove('hidden');

    if (board[row][col] === 0) {
        revealEmptyCells(row - 1, col - 1);
        revealEmptyCells(row - 1, col);
        revealEmptyCells(row - 1, col + 1);
        revealEmptyCells(row, col - 1);
        revealEmptyCells(row, col + 1);
        revealEmptyCells(row + 1, col - 1);
        revealEmptyCells(row + 1, col);
        revealEmptyCells(row + 1, col + 1);
    }
}

function revealMines() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col] === -1) {
                const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
                cell.classList.add('mine');
                cell.classList.remove('hidden');
            }
        }
    }
}

function renderBoard() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            if (revealed[row][col]) {
                cell.classList.remove('hidden');
                if (board[row][col] > 0) {
                    cell.textContent = board[row][col];
                    cell.classList.add('number');
                }
            }
        }
    }
}

function checkWin() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (!revealed[row][col] && board[row][col] !== -1) {
                return false;
            }
        }
    }
    return true;
}

function restartGame() {
    minesweeperBoard.innerHTML = '';
    board = [];
    revealed = [];
    createBoard();
    placeMines();
    updateNumbers();
    renderBoard();
}

createBoard();
placeMines();
updateNumbers();
renderBoard();

restartBtn.addEventListener('click', restartGame);
