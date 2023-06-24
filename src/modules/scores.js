// Get HTML elements
const addButton = document.querySelector('.add-button');
const refreshButton = document.querySelector('.refresh');
const errorElement = document.getElementById('error');

// API elements for Kawaii World game ---------------------------------------------------------
const urlAPI = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
const idAPI = 'a3tc8eSRVHEFLAZFTCqq';

// Buttons functionality ----------------------------------------------------------------------

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

  // nameInput and scoreInput are not empty
  if (!nameInput || !scoreInput) {
    errorElement.innerHTML = '<p>Please fill all the fields</p>';
    setTimeout(() => {
      errorElement.innerHTML = '';
    }, 3000);
    return;
  }

  // nameInput is not a number
  if (Number(nameInput) || nameInput === 0 || nameInput === '0') {
    errorElement.innerHTML = '<p>The name field cannot be a number</p>';
    setTimeout(() => {
      errorElement.innerHTML = '';
    }, 3000);
    return;
  }

  // scoreInput is greater than 0
  if (scoreInput === 0 || scoreInput === '0' || scoreInput < 0) {
    errorElement.innerHTML = '<p>Score must be greater than 0</p>';
    setTimeout(() => {
      errorElement.innerHTML = '';
    }, 3000);
    return;
  }

  // Save the data into the API
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    user: nameInput,
    score: parseInt(scoreInput, 10),
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(`${urlAPI}${idAPI}/scores/`, requestOptions)
    .then((response) => response.text())
    .catch((error) => error);

  // Reset the form and reload the page
  setTimeout(() => {
    refreshScores();
  }, 1000);
};

addButton.addEventListener('click', addScore);
refreshButton.addEventListener('click', refreshScores);

// Render results ------------------------------------------------------------------------------

// Render the scored saved in the localStorage
const renderScores = (data) => {
  let rating = '';
  // Sort the scores from highest to lowest
  data.result.sort((a, b) => b.score - a.score).forEach((score, index) => {
    rating += `
    <tr>
      <td><p>${index + 1}</p></td>
      <td><p>${score.user}</p></td>
      <td><p>${score.score}</p></td>
    </tr>
    `;
  });

  // Call the father element and insert the data into
  const scoresElement = document.querySelector('tbody');
  scoresElement.innerHTML = rating;
};

// Add an async function to get the data from the API
const getData = async (callback) => {
  try {
    const response = await fetch(`${urlAPI}${idAPI}/scores/`);
    const data = await response.json();
    callback(data);
  } catch (error) {
    errorElement.innerHTML = `<p>${error}</p>`;
  }
};

getData(renderScores);
