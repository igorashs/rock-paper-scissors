if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then((reg) => {
        console.log('Service worker is Registered', reg);
      })
      .catch((regErr) => {
        console.log('Service worker is NOT Registered', regErr);
      });
  });
}

function computerPlay() {
  const randomSelection = getRandomInt(4);
  const choice =
    randomSelection == 0 ? 'rock' : randomSelection == 1 ? 'paper' : 'scissors';
  appendSelection(choice, 'pc');
  return choice;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function playRound(playerSelection, computerSelection) {
  // goooood
  if (playerSelection === computerSelection) {
    return 'The round is Tied!';
  }

  if (playerSelection === 'rock') {
    if (computerSelection === 'paper') {
      return 'You Lose! Paper beats Rock';
    } else {
      return 'You Win! Rock beats scissors';
    }
  }

  if (playerSelection === 'paper') {
    if (computerSelection === 'rock') {
      return 'You Win! Paper beats Rock';
    } else {
      return 'You Lose! scissors beats paper';
    }
  }

  if (playerSelection === 'scissors') {
    if (computerSelection === 'paper') {
      return 'You Win! scissors beats paper';
    } else {
      return 'You Lose! Rock beats scissors';
    }
  }
}

function appendSelection(choice, currentPlayer) {
  const selection = document
    .querySelector(
      `body > div > div.control > div.choices-container > div[data-choice="${choice}"] > div`
    )
    .cloneNode();
  document
    .querySelector(
      `body > div > div.display > div.game-turn-container > div.${currentPlayer}.choice`
    )
    .appendChild(selection);

  selection.classList.toggle('hidden');
  setTimeout(() => {
    selection.classList.toggle('hidden');
    setTimeout(() => {
      if (currentPlayer == 'pl') selection.classList.toggle('appear');
      else selection.classList.toggle('appear-reverse');
    }, 500);
  }, 500);
}

const selectHandler = (e) => {
  const choice = e.target.dataset.choice;
  if (choice) {
    appendSelection(choice, 'pl');
    freezeChoices(e.currentTarget);
    freezeButton(endBtn);
    setTimeout(() => {
      playGame(choice, computerPlay());
    }, 1000);
  }
};

function freezeChoices(choices) {
  [...choices.children].forEach((choice) => {
    choice.classList.add('disable-choice');
  });
  choices.removeEventListener('click', selectHandler);
}

function unFreezeChoices(choices) {
  [...choices.children].forEach((choice) => {
    choice.classList.remove('disable-choice');
  });
  choices.addEventListener('click', selectHandler);
}

function freezeButton(btn) {
  btn.classList.add('disable-button');
  if (btn.textContent == 'New Game') {
    btn.removeEventListener('click', startNewGameHandler);
  } else {
    btn.removeEventListener('click', endGameHandler);
  }
}

function unFreezeButton(btn) {
  btn.classList.remove('disable-button');
  if (btn.textContent == 'New Game') {
    btn.addEventListener('click', startNewGameHandler);
  } else {
    btn.addEventListener('click', endGameHandler);
  }
}

const startNewGameHandler = (e) => {
  roundPara.textContent = 'Round ';
  rd.textContent = '1';
  roundPara.appendChild(rd);
  gameTurn.textContent = 'Player turn! select your choice...';
  unFreezeChoices(choicesPanel);
  freezeButton(startBtn);
  unFreezeButton(endBtn);
  startBtn.removeEventListener('click', startNewGameHandler);
  endBtn.addEventListener('click', endGameHandler);
};

const endGameHandler = (e) => {
  freezeChoices(choicesPanel);
  freezeButton(endBtn);
  unFreezeButton(startBtn);
  endBtn.removeEventListener('click', endGameHandler);
  startBtn.addEventListener('click', startNewGameHandler);
  roundPara.textContent = 'R P S ';
  gameTurn.textContent = 'Start a New Game!';
  resetGame();
};

const choicesPanel = document.querySelector('div.choices-container');

const rd = document.querySelector('#round').cloneNode();
const roundPara = document.querySelector('div.round-count-container > p');
const gameTurn = document.querySelector('div.game-turn-container > p');

const startBtn = document.querySelector('div.btn-start.button');
const endBtn = document.querySelector('div.btn-end.button');

startBtn.addEventListener('click', startNewGameHandler);

let playerPoints = 0;
let computerPoints = 0;
let round = 1;

function playGame(playerChoice, computerChoice) {
  gameTurn.textContent = '........';
  let roundResult = playRound(playerChoice, computerChoice);
  setTimeout(() => increasePoints(roundResult), 3000);

  setTimeout(() => calculateProgress(roundResult), 3000);

  setTimeout(clearDisplay, 5 * 1000);
}

function resetGame() {
  playerPoints = 0;
  computerPoints = 0;
  round = 1;
  freezeChoices(choicesPanel);
  unFreezeButton(startBtn);
  freezeButton(endBtn);
  startBtn.addEventListener('click', startNewGameHandler);
  updatePoints();
  updateRoundCounter();
}

function playNextRound() {
  setTimeout(
    () => (gameTurn.textContent = 'Player turn! select your choice...'),
    2000
  );
}

function clearDisplay() {
  document.querySelector('div.pl.choice > div').remove();
  document.querySelector('div.pc.choice > div').remove();
}

function updateRoundCounter() {
  rd.textContent = round;
}

function updatePoints() {
  let pc = document.querySelector('#pc-sp');
  let pl = document.querySelector('#pl-sp');

  pc.textContent = computerPoints;
  pl.textContent = playerPoints;
}

function increasePoints(result) {
  if (result.includes('Win')) {
    playerPoints++;
  } else if (result.includes('Lose')) computerPoints++;
  else {
    playerPoints++;
    computerPoints++;
  }
  round++;
}

function calculateProgress(result) {
  updatePoints();
  setTimeout(updateRoundCounter, 2000);
  if (round > 5) {
    let winner = "It's a Tied :3";
    if (playerPoints > computerPoints) {
      winner = 'Congratulation!\nYou win the game!';
    } else {
      winner = 'Sorry(\nComputer wins the game :3';
    }
    gameTurn.textContent = winner;
    roundPara.textContent = 'R P S ';
    setTimeout(resetGame, 2000);
    return;
  }
  setTimeout(() => {
    unFreezeChoices(choicesPanel);
    unFreezeButton(endBtn);
  }, 2000);
  gameTurn.textContent = result;
  playNextRound();
}
