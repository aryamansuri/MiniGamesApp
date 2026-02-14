console.log("NEW WORDLE VERSION LOADED");
let guessesUsed = 0;

const WORDS = [
  "AFFUU",
  "ARUUU",
  "CZARU",
  "BOOBS",
  "SIKKU",
  "LUKAA"
];

const secretWord = WORDS[Math.floor(Math.random() * WORDS.length)];
const maxGuesses = 6;

let currentRow = 0;

const grid = document.getElementById("grid");
const input = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

/* Create empty grid */
for (let i = 0; i < maxGuesses * 5; i++) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  grid.appendChild(tile);
}

submitBtn.addEventListener("click", handleGuess);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleGuess();
});

function handleGuess() {
  if (submitBtn.disabled) return;

  const guess = input.value.toUpperCase();

  if (guess.length !== 5) {
    message.textContent = "Please enter a 5-letter word.";
    return;
  }

  guessesUsed++;
  const startIndex = currentRow * 5;

  const tiles = [];
  const tileStatus = Array(5).fill("absent");

  // Count letters in secret word
  const letterCounts = {};
  for (const ch of secretWord) {
    letterCounts[ch] = (letterCounts[ch] || 0) + 1;
  }

  // Fill tiles and mark greens first
  for (let i = 0; i < 5; i++) {
    const tile = grid.children[startIndex + i];
    tile.textContent = guess[i];
    tiles.push(tile);

    if (guess[i] === secretWord[i]) {
      tileStatus[i] = "correct";       // green
      letterCounts[guess[i]]--;       // remove from available letters
    }
  }

  // Mark yellows (present but wrong position)
  for (let i = 0; i < 5; i++) {
    if (tileStatus[i] === "correct") continue;

    if (letterCounts[guess[i]] > 0) {
      tileStatus[i] = "present";       // yellow
      letterCounts[guess[i]]--;        // use up one occurrence
    }
  }

  // Apply CSS classes to tiles
  for (let i = 0; i < 5; i++) {
    tiles[i].classList.add(tileStatus[i]);
  }

  // Check if guess is correct
  if (guess === secretWord) {
    const wordlePoints = [50, 45, 40, 30, 20, 10];
    const pointsEarned = wordlePoints[guessesUsed - 1] || 0;

    addScore(pointsEarned);
    markGamePlayed("wordle");

    message.textContent = `You earned ${pointsEarned} points ❤️`;
    submitBtn.disabled = true;
    input.disabled = true;

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 2000);
    return;
  }

  currentRow++;
  input.value = "";

  if (currentRow === maxGuesses) {
    message.textContent = `The word was ${secretWord}`;
    submitBtn.disabled = true;
    input.disabled = true;
    markGamePlayed("wordle");

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 2000);
  }
}