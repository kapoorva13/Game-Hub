// Show the popup when the page loads
window.onload = function() {
  const popup = document.getElementById('popup');
  setTimeout(() => {
    popup.classList.add('show');
  }, 1000); // Show the popup after 1 second
};

// Hide the popup
document.getElementById('popup').addEventListener('click', (e) => {
  if (e.target === document.getElementById('popup')) {
    document.getElementById('popup').classList.remove('show');
  }
});
