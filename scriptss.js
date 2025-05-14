const board = document.getElementById("gameBoard");
let currentPlayer = 1;
let scores = [0, 0];
let size = 3;

function startGame() {
  size = parseInt(document.getElementById("gridSize").value);
  scores = [0, 0];
  currentPlayer = 1;
  createBoard();
  updateScoreboard();
  updateTurnIndicator();
}

function createBoard() {
  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${size * 2 + 1}, auto)`;

  for (let row = 0; row < size * 2 + 1; row++) {
    for (let col = 0; col < size * 2 + 1; col++) {
      const cell = document.createElement('div');

      if (row % 2 === 0 && col % 2 === 0) {
        cell.className = 'dot';
      } else if (row % 2 === 0 && col % 2 === 1) {
        cell.className = 'line h-line';
        setLineData(cell, row, col);
      } else if (row % 2 === 1 && col % 2 === 0) {
        cell.className = 'line v-line';
        setLineData(cell, row, col);
      } else {
        cell.className = 'box';
        cell.dataset.row = row;
        cell.dataset.col = col;
      }

      board.appendChild(cell);
    }
  }
}

function setLineData(cell, row, col) {
  cell.dataset.row = row;
  cell.dataset.col = col;
  cell.addEventListener('click', handleLineClick);
}

function handleLineClick(e) {
  const line = e.target;
  if (line.classList.contains('taken')) return;

  line.classList.add('taken');
  let boxCompleted = checkBox(line);

  if (!boxCompleted) currentPlayer = currentPlayer === 1 ? 2 : 1;

  updateScoreboard();
  updateTurnIndicator();
}

function checkBox(line) {
  const row = parseInt(line.dataset.row);
  const col = parseInt(line.dataset.col);
  const isHorizontal = row % 2 === 0;

  let boxesCompleted = 0;
  const boxesToCheck = [];

  if (isHorizontal) {
    if (row > 0) boxesToCheck.push([row - 1, col]);
    if (row < size * 2) boxesToCheck.push([row + 1, col]);
  } else {
    if (col > 0) boxesToCheck.push([row, col - 1]);
    if (col < size * 2) boxesToCheck.push([row, col + 1]);
  }

  for (let [r, c] of boxesToCheck) {
    const top = document.querySelector(`.line[data-row="${r - 1}"][data-col="${c}"]`);
    const bottom = document.querySelector(`.line[data-row="${r + 1}"][data-col="${c}"]`);
    const left = document.querySelector(`.line[data-row="${r}"][data-col="${c - 1}"]`);
    const right = document.querySelector(`.line[data-row="${r}"][data-col="${c + 1}"]`);

    if (top?.classList.contains('taken') &&
        bottom?.classList.contains('taken') &&
        left?.classList.contains('taken') &&
        right?.classList.contains('taken')) {
      const box = document.querySelector(`.box[data-row="${r}"][data-col="${c}"]`);
      if (!box.classList.contains('p1') && !box.classList.contains('p2')) {
        box.classList.add(currentPlayer === 1 ? 'p1' : 'p2');
        scores[currentPlayer - 1]++;
        boxesCompleted++;
      }
    }
  }

  return boxesCompleted > 0;
}

function updateScoreboard() {
  document.getElementById("player1").textContent = `Player 1: ${scores[0]}`;
  document.getElementById("player2").textContent = `Player 2: ${scores[1]}`;
}

function updateTurnIndicator() {
  document.getElementById("turnIndicator").textContent = `Player ${currentPlayer}'s Turn`;
}

// Initialize on load
startGame();
