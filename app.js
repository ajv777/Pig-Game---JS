// General variables
var scores, roundScore, activePlayer, gamePlaying, lastDice1, lastDice2;

// Inicialize the game
initGame();

document.querySelector(".btn-roll").addEventListener("click", function () {
  // 0. gamePlaying (true or false). It´s false when a player wins
  if (gamePlaying) {
    // 1. Random number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    showDices();
    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-1").src = "dice-" + dice2 + ".png";

    //3. Update the round score IF the rolled number was NOT a 1
    if (dice1 !== 1 && dice2 !== 1) {
      //Add score
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update the user interface
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // Change the final score
    let input = document.querySelector(".final-score").value;
    let finalScore;
    if (input) {
      finalScore = input;
    } else {
      finalScore = 100;
    }
    if (scores[activePlayer] >= input) {
      // Check if player won the game
      document.querySelector("#name-" + activePlayer).textContent = "Winner!!";
      hiceDices();
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      // Stop the game
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

// Next player
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.add("active");

  hiceDices();
}

// New game
document.querySelector(".btn-new").addEventListener("click", initGame);

function initGame() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  hiceDices();

  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
}

// Hide dices
function hiceDices() {
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

// Show dices
function showDices() {
  document.getElementById("dice-1").style.display = "block";
  document.getElementById("dice-2").style.display = "block";
}
