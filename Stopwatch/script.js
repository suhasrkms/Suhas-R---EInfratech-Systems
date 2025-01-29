let timer;
let isRunning = false;
let mseconds = 0,
  seconds = 0,
  minutes = 0,
  hours = 0;

const display = {
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  mseconds: document.getElementById("mseconds"),
};

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("stopBtn").addEventListener("click", stopTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;
    timer = setInterval(incrementTime, 10);
  }
}

function stopTimer() {
  isRunning = false;
  document.getElementById("stopBtn").disabled = true;
  document.getElementById("startBtn").disabled = false;
  clearInterval(timer);
}

function resetTimer() {
  stopTimer();
  mseconds = seconds = minutes = hours = 0;
  updateDisplay();
}

function incrementTime() {
  mseconds++;
  if (mseconds === 100) {
    mseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  updateDisplay();
}

function updateDisplay() {
  display.mseconds.textContent = pad(mseconds);
  display.seconds.textContent = pad(seconds);
  display.minutes.textContent = pad(minutes);
  display.hours.textContent = pad(hours);
}

function pad(number) {
  return number.toString().padStart(2, "0");
}
