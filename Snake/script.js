document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const scoreDisplay = document.getElementById("score");

    canvas.width = 400;
    canvas.height = 400;

    const gridSize = 20;
    let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    let direction = { x: 0, y: 0 };
    let food = { x: gridSize * 10, y: gridSize * 10 };
    let score = 0;

    document.addEventListener("keydown", changeDirection);

    function changeDirection(event) {
        const keyPressed = event.key;
        const goingUp = direction.y === -gridSize;
        const goingDown = direction.y === gridSize;
        const goingRight = direction.x === gridSize;
        const goingLeft = direction.x === -gridSize;

        if (keyPressed === "ArrowUp" && !goingDown) {
            direction = { x: 0, y: -gridSize };
        }
        if (keyPressed === "ArrowDown" && !goingUp) {
            direction = { x: 0, y: gridSize };
        }
        if (keyPressed === "ArrowLeft" && !goingRight) {
            direction = { x: -gridSize, y: 0 };
        }
        if (keyPressed === "ArrowRight" && !goingLeft) {
            direction = { x: gridSize, y: 0 };
        }
    }

    function drawSnake() {
        ctx.fillStyle = "#32CD32";
        snake.forEach(part => {
            ctx.fillRect(part.x, part.y, gridSize, gridSize);
        });
    }

    function moveSnake() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreDisplay.textContent = "Score: " + score;
            generateFood();
        } else {
            snake.pop();
        }

        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || checkCollision(head)) {
            resetGame();
        }
    }

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
        };

        snake.forEach(part => {
            if (part.x === food.x && part.y === food.y) {
                generateFood();
            }
        });
    }

    function drawFood() {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(food.x, food.y, gridSize, gridSize);
    }

    function checkCollision(head) {
        for (let i = 4; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                return true;
            }
        }
        return false;
    }

    function resetGame() {
        snake = [{ x: gridSize * 5, y: gridSize * 5 }];
        direction = { x: 0, y: 0 };
        score = 0;
        scoreDisplay.textContent = "Score: 0";
        generateFood();
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood();
        moveSnake();
        setTimeout(gameLoop, 100);
    }

    resetGame();
    gameLoop();
});
