const DEFAULT_STATE = {
  score: 0,
  gamesPlayed: {
    wordle: false,
    quiz: false,
    connections: false
  }
};

function getState() {
  const state = localStorage.getItem("valentineState");
  return state ? JSON.parse(state) : { ...DEFAULT_STATE };
}

function saveState(state) {
  localStorage.setItem("valentineState", JSON.stringify(state));
}

function resetState() {
  localStorage.removeItem("valentineState");
}

function addScore(points) {
  const state = getState();
  state.score += points;
  saveState(state);
}

function markGamePlayed(game) {
  const state = getState();
  state.gamesPlayed[game] = true;
  saveState(state);
}