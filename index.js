// window.addEventListener("deviceorientation", onDeviceMove);

// function onDeviceMove(event) {
//   console.log(event);
// }

// function animate() {
//   //    console.log(Date.now())
//   // requestAnimationFrame(animate)
// }

// requestAnimationFrame(animate);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Timer - https://stackoverflow.com/questions/45049175/countdown-from-60-to-0-in-javascript-and-loop

//mange buttons - https://www.youtube.com/watch?v=kX18GQurDQg

//transorm - https://developer.mozilla.org/en-US/docs/Web/CSS/transform

//getBoundingClientRect - https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { btnStart, btnStop } from "./module.js";

//Init
const boardGame = document.querySelector(".game-board");

let score = document.querySelector(".score");
let hightScore = document.querySelector(".highest-score");
let timer = document.querySelector(".timer");
let container = document.querySelector(".container");
let hole;
let ball = document.querySelector(".ball");

let isFalse = false; //Flaga
let intervalRef; //from setInterval

addEventListener("deviceorientation", onDeviceMove); //thanks to i can menage to a ball

//localStorage.clear();

let getHighScoreFromStorage = localStorage.getItem("highScore");

if (getHighScoreFromStorage) {
  hightScore.textContent = getHighScoreFromStorage;
}

//Highest score
function dispalyHighestScore() {
  let currentScore = parseInt(score.textContent);
  let currentHighScore = parseInt(hightScore.textContent);

  if (currentScore > currentHighScore) {
    currentHighScore = currentScore;
    localStorage.setItem("highScore", currentHighScore);
    hightScore.textContent = currentHighScore;
  }
}

//BtnStart
btnStart.addEventListener("click", () => {
  if (!isFalse) {
    isFalse = true;

    let incomeTicker = 61;

    holeAim();
    displayTimer(incomeTicker);
  }
});

//BtnStop
btnStop.addEventListener("click", () => {
  if (isFalse) {
    isFalse = false;

    holeAim();
    displayTimerStop();

    dispalyHighestScore();
  }
});

//Hole
function holeAim() {
  hole = document.createElement("div");
  hole.classList.add("hole");
  hole.textContent = "Aim";
  hole.style.visibility = "visible";
  container.appendChild(hole);
}

//Chceck
function checkBallInHole() {
  const ballRect = ball.getBoundingClientRect(); //get position ball
  const holeRect = hole.getBoundingClientRect(); //get position hole

  if (
    ballRect.top >= holeRect.top &&
    ballRect.bottom <= holeRect.bottom &&
    ballRect.left >= holeRect.left &&
    ballRect.right <= holeRect.right
  ) {
    alert("Done!");
    refresh();
    dispalyScore();
  }
}

//Move Ball
function onDeviceMove(event) {
  let x = event.gamma; // - отримує значення кута орієнтації пристрою вздовж вісі X (горизонтальна орієнтація). ->
  //let x = event.absolute === true ? event.alpha : event.gamma;
  let y = event.beta; // - отримує значення кута орієнтації пристрою вздовж вісі Y (вертикальна орієнтація). (w gore)
  console.log(event);

  ball.style.transform = `translate(${x}px,${y}px)`; //change position, my object 'ball' (only gamma & beta)

  checkBallInHole();
}

//Start Timer from 60  till 0 sec
function displayTimer(incomeTicker) {
  intervalRef = setInterval(function () {
    if (incomeTicker > 0) incomeTicker--;
    timer.innerHTML = incomeTicker + " seconds";
    if (incomeTicker <= 0) {
      incomeTicker = clearInterval(intervalRef);
      isFalse = false;
      alert("The end!");
      refresh();
    }
  }, 1000);
}

//Stop timer and return me on 60 sec
function displayTimerStop() {
  clearInterval(intervalRef);
  alert("The end!");
  refresh();

  dispalyHighestScore();
}

//Refresh
function refresh() {
  ball.style.transform = "translate(0px, 0px)";
}

//Score
function dispalyScore() {
  let scoreCount = parseInt(score.textContent, 10);
  scoreCount++;
  score.textContent = scoreCount;

  dispalyHighestScore();
}
