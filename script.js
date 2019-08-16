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

function displayWinner(playerPoints, computerPoints) {
  if (playerPoints > computerPoints) {
    alert('Congratulation!\nYou win the game!');
  } else if (playerPoints < computerPoints) {
    alert('Sorry(\nComputer wins the game :3');
  } else {
    alert("Whaoh!\nIt's a Tied :3");
  }
}

// V2

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
  }
};

function playerPlay() {
  return document.querySelector('div.pl.choice > div').dataset.choice;
}

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
}

function unFreezeButton(btn) {
  btn.classList.remove('disable-button');
}

const startNewGameHandler = (e) => {
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
};

const choicesPanel = document.querySelector('div.choices-container');

const startBtn = document.querySelector('div.btn-start.button');
const endBtn = document.querySelector('div.btn-end.button');

function game() {
  startBtn.addEventListener('click', startNewGameHandler);
  let roundResult = playRound(playerPlay(), computerPlay());

  document.querySelector(
    'div.game-turn-container > p'
  ).textContent = roundResult;
  // let playerPoints = 0;
  // let computerPoints = 0;
  // for (let i = 0; i < 5; i++) {
  //   console.log(roundResult);
  //   if (roundResult.includes('Win')) {
  //     playerPoints++;
  //   } else computerPoints++;
  // }
  // displayWinner(playerPoints, computerPoints);
}
