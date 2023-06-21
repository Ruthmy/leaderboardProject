// Get HTML elements
const addButton = document.querySelector('.add-button');
const refreshButton = document.querySelector('.refresh');
const errorElement = document.getElementById('error');

// Add event listeners

// Refresh button to reload the page and clear the form
const refreshScores = () => {
  document.querySelector('.add-form').reset();
  window.location.reload();
};

// Add new score to the list and save them into localStorage
const addScore = () => {
  const nameInput = document.querySelector('#name').value;
  const scoreInput = document.querySelector('#score').value;

  if (nameInput && scoreInput && scoreInput !== 0 && scoreInput > 0) {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ nameInput, scoreInput });

    localStorage.setItem('scores', JSON.stringify(scores));
    document.querySelector('.add-form').reset();
    window.location.reload();
  } else if (scoreInput === 0 || scoreInput < 0) {
    errorElement.innerHTML = '<p>Score must be greater than 0</p>';
    setTimeout(() => {
      errorElement.innerHTML = '';
    }, 3000);
  } else {
    errorElement.innerHTML = '<p>Please fill all the fields</p>';
    setTimeout(() => {
      errorElement.innerHTML = '';
    }, 3000);
  }
};

addButton.addEventListener('click', addScore);
refreshButton.addEventListener('click', refreshScores);

// Render the scored saved in the localStorage
const renderScores = () => {
  const scores = JSON.parse(localStorage.getItem('scores')) || [];

  let rating = '';
  scores.sort((a, b) => b.score - a.score);

  scores.forEach((score, index) => {
    rating += `
    <tr>
      <td><p>${index + 1}</p></td>
      <td><p>${score.nameInput}</p></td>
      <td><p>${score.scoreInput}</p></td>
    </tr>
    `;
  });

  // Call the father element and insert the data into
  const scoresElement = document.querySelector('tbody');
  scoresElement.innerHTML = rating;
};

renderScores();
