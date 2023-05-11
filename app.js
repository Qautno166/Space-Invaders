"use strict";
const grid = document.querySelector(".grid");
const result = document.querySelector(".result");
let shooterPosition = 202;
let direction = 1;
let goingRight = true;
let alienRemoval = [];

const width = 15;
for (let i = 0; i < 225; i++) {
  const squere = document.createElement("div");
  grid.appendChild(squere);
}
const square = Array.from(document.querySelectorAll(".grid div"));

console.log(square);

const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

//Drawing shooter

square[shooterPosition].classList.add("shooter");

//moving shooter
document.addEventListener("keydown", movingShooter);
document.addEventListener("keydown", shooting);
function movingShooter(e) {
  square[shooterPosition].classList.remove("shooter");
  switch (e.key) {
    case "ArrowLeft":
      if (shooterPosition % width !== 0) shooterPosition -= 1;
      break;
    case "ArrowRight":
      if (shooterPosition % width < width - 1) shooterPosition += 1;
      break;
  }
  square[shooterPosition].classList.add("shooter");
}

function shooting(e) {
  let bulletID;
  let bulletStart = shooterPosition;

  function movingBullet() {
    square[bulletStart].classList.remove("bullet");
    bulletStart -= width;
    square[bulletStart].classList.add("bullet");

    if (square[bulletStart].classList.contains("alien")) {
      square[bulletStart].classList.remove("bullet");
      square[bulletStart].classList.remove("alien");
      square[bulletStart].classList.add("boom");

      setTimeout(() => square[bulletStart].classList.remove("boom"), 30);
      clearInterval(bulletID);
      const alienIndex = alienInvaders.indexOf(bulletStart);
      if (alienIndex !== -1) {
        square[bulletStart].classList.remove("bullet");
        square[bulletStart].classList.remove("alien");
        square[bulletStart].classList.add("boom");
        setTimeout(() => square[bulletStart].classList.remove("boom"), 30);

        alienInvaders.splice(alienIndex, 1);
      }
      alienRemoval.push(alienIndex);
      // alienIndex.push(alienRemoval);
      console.log(alienIndex);
      console.log(alienRemoval);
      console.log(alienInvaders);
      // const alienRemove = alienInvaders.indexOf(bulletStart);
      // alienRemoval.push(alienRemove);
    }
  }

  switch (e.key) {
    case " ":
      bulletID = setInterval(movingBullet, 70);
      break;
  }
}

// Drawing aliens
function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!alienRemoval.includes[i]) {
    }
    square[alienInvaders[i]].classList.add("alien");
  }
}
draw();

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    square[alienInvaders[i]].classList.remove("alien");
  }
}

//moving of Aliens
function moveAlien() {
  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;

  remove();
  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }
  if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - 1;
      direction = +1;
      goingRight = true;
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }

  if (square[shooterPosition].classList.contains("alien", "shooter")) {
    console.log("game over");
    clearInterval(time);
    clearInterval(bulletID);
    result.innerHTML = "GAME OVER";
  }
  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders[i] > square.length) {
      console.log("game over");
      clearInterval(time);

      result.innerHTML = "GAME OVER";
    }
  }

  if (alienInvaders.length === 0) {
    console.log("winn");
    result.innerHTML = "You WIN";
  }

  draw();
}

const time = setInterval(moveAlien, 250);
