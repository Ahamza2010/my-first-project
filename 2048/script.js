document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector(".grid-container");
    const gridSize = 4;
    let tiles = [];
    let score = 0;

    function createGrid() {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const tile = document.createElement("div");
                tile.classList.add("tile");
                tile.dataset.row = row;
                tile.dataset.col = col;
                gridContainer.appendChild(tile);
                tiles.push(tile);
            }
        }
        addRandomTile();
        addRandomTile();
    }

    function addRandomTile() {
        const emptyTiles = tiles.filter(tile => !tile.dataset.value);
        if (emptyTiles.length > 0) {
            const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            randomTile.dataset.value = Math.random() < 0.9 ? 2 : 4;
            updateTile(randomTile);
        }
    }

    function updateTile(tile) {
        tile.textContent = tile.dataset.value || "";
        tile.className = "tile";
        if (tile.dataset.value) {
            tile.classList.add(`tile-${tile.dataset.value}`);
        }
    }

    function move(direction) {
        let moved = false;
        if (direction === "left" || direction === "right") {
            for (let row = 0; row < gridSize; row++) {
                const rowTiles = tiles.filter(tile => tile.dataset.row == row);
                const newRowTiles = slide(rowTiles, direction === "right");
                for (let i = 0; i < gridSize; i++) {
                    if (rowTiles[i].dataset.value !== newRowTiles[i].dataset.value) {
                        moved = true;
                    }
                    rowTiles[i].dataset.value = newRowTiles[i].dataset.value;
                    updateTile(rowTiles[i]);
                }
            }
        } else if (direction === "up" || direction === "down") {
            for (let col = 0; col < gridSize; col++) {
                const colTiles = tiles.filter(tile => tile.dataset.col == col);
                const newColTiles = slide(colTiles, direction === "down");
                for (let i = 0; i < gridSize; i++) {
                    if (colTiles[i].dataset.value !== newColTiles[i].dataset.value) {
                        moved = true;
                    }
                    colTiles[i].dataset.value = newColTiles[i].dataset.value;
                    updateTile(colTiles[i]);
                }
            }
        }
        if (moved) {
            addRandomTile();
            if (checkGameOver()) {
                setTimeout(() => alert("Game Over!"), 100);
            }
        }
    }

    function slide(tiles, reverse) {
        const newTiles = tiles.map(tile => parseInt(tile.dataset.value) || 0);
        if (reverse) newTiles.reverse();
        for (let i = 0; i < gridSize - 1; i++) {
            for (let j = 0; j < gridSize - 1; j++) {
                if (newTiles[j] === newTiles[j + 1]) {
                    newTiles[j] *= 2;
                    newTiles[j + 1] = 0;
                    score += newTiles[j];
                }
                if (newTiles[j] === 0) {
                    newTiles[j] = newTiles[j + 1];
                    newTiles[j + 1] = 0;
                }
            }
        }
        if (reverse) newTiles.reverse();
        return newTiles.map(value => ({ dataset: { value: value || "" } }));
    }

    function checkGameOver() {
        if (tiles.some(tile => !tile.dataset.value)) return false;
        for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            const value = parseInt(tile.dataset.value);
            const adjacentIndices = [i - 1, i + 1, i - gridSize, i + gridSize];
            for (const adjacentIndex of adjacentIndices) {
                if (adjacentIndex >= 0 && adjacentIndex < tiles.length) {
                    const adjacentTile = tiles[adjacentIndex];
                    if (parseInt(adjacentTile.dataset.value) === value) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    document.addEventListener("keydown", event => {
        switch (event.key) {
            case "ArrowUp":
                move("up");
                break;
            case "ArrowDown":
                move("down");
                break;
            case "ArrowLeft":
                move("left");
                break;
            case "ArrowRight":
                move("right");
                break;
        }
    });

    document.getElementById("restart-btn").addEventListener("click", () => {
        tiles.forEach(tile => {
            tile.dataset.value = "";
            updateTile(tile);
        });
        addRandomTile();
        addRandomTile();
    });

    createGrid();
});
