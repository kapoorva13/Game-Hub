// Get references to the HTML elements
const userChoiceElem = document.getElementById('userChoice');
const computerChoiceElem = document.getElementById('computerChoice');
const winnerElem = document.getElementById('winner');

// Add event listeners to buttons
document.getElementById('rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));

// Function to play the game
function playGame(userChoice) {
  // Display user's choice
  userChoiceElem.textContent = `You chose: ${userChoice.charAt(0).toUpperCase() + userChoice.slice(1)}`;

  // Generate computer's choice randomly
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  // Display computer's choice
  computerChoiceElem.textContent = `Computer chose: ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}`;

  // Determine the winner
  let result = '';
  if (userChoice === computerChoice) {
    result = 'It\'s a tie!';
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    result = 'You win!';
    winnerElem.style.color = '#2ecc71';  // Green for user win
  } else {
    result = 'Computer wins!';
    winnerElem.style.color = '#e74c3c';  // Red for computer win
  }

  // Display the winner
  winnerElem.textContent = result;
}
