const scoreDisplay = document.getElementById("scoreDisplay");
const resetBtn = document.getElementById("resetBtn");

function updateHome() {
  const state = getState();
  scoreDisplay.textContent = `Current Score: ${state.score}`;

  const allPlayed =
    state.gamesPlayed.wordle &&
    state.gamesPlayed.quiz &&
    state.gamesPlayed.connections;

  if (allPlayed) {
    showFinalResult(state.score);
    document.querySelector(".menu").style.display = "none";
    return;
  }

  document.querySelectorAll(".card").forEach(card => {
    const game = card.dataset.game;
    if (state.gamesPlayed[game]) {
      card.classList.add("disabled");
      card.onclick = e => e.preventDefault();
    }
  });
}

function showFinalResult(score) {
  const finalResult = document.getElementById("finalResult");
  const finalTitle = document.getElementById("finalTitle");
  const finalMessage = document.getElementById("finalMessage");
  const revealBtn = document.getElementById("revealBtn");
  const prizeBox = document.getElementById("prizeBox");
  const prizeText = document.getElementById("prizeText");

  finalResult.style.display = "block";

  let prizeMessage = "";

  if (score >= 90) {
    finalTitle.textContent = "Grand Prize Unlocked 💖";
    finalMessage.textContent = "Incredible performance!";
    prizeMessage = "You get to show me your tiddies!!! 😍";
  }
  else {
    finalTitle.textContent = "Punishment Time 😈";
    finalMessage.textContent = "Better luck next time!";
    prizeMessage = "Punishment: You must show me your tiddies!!! 😄";
  }

  revealBtn.onclick = () => {
    prizeBox.style.display = "block";
    prizeText.textContent = prizeMessage;
    revealBtn.style.display = "none";
  };
}

resetBtn.addEventListener("click", () => {
  if (confirm("Restart your attempt? Score will reset.")) {
    resetState();
    location.reload();
  }
});

updateHome();