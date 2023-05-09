"use strict";
const grid = document.querySelector(".grid");
let shooterPosition = 202;
let direction = 1;

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

//Drawing aliens
function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    square[alienInvaders[i]].classList.add("alien");
  }
}
function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    square[alienInvaders[i]].classList.remove("alien");
  }
}

//moving of Aliens
function moveAlien() {
  const leftEdge = alienInvaders[0] % width !== 0;
  const rightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;
  remove();
  if (rightEdge)
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += direction;
    }
  draw();
}
setInterval(moveAlien, 500);
