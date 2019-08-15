function computerPlay() {
  const randomSelection = getRandomInt(4);
  return randomSelection == 0
    ? 'rock'
    : randomSelection == 1
    ? 'paper'
    : 'scissors';
}

function playerPlay() {
  let playerSelection;
  do {
    playerSelection = prompt('Choose: rock | paper | scissors');
  } while (!validateSelection(playerSelection));
  return playerSelection.toLowerCase();
}

function validateSelection(selection) {
  if (selection) {
    let insensitiveSelection = selection.toLowerCase();
    if (
      insensitiveSelection == 'rock' ||
      insensitiveSelection === 'paper' ||
      insensitiveSelection === 'scissors'
    )
      return true;
  }
  return false;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function playRound(playerSelection, computerSelection) {
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

function game() {
  let playerPoints = 0;
  let computerPoints = 0;

  for (let i = 0; i < 5; i++) {
    let roundResult = playRound(playerPlay(), computerPlay());
    console.log(roundResult);
    if (roundResult.includes('Win')) {
      playerPoints++;
    } else computerPoints++;
  }

  displayWinner(playerPoints, computerPoints);
}
