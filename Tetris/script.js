const tetrisBoard = document.getElementById('tetrisBoard');
const ROWS = 20;
const COLS = 10;
const CELL_SIZE = 30;

let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

const tetrominoes = [
    { shape: [[1, 1, 1], [0, 1, 0]], color: 'red' },   // T-shape
    { shape: [[1, 1], [1, 1]], color: 'yellow' },      // Square
    { shape: [[0, 1, 1], [1, 1, 0]], color: 'green' }, // S-shape
    { shape: [[1, 1, 0], [0, 1, 1]], color: 'blue' },  // Z-shape
    { shape: [[1, 1, 1, 1]], color: 'cyan' },          // I-shape
    { shape: [[1, 1, 1], [1, 0, 0]], color: 'orange' },// L-shape
    { shape: [[1, 1, 1], [0, 0, 1]], color: 'purple' } // J-shape
];

let currentTetromino = null;
let currentPosition = { x: 0, y: 0 };
let gameInterval = null;

function createBoard() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            tetrisBoard.appendChild(cell);
        }
    }
}

function drawBoard() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.querySelector(`.cell:nth-child(${col + 1 + row * COLS})`);
            cell.style.backgroundColor = board[row][col] ? board[row][col] : '#fff';
        }
    }
}

function spawnTetromino() {
    currentTetromino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
    currentPosition = { x: Math.floor(COLS / 2) - 1, y: 0 };

    if (!isValidMove(currentTetromino.shape, currentPosition)) {
        alert('Game Over');
        clearInterval(gameInterval);
        return;
    }

    drawTetromino();
}

function drawTetromino() {
    currentTetromino.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell) {
                const boardCell = document.querySelector(`.cell:nth-child(${(currentPosition.x + x + 1) + (currentPosition.y + y) * COLS})`);
                boardCell.style.backgroundColor = currentTetromino.color;
            }
        });
    });
}

function eraseTetromino() {
    currentTetromino.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell) {
                const boardCell = document.querySelector(`.cell:nth-child(${(currentPosition.x + x + 1) + (currentPosition.y + y) * COLS})`);
                boardCell.style.backgroundColor = '#fff';
            }
        });
    });
}

function isValidMove(shape, position) {
    return shape.every((row, y) =>
        row.every((cell, x) =>
            !cell ||
            (board[position.y + y] && board[position.y + y][position.x + x] === 0)
        )
    );
}

function moveTetromino(direction) {
    const newPosition = { ...currentPosition };
    if (direction === 'left') newPosition.x -= 1;
    if (direction === 'right') newPosition.x += 1;
    if (direction === 'down') newPosition.y += 1;

    if (isValidMove(currentTetromino.shape, newPosition)) {
        eraseTetromino();
        currentPosition = newPosition;
        drawTetromino();
    } else if (direction === 'down') {
        placeTetromino();
    }
}

function placeTetromino() {
    currentTetromino.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell) {
                board[currentPosition.y + y][currentPosition.x + x] = currentTetromino.color;
            }
        });
    });

    checkLines();
    spawnTetromino();
}

function checkLines() {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== 0)) {
            board.splice(row, 1);
            board.unshift(Array(COLS).fill(0));
        }
    }
    drawBoard();
}

function rotateTetromino() {
    const newShape = currentTetromino.shape[0].map((_, index) =>
        currentTetromino.shape.map(row => row[index]).reverse()
    );

    if (isValidMove(newShape, currentPosition)) {
        eraseTetromino();
        currentTetromino.shape = newShape;
        drawTetromino();
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') moveTetromino('left');
    if (event.key === 'ArrowRight') moveTetromino('right');
    if (event.key === 'ArrowDown') moveTetromino('down');
    if (event.key === 'ArrowUp') rotateTetromino();
});

createBoard();
spawnTetromino();

gameInterval = setInterval(() => {
    moveTetromino('down');
}, 1000);
