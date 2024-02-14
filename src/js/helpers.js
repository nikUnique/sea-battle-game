import {
  enemySideEnemyFleet,
  enemySideMyFleet,
  letters,
  mySideMyFleet,
  notificatonWindow,
  notificatonWindow2,
} from "./globalVars";
import showEndResults from "./showEndResults";
let timer, labelContraryTimer;

export const buildShipBorder = function (borderParts) {
  const ship = borderParts[0];
  const coord = borderParts[1];
  const i = borderParts[2];
  const arr = borderParts[3];
  const addBorder = borderParts[4];
  const color = borderParts[5] && borderParts[5];

  console.log(ship);
  ship.direction === "column"
    ? i === 0 && addBorder("borderTop", coord, color)
    : // 1. Add left to the top cell
      i === 0 && addBorder("borderLeft", coord, color);
  // 2. Add  bottom to the last cell
  ship.direction === "column"
    ? i === arr.length - 1 && addBorder("borderBottom", coord, color)
    : i === arr.length - 1 && addBorder("borderRight", coord, color);

  // 3. Right and left
  ship.direction === "column"
    ? addBorder("borderLeft", coord, color)
    : addBorder("borderTop", coord, color);

  ship.direction === "column"
    ? addBorder("borderRight", coord, color)
    : addBorder("borderBottom", coord, color);
};

export const getSeaOpacityBack = function () {
  [...document.querySelectorAll(".sea")].forEach((sea) => {
    sea.style.opacity = "1";
  });
};

export const closeNotificationWindow = function () {
  notificatonWindow.classList.add("hidden");

  // overlay.classList.add("hidden");
};
export const closeNotificationWindow2 = function () {
  notificatonWindow2.classList.add("hidden");
  // overlay.classList.add("hidden");
};

export const allowForbidClick = function (fleet, state) {
  fleet.style.pointerEvents = state;
};

export const timerClock = function (time, labelTimer) {
  const min = String(Math.trunc(time / 60)).padStart(2, 0);
  const sec = String(Math.trunc(time % 60)).padStart(2, 0);
  labelTimer.textContent = `${min}:${sec}`;
  return `${min}:${sec}`;
};

export const startTimer = function (fleet, newGame = false) {
  // Timer feature
  if (newGame) {
    clearInterval(timer);
    return;
  }
  if (timer) {
    console.log(timer);
    clearInterval(timer);
  }
  const contraryFleet =
    fleet === enemySideMyFleet ? mySideMyFleet : enemySideEnemyFleet;

  const timeLeftLabel = fleet
    .closest(".sea-container")
    .querySelector(".timer-label");
  const timeContraryLeftLabel = contraryFleet
    .closest(".sea-container")
    .querySelector(".timer-label");
  const labelTimer = fleet
    .closest(".sea-container")
    .querySelector(".timer-time");
  timeLeftLabel.style.opacity = "100";
  labelContraryTimer = contraryFleet
    .closest(".sea-container")
    .querySelector(".timer-time");

  timeContraryLeftLabel.style.opacity = "100";
  const tick = function () {
    labelContraryTimer.textContent = timerClock(time, labelTimer);

    if (time === 0) {
      clearInterval(timer);
      timeLeftLabel.style.opacity = "0";

      showEndResults(fleet, true);
    }
    time--;
  };
  let time = 10;
  tick();
  timer = setInterval(tick, 1000);
};

export const selectCellsAround = function (cell) {
  const coordSlice01 = cell.slice(0, 1);
  const coordSlice1 = cell.slice(1);
  const letterAround = letters.indexOf(coordSlice01);

  const previousCell = coordSlice01 + (+coordSlice1 - 1);
  const nextCell = coordSlice01 + (+coordSlice1 + 1);

  const rightCell = letters[letterAround + 1] + coordSlice1;

  const leftCell = letters[letterAround - 1] + coordSlice1;
  return {
    coordSlice01,
    coordSlice1,
    letterAround,
    previousCell,
    nextCell,
    rightCell,
    leftCell,
  };
};
