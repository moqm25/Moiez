// Get references to the canvas and its context, plus other DOM elements.
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDiv = document.getElementById('score');
const restartButton = document.getElementById('restartButton');

// Game settings
const canvasSize = 400;
const cellSize = 20;
const cellCount = canvasSize / cellSize;
let snake = [];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let fruit = {};
let score = 0;
let gameInterval;
const speed = 150; // game speed in milliseconds

// Initialize the game state
function init() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  score = 0;
  updateScore();
  placeFruit();
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, speed);
}

// Main game loop
function gameLoop() {
  // Update direction based on latest key input
  direction = nextDirection;
  // Calculate new head position
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check collision with walls or self
  if (head.x < 0 || head.x >= cellCount || head.y < 0 || head.y >= cellCount || checkCollision(head, snake)) {
    gameOver();
    return;
  }

  // Add new head to the snake
  snake.unshift(head);

  // Check if the snake has eaten the fruit
  if (head.x === fruit.x && head.y === fruit.y) {
    score++;
    updateScore();
    placeFruit();
  } else {
    // Remove the tail cell
    snake.pop();
  }

  // Redraw the game state
  draw();
}

// Draw the game elements
function draw() {
  // Clear canvas
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Draw fruit
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(fruit.x * cellSize, fruit.y * cellSize, cellSize, cellSize);

  // Draw snake with a pleasant visual style
  ctx.fillStyle = '#2ecc71';
  snake.forEach(cell => {
    ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
  });
}

// Randomly place the fruit on the grid, ensuring it doesn't land on the snake
function placeFruit() {
  fruit.x = Math.floor(Math.random() * cellCount);
  fruit.y = Math.floor(Math.random() * cellCount);

  if (snake.some(cell => cell.x === fruit.x && cell.y === fruit.y)) {
    placeFruit();
  }
}

// Check if the head collides with any cell of the snake
function checkCollision(head, snakeArray) {
  return snakeArray.some(cell => head.x === cell.x && head.y === cell.y);
}

// Update the score display
function updateScore() {
  scoreDiv.innerText = 'Score: ' + score;
}

// Handle game over scenario
function gameOver() {
  clearInterval(gameInterval);
  alert('Game Over! Your score: ' + score);
}

// Listen for key presses to control the snake
document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y === 0) nextDirection = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) nextDirection = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) nextDirection = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) nextDirection = { x: 1, y: 0 };
      break;
  }
});

// Restart button listener to restart the game
restartButton.addEventListener('click', init);

// Start the game when the page loads
init();