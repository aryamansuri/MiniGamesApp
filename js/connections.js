let lives = 4;
const livesDisplay = document.getElementById("livesDisplay");

const finishBtn = document.getElementById("finishBtn");
const solvedArea = document.getElementById("solvedArea");

const GROUPS = [
  {
    name: "NAMES I HAVE FOR MY FAVOURITE TITTY OF YOURS",
    words: ["LEFT", "SURI", "BIG BOY", "NOM NOM NOM"]
  },
  {
    name: "THINGS I'VE BROUGHT FOR YOU TO EAT",
    words: ["TIRAMISU", "MOOLI PARANTHA", "DIHH🥀", "PESTO"]
  },
  {
    name: "NICKNAMES FOR OUR CHILD",
    words: ["ALOO", "CZARU", "POTATO", "ANGEL BOY"]
  },
  {
    name: "THINGS THAT MADE ME INSTANTLY ATTRACTED TO YOU",
    words: ["BIG BAMBI EYES", "BEAUTIFUL FACE", "FAT ASS", "HONKA HONKAS"]
  }
];

const ALL_WORDS = GROUPS.flatMap(g => g.words).sort(() => Math.random() - 0.5);

const grid = document.getElementById("grid");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

let selected = [];
let solvedGroups = 0;
let mistakes = 0;

/* Render grid */
ALL_WORDS.forEach(word => {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.textContent = word;

  tile.onclick = () => {
    if (tile.classList.contains("locked")) return;

    tile.classList.toggle("selected");

    if (tile.classList.contains("selected")) {
      selected.push(tile);
    } else {
      selected = selected.filter(t => t !== tile);
    }
  };

  grid.appendChild(tile);
});

/* Submit group */
submitBtn.onclick = () => {
  if (selected.length !== 4) return;

  const selectedWords = selected.map(t => t.textContent);

  const matchedGroup = GROUPS.find(group =>
    group.words.every(w => selectedWords.includes(w))
  );

  if (matchedGroup) {
  // Create solved row
  const row = document.createElement("div");
  row.classList.add("solved-row");

  row.textContent = `${matchedGroup.name}: ${matchedGroup.words.join(", ")}`;
  solvedArea.appendChild(row);

  // Lock and remove tiles from grid
  selected.forEach(t => {
    t.classList.remove("selected");
    t.classList.add("locked");
    grid.removeChild(t);
  });

  message.textContent = `Correct: ${matchedGroup.name}`;
  solvedGroups++;
  } else {
    mistakes++;
    lives--;

    livesDisplay.textContent = `Lives remaining: ${lives}`;
    message.textContent = "Not quite — try again!";

    selected.forEach(t => t.classList.remove("selected"));

    if (lives === 0) {
      message.textContent = "No lives remaining!";
      finishBtn.style.display = "inline-block";
      submitBtn.disabled = true;
    }
  }

  selected = [];

  if (solvedGroups === 4) {
    message.textContent = "All groups solved!";
    finishBtn.style.display = "inline-block";
  }
};

function finishGame() {
  let basePoints = [0, 10, 25, 40, 50][solvedGroups];
  let points = basePoints - mistakes * 2;

  if (points < 0) points = 0;

  addScore(points);
  markGamePlayed("connections");

  window.location.href = "../index.html";
}

finishBtn.onclick = finishGame;