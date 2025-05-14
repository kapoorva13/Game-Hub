let emojis = [];
let board = [];
let flipped = [];
let matchedCount = 0;
const gridSize = 4;  // Fixed 5x5 grid size

const emojiSets = {
  fruits: ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍑', '🍍', '🥭', '🍊', '🍋', '🍍', '🍐', '🥥', '🍆', '🥒'],
  animals: ['🐶', '🐱', '🐰', '🐻', '🐼', '🐨', '🦊', '🦁', '🐯', '🐮', '🐷', '🐸', '🐯', '🦄', '🦢', '🦀'],
  faces: ['😊', '😂', '😍', '😎', '🥺', '😢', '😜', '🤔', '😡', '😱', '🤪', '🙃', '😆', '🤩', '😤', '😇'],
  sports: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🥎', '🏏', '🏑', '🥍', '⚒', '🏓', '🥋', '🏹', '⛷️']
};

function startGame() {
  const emojiSelect = document.getElementById('emojiSelect');
  
  const selectedEmojiSet = emojiSelect.value;
  
  emojis = emojiSets[selectedEmojiSet];
  
  // Calculate how many pairs are needed based on the fixed grid size (5x5 grid)
  const numPairs = (gridSize * gridSize) / 2;

  if (emojis.length < numPairs) {
    alert('Not enough emojis for the selected board size! Defaulting to 5x5 grid.');
    return;
  }

  emojis = shuffle([...emojis.slice(0, numPairs), ...emojis.slice(0, numPairs)]);

  board = [];
  flipped = [];
  matchedCount = 0;

  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  
  // Adjust the grid layout dynamically to always be 5x5
  gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
  
  emojis.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.dataset.emoji = emoji;
    card.innerText = emoji;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });

  document.getElementById('status').textContent = '';
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function flipCard(e) {
  const card = e.currentTarget;
  if (card.classList.contains('flipped') || card.classList.contains('matched') || flipped.length === 2) return;

  card.classList.add('flipped');
  card.style.color = '#013a63';
  flipped.push(card);

  if (flipped.length === 2) {
    const [first, second] = flipped;

    if (first.dataset.emoji === second.dataset.emoji) {
      first.classList.add('matched');
      second.classList.add('matched');
      matchedCount++;
      flipped = [];

      if (matchedCount === emojis.length / 2) {
        document.getElementById('status').textContent = '🎉 You matched all the cards!';
      }
    } else {
      setTimeout(() => {
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        first.style.color = 'transparent';
        second.style.color = 'transparent';
        flipped = [];
      }, 800);
    }
  }
}

// Initialize game on load
document.addEventListener('DOMContentLoaded', startGame);
