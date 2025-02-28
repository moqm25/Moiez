const API_BASE_URL = 'https://snake-game-moiez-896fcd7705d3.herokuapp.com';

// Get references to DOM elements
const nameContainer = document.getElementById('name-container');
const playerNameInput = document.getElementById('playerName');
const saveNameButton = document.getElementById('saveName');
const gameContainer = document.getElementById('game-container');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDiv = document.getElementById('score');
const restartButton = document.getElementById('restartButton');
const leaderboardBody = document.getElementById('leaderboard-body');

let playerName = '';

// Game grid settings
let cellCount = 20; // Fixed grid of 20x20

// These will be set dynamically for responsiveness
let canvasSize;
let cellSize;

// Game state variables
let snake = [];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let fruit = {};
let score = 0;
let gameInterval;
const speed = 150; // Game speed in milliseconds

// Setup canvas dimensions based on current window size
function setupCanvas() {
  // Use 90% of viewport width but no more than 400px
  canvasSize = Math.min(window.innerWidth * 0.9, 400);
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  cellSize = canvasSize / cellCount;
}

// Initialize canvas on load and update on window resize
setupCanvas();
window.addEventListener('resize', setupCanvas);

// Save player name and display the game container
saveNameButton.addEventListener('click', () => {
  const enteredName = playerNameInput.value.trim();
  if (enteredName) {
    playerName = enteredName;
    nameContainer.style.display = 'none';
    gameContainer.style.display = 'block';
    init();
    updateLeaderboardTable(); // Load leaderboard from server
  } else {
    alert("Please enter a valid name.");
  }
});

// Initialize game state
function init() {
  snake = [{ x: Math.floor(cellCount / 2), y: Math.floor(cellCount / 2) }];
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
  direction = nextDirection;
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check collision with walls or snake body
  if (
    head.x < 0 ||
    head.x >= cellCount ||
    head.y < 0 ||
    head.y >= cellCount ||
    checkCollision(head, snake)
  ) {
    gameOver();
    return;
  }

  snake.unshift(head);

  // Check if fruit is eaten
  if (head.x === fruit.x && head.y === fruit.y) {
    score++;
    updateScore();
    placeFruit();
  } else {
    snake.pop();
  }

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

  // Draw snake
  ctx.fillStyle = '#2ecc71';
  snake.forEach(cell => {
    ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
  });
}

// Place fruit in a random location (avoiding the snake)
function placeFruit() {
  fruit.x = Math.floor(Math.random() * cellCount);
  fruit.y = Math.floor(Math.random() * cellCount);
  if (snake.some(cell => cell.x === fruit.x && cell.y === fruit.y)) {
    placeFruit();
  }
}

// Check collision of snake head with its body
function checkCollision(head, snakeArray) {
  return snakeArray.some(cell => head.x === cell.x && head.y === cell.y);
}

// Update the score display
function updateScore() {
  scoreDiv.innerText = 'Score: ' + score;
}

// Game over routine
function gameOver() {
  clearInterval(gameInterval);
  alert('Game Over! Your score: ' + score);
  // Ask if the player wants to add their score to the leaderboard
  if (confirm("Do you want to add your score to the leaderboard?")) {
    addScoreToLeaderboard(playerName, score);
  }
}

// Send a POST request to add a new score
function addScoreToLeaderboard(name, score) {
  fetch(API_BASE_URL + '/leaderboard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, score })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    updateLeaderboardTable();
  })
  .catch(error => {
    console.error('Error adding score:', error);
  });
}

// Fetch leaderboard data from the server and update the table
function updateLeaderboardTable() {
  fetch(API_BASE_URL + '/leaderboard')
    .then(response => response.json())
    .then(data => {
      // Sort by descending score and select top 10
      data.sort((a, b) => b.score - a.score);
      const top10 = data.slice(0, 10);
      leaderboardBody.innerHTML = '';
      top10.forEach(entry => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = entry.name;
        const scoreCell = document.createElement('td');
        scoreCell.textContent = entry.score;
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        leaderboardBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching leaderboard:', error);
    });
}

// Listen for keyboard arrow presses to control the snake
document.addEventListener('keydown', event => {
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

// Touch event handling for mobile (swipe detection)
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', function(event) {
  let touch = event.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}, false);

canvas.addEventListener('touchend', function(event) {
  let touch = event.changedTouches[0];
  let touchEndX = touch.clientX;
  let touchEndY = touch.clientY;
  let deltaX = touchEndX - touchStartX;
  let deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (deltaX > 0 && direction.x === 0) {
      nextDirection = { x: 1, y: 0 };
    } else if (deltaX < 0 && direction.x === 0) {
      nextDirection = { x: -1, y: 0 };
    }
  } else {
    // Vertical swipe
    if (deltaY > 0 && direction.y === 0) {
      nextDirection = { x: 0, y: 1 };
    } else if (deltaY < 0 && direction.y === 0) {
      nextDirection = { x: 0, y: -1 };
    }
  }
}, false);

// Restart button event
restartButton.addEventListener('click', init);