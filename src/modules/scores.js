// Get HTML elements
const refreshButton = document.querySelector('.refresh');

// Add event listeners

// Refresh button to reload the page and clear the form
const refreshScores = () => {
  document.querySelector('.add-form').reset();
  window.location.reload();
};

refreshButton.addEventListener('click', refreshScores);