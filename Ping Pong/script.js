document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 400;

    const paddleWidth = 10;
    const paddleHeight = 100;
    const ballSize = 10;
    let paddleSpeed = 5;
    let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
    let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballDX = 5;
    let ballDY = 5;
    let wPressed = false;
    let sPressed = false;
    let upPressed = false;
    let downPressed = false;

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    function keyDownHandler(event) {
        if (event.key === "w") {
            wPressed = true;
        } else if (event.key === "s") {
            sPressed = true;
        } else if (event.key === "ArrowUp") {
            upPressed = true;
        } else if (event.key === "ArrowDown") {
            downPressed = true;
        }
    }

    function keyUpHandler(event) {
        if (event.key === "w") {
            wPressed = false;
        } else if (event.key === "s") {
            sPressed = false;
        } else if (event.key === "ArrowUp") {
            upPressed = false;
        } else if (event.key === "ArrowDown") {
            downPressed = false;
        }
    }

    function draw() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw paddles
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
        ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

        // Draw ball
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();
    }

    function update() {
        // Move paddles
        if (wPressed && leftPaddleY > 0) {
            leftPaddleY -= paddleSpeed;
        } else if (sPressed && leftPaddleY < canvas.height - paddleHeight) {
            leftPaddleY += paddleSpeed;
        }

        if (upPressed && rightPaddleY > 0) {
            rightPaddleY -= paddleSpeed;
        } else if (downPressed && rightPaddleY < canvas.height - paddleHeight) {
            rightPaddleY += paddleSpeed;
        }

        // Move ball
        ballX += ballDX;
        ballY += ballDY;

        // Ball collision with top and bottom walls
        if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
            ballDY = -ballDY;
        }

        // Ball collision with paddles
        if (ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
            ballDX = -ballDX;
        } else if (ballX + ballSize > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
            ballDX = -ballDX;
        }

        // Ball out of bounds (score)
        if (ballX - ballSize < 0 || ballX + ballSize > canvas.width) {
            resetBall();
        }
    }

    function resetBall() {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballDX = -ballDX;
        ballDY = Math.random() < 0.5 ? -5 : 5; // Randomize initial direction
    }

    function gameLoop() {
        draw();
        update();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
