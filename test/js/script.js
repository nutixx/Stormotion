
let matches = 25; // Початкова кількість сірників
let playerMatches = 0;
let computerMatches = 0;
const status = document.getElementById('status');
const btnsContainer = document.querySelector('.buttons-container');

function updateStatus(message) {
  status.innerHTML = message;
}

function computerTurn() {
  let matchesToTake = matches % 4 === 0 ? 1 : matches % 4;
  matches -= matchesToTake;
  computerMatches += matchesToTake;
  updateStatus(`Комп'ютер взяв ${matchesToTake} сірник(и). Залишилось ${matches} сірників.`);

  if (matches === 0) {
    declareWinner();
  }
  enableButtons(btnsContainer);
}

function reset() {
  matches = 25;
  playerMatches = 0;
  computerMatches = 0;
}

function disableButtons(div) {
  for (const btn of div.children) {
    btn.disabled = true;
  }
}

function enableButtons(div) {
  for (const btn of div.children) {
    btn.disabled = false;
  }
}

function playerTurn(matchesToTake) {
  if (matchesToTake < 1 || matchesToTake > 3 || matchesToTake > matches) {
    alert('Невірний хід. Ви можете взяти лише 1, 2 або 3 сірники.');
    return;
  }

  matches -= matchesToTake;
  playerMatches += matchesToTake;
  updateStatus(`Гравець взяв ${matchesToTake} сірник(и). Залишилось ${matches} сірників.`);

  if (matches === 0) {
    declareWinner();
  }

  else {
    disableButtons(btnsContainer);
    setTimeout(computerTurn, 1000); // Хід комп'ютера через 0,5 секунд
  }
}

btnsContainer.addEventListener('click', (event) => {
  const target = event.target;
  if(target.classList.contains('match-button')){
    playerTurn(target.value);
  }
})

function declareWinner() {
  if (playerMatches % 2 === 0) {
    updateStatus('Вітаємо, ви виграли! &#127942;');
  } else {
    updateStatus('Комп\'ютер виграв! &#128187;');
  }
}