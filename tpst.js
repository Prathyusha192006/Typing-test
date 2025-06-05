const quotes = [
  "Practice makes perfect when it comes to typing speed.",
  "The quick brown fox jumps over the lazy dog.",
  "Fast fingers and clear mind win typing races.",
  "Consistency beats intensity every time.",
  "Typing tests help build muscle memory."
];

let timer = 60;
let interval;
let start = false;
let quote = "";

const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const cpmEl = document.getElementById("cpm");
const accuracyEl = document.getElementById("accuracy");
const progressBar = document.getElementById("progress");
const restartBtn = document.getElementById("restart");
const endMessage = document.getElementById("endMessage");

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function renderQuote() {
  quote = getRandomQuote();
  quoteDisplay.innerHTML = "";
  quote.split("").forEach(char => {
    const span = document.createElement("span");
    span.textContent = char;
    quoteDisplay.appendChild(span);
  });
  quoteInput.value = "";
}

function updateProgress() {
  const percentage = (timer / 60) * 100;
  progressBar.style.width = `${percentage}%`;
}

function startTest() {
  if (start) return;
  start = true;

  interval = setInterval(() => {
    timer--;
    updateProgress();
    timerEl.textContent = timer;
    if (timer === 0) {
      clearInterval(interval);
      quoteInput.disabled = true;
      endMessage.textContent = "⏰ Time's up! Great job!";
    }
  }, 1000);
}

function calculateStats() {
  const input = quoteInput.value;
  const quoteChars = quote.split("");
  const inputChars = input.split("");

  let correct = 0;

  quoteDisplay.querySelectorAll("span").forEach((span, i) => {
    const char = inputChars[i];
    if (char == null) {
      span.className = "";
    } else if (char === span.textContent) {
      span.className = "correct";
      correct++;
    } else {
      span.className = "incorrect";
    }
  });

  const words = input.trim().split(/\s+/).length;
  const cpm = input.length;
  const wpm = Math.round((words / (60 - timer)) * 60) || 0;
  const accuracy = input.length > 0 ? Math.round((correct / input.length) * 100) : 100;

  wpmEl.textContent = wpm;
  cpmEl.textContent = cpm;
  accuracyEl.textContent = accuracy + "%";
}

quoteInput.addEventListener("input", () => {
  if (!start) startTest();
  calculateStats();
});

restartBtn.addEventListener("click", () => {
  clearInterval(interval);
  timer = 60;
  start = false;
  quoteInput.disabled = false;
  timerEl.textContent = timer;
  endMessage.textContent = "";
  wpmEl.textContent = "0";
  cpmEl.textContent = "0";
  accuracyEl.textContent = "100%";
  updateProgress();
  renderQuote();
});

document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

window.onload = () => {
  renderQuote();
  updateProgress();
};
