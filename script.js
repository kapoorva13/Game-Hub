const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let dx = 0;
let dy = 0;
let food = randomFood();
let score = 0;
let gameOver = false;

function randomFood() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
}

function gameLoop() {
  if (gameOver) {
    // Display Game Over message on canvas with smaller font size
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";  // Reduced font size
    ctx.fillText("Game Over! Your Score: " + score, canvas.width / 4, canvas.height / 2);
    setTimeout(() => {
      window.location.reload(); // Reload after 1.5 seconds
    }, 1500); // Delay for 1.5 seconds
    return;
  }

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Game Over: hit wall or self
  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount ||
    snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
  ) {
    gameOver = true; // Set gameOver flag to true to stop the game loop
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = randomFood();
  } else {
    snake.pop();
  }

  // Draw everything
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "lime";
  snake.forEach((segment) =>
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2)
  );

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

document.addEventListener("keydown", (e) => {
  if (gameOver) return; // Prevent key events if the game is over

  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -1;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = 1;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -1;
    dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = 1;
    dy = 0;
  }
});

setInterval(gameLoop, 150);
