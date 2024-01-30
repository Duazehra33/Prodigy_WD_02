// Select elements from the HTML
const timeDisplay = document.querySelector(".time-display");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resetButton = document.querySelector("#reset");
const lapButton = document.querySelector("#lap"); // Added lapButton
const lapTimesContainer = document.querySelector(".lap-times");

// Variables for timekeeping
let startTime, endTime, elapsedTime = 0;
let intervalId;
let lapTimes = [];

// Function to start the stopwatch
function startStopwatch() {
  startTime = performance.now();
  intervalId = setInterval(updateTime, 10); // Update time every 10ms
}

// Function to stop the stopwatch
function stopStopwatch() {
  clearInterval(intervalId);
  endTime = performance.now();
  elapsedTime += endTime - startTime;
}

// Function to reset the stopwatch
function resetStopwatch() {
  clearInterval(intervalId);
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00.00";
  lapTimes = [];
  lapTimesContainer.textContent = "";
}

// Function to update the displayed time
function updateTime() {
  const currentTime = performance.now();
  const formattedTime = formatTime(currentTime - startTime + elapsedTime);
  timeDisplay.textContent = formattedTime;
}

// Function to format time as HH:MM:SS.ms
function formatTime(timeInMilliseconds) {
  const milliseconds = Math.floor(timeInMilliseconds % 1000);
  const seconds = Math.floor((timeInMilliseconds / 1000) % 60);
  const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60);
  const hours = Math.floor(timeInMilliseconds / (1000 * 60 * 60));

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

// Function to pad numbers with leading zeros
function pad(number, length = 2) {
  return number.toString().padStart(length, "0");
}

// Add event listeners to buttons
startButton.addEventListener("click", startStopwatch);
stopButton.addEventListener("click", stopStopwatch);
resetButton.addEventListener("click", resetStopwatch);

// Add functionality for lap times
lapButton.addEventListener("click", () => {
  const lapTime = timeDisplay.textContent;
  lapTimes.push(lapTime);
  lapTimesContainer.innerHTML = lapTimes.map((lap, index) => `<div>Lap ${index + 1}: ${lap}</div>`).join("");
});
