const textDisplay = document.getElementById("textDisplay");
const textInput = document.getElementById("textInput");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const countdownEl = document.getElementById("countdown");

const finalResultsModal = document.getElementById("finalResults");
const finalTimeEl = document.getElementById("finalTime");
const finalWPMEl = document.getElementById("finalWPM");
const finalAccuracyEl = document.getElementById("finalAccuracy");
const closeModalBtn = document.getElementById("closeModal");

let timer = null;
let time = 0;
let started = false;
let currentText = "";
let totalTyped = 0;
let correctTyped = 0;

// Sample texts
const texts = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect when it comes to typing speed.",
  "JavaScript is a versatile programming language.",
  "Typing games are fun and educational.",
  "Always focus on accuracy first, then speed."
];

// --------------------------
// Helper Functions
// --------------------------
function chooseRandomText() {
  const randomIndex = Math.floor(Math.random() * texts.length);
  currentText = texts[randomIndex];
  renderTextDisplay();
}

function renderTextDisplay() {
  textDisplay.innerHTML = "";
  const typed = textInput.value;
  for (let i = 0; i < currentText.length; i++) {
    const span = document.createElement("span");
    span.textContent = currentText[i];
    if (typed[i] == null) {
      // Not typed yet
    } else if (typed[i] === currentText[i]) {
      span.classList.add("correct");
    } else {
      span.classList.add("incorrect");
    }
    textDisplay.appendChild(span);
  }
}

function startTimer() {
  timer = setInterval(() => {
    time++;
    timeEl.textContent = time;
    calculateResults();
  }, 1000);
}

function calculateResults() {
  const typed = textInput.value;
  totalTyped = typed.length;

  // Count correct characters
  correctTyped = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === currentText[i]) correctTyped++;
  }

  // Accuracy
  const accuracy = totalTyped === 0 ? 0 : ((correctTyped / totalTyped) * 100).toFixed(2);
  accuracyEl.textContent = accuracy;

  // Words per minute
  const wordsTyped = typed.split(" ").length;
  const wpm = time === 0 ? 0 : Math.round((wordsTyped / time) * 60);
  wpmEl.textContent = wpm;

  // Check if finished
  if (typed === currentText) {
    endTest();
  }

  renderTextDisplay();
}

function resetTest() {
  clearInterval(timer);
  time = 0;
  started = false;
  textInput.value = "";
  textInput.disabled = true;
  timeEl.textContent = "0";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "0";
  countdownEl.style.display = "none";
  chooseRandomText();
}

function endTest() {
  clearInterval(timer);
  textInput.disabled = true;
  finalTimeEl.textContent = time;
  finalWPMEl.textContent = wpmEl.textContent;
  finalAccuracyEl.textContent = accuracyEl.textContent;
  finalResultsModal.style.display = "flex";
}

// Countdown before start

function startCountdown() {
  let count = 3;
  countdownEl.textContent = count;
  countdownEl.style.display = "block";
  textInput.disabled = true;

  const countdownTimer = setInterval(() => {
    count--;
    if (count <= 0) {
      clearInterval(countdownTimer);
      countdownEl.style.display = "none";
      textInput.disabled = false;
      textInput.focus();
      startTimer();
      started = true;
    } else {
      countdownEl.textContent = count;
    }
  }, 1000);
}

// Event Listeners

startBtn.addEventListener("click", () => {
  if (!started) {
    chooseRandomText();
    startCountdown();
  }
});
resetBtn.addEventListener("click", resetTest);
textInput.addEventListener("input", calculateResults);
closeModalBtn.addEventListener("click", () => finalResultsModal.style.display = "none");