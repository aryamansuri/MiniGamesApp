const QUESTIONS = [
  {
    question: "Where did we first start talking?",
    options: ["Instagram", "Hinge", "Library", "Cafe"],
    answer: 1
  },
  {
    question: "Who sent the like?",
    options: ["Aff", "Aru"],
    answer: 0
  },
  {
    question: "How many dates did we go on before becoming official?",
    options: ["1", "2", "3", "4+"],
    answer: 3
  },
  {
    question: "What was I talking about before I held your hand for the first time?",
    options: ["Moon phases", "My penis", "Gambling addiction", "The Future"],
    answer: 0
  },
  {
    question: "What was the first movie we watched together at the theater?",
    options: ["Superboys of Malegaon", "Uncut Gems", "The Housemaid", "Japanese porno"],
    answer: 0
  },
];

let currentQuestion = 0;
let quizScore = 0;

const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const progress = document.getElementById("progress");

function loadQuestion() {
  const q = QUESTIONS[currentQuestion];

  questionText.textContent = q.question;
  optionsDiv.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = option;

    btn.onclick = () => selectAnswer(index);

    optionsDiv.appendChild(btn);
  });

  progress.textContent = `Question ${currentQuestion + 1} of ${QUESTIONS.length}`;
}

function selectAnswer(index) {
  const buttons = document.querySelectorAll(".option-btn");
  const correctIndex = QUESTIONS[currentQuestion].answer;

  buttons.forEach((btn, i) => {
    btn.disabled = true;

    if (i === correctIndex) {
      btn.classList.add("correct");
    }

    if (i === index && i !== correctIndex) {
      btn.classList.add("wrong");
    }
  });

  if (index === correctIndex) {
    quizScore += 10;
  }

  // Create Next button
  const nextBtn = document.createElement("button");
  nextBtn.textContent = currentQuestion === QUESTIONS.length - 1 ? "Finish →" : "Next →";
  nextBtn.classList.add("next-btn");

  nextBtn.onclick = () => {
    currentQuestion++;

    if (currentQuestion === QUESTIONS.length) {
      finishQuiz();
    } else {
      loadQuestion();
    }
  };

  optionsDiv.appendChild(nextBtn);
}

function finishQuiz() {
  addScore(quizScore);
  markGamePlayed("quiz");

  document.querySelector(".container").innerHTML = `
    <h1>You scored ${quizScore} points 💖</h1>
    <p>Returning home...</p>
  `;

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 2000);
}

loadQuestion();