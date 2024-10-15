let matches = 25; // Початкова кількість сірників
let playerMatches = 0;
let computerMatches = 0;
const status = document.getElementById('status');
const compStat = document.querySelector('.stats-computer p')
const playerStat = document.querySelector('.stats-player p')
const btnsContainer = document.querySelector('.buttons-container');
const switchDiv = document.querySelector('.switch-wrap');

function updateStatus(message) {
  status.innerHTML = message;
  compStat.innerHTML = computerMatches;
  playerStat.innerHTML = playerMatches;
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
  updateStatus(`Нова Гра`);
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
    setTimeout(computerTurn, 1000); // Хід комп'ютера через 1 секунду
  }
}

btnsContainer.addEventListener('click', (event) => {
  const target = event.target;
  if(target.classList.contains('match-button')){
    playerTurn(+target.value);
  }
})

const playerSwitch = document.getElementById('player_switch');
const computerSwitch = document.getElementById('computer_switch');

// switch
switchDiv.addEventListener('click', (event) => {
  const target = event.target;
  if(target.tagName === 'BUTTON' && !target.classList.contains('active')){
    if(target == playerSwitch){
      computerSwitch.classList.remove('active');
      playerSwitch.classList.add('active');
    }
    else if(target === computerSwitch){
      playerSwitch.classList.remove('active');
      computerSwitch.classList.add('active');
      disableButtons(btnsContainer);
      setTimeout(computerTurn, 2000);
    }
    setTimeout(reset, 1000);
  }
})

function declareWinner() {
  if (playerMatches % 2 === 0) {
    updateStatus('Вітаємо, ви виграли! &#127942;');
  } else {
    updateStatus('Комп\'ютер виграв! &#128187;');
  }
  setTimeout(reset, 3000);
}