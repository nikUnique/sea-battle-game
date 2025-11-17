import { SECONDS_IN_MINUTE, TIME_LENGTHS } from "./config";

import { playingCheck } from "./gameStartControl";

import {
  changeUsernameBtn1,
  changeUsernameBtn2,
  enemySideEnemyFleet,
  enemySideMyFleet,
  inputUsernameLabel1,
  inputUsernameLabel2,
  letters,
  mySideEnemyFleet,
  mySideMyFleet,
  newGameBtn1,
  newGameBtn2,
  notificatonWindow1,
  notificatonWindow2,
  playerUsername1,
  playerUsername2,
  submitUsername1,
  submitUsername2,
  username1Input,
  username2Input,
} from "./globalVarsPause";

import showEndResults from "./showEndResults";

let timer;
export { timer };

export const buildShipBorder = function (borderParts) {
  const ship = borderParts[0];
  const coord = borderParts[1];
  const i = borderParts[2];
  const arr = borderParts[3];
  const addBorder = borderParts[4];
  const color = borderParts[5] && borderParts[5];

  console.log(ship);

  ship.direction === "column"
    ? // Add top to the first cell
      i === 0 && addBorder("borderTop", coord, color)
    : // Add left to the first cell
      i === 0 && addBorder("borderLeft", coord, color);

  ship.direction === "column"
    ? // Add  bottom to the last cell
      i === arr.length - 1 && addBorder("borderBottom", coord, color)
    : // Add right to the last cell
      i === arr.length - 1 && addBorder("borderRight", coord, color);

  ship.direction === "column"
    ? // Add left
      addBorder("borderLeft", coord, color)
    : // Add top
      addBorder("borderTop", coord, color);

  ship.direction === "column"
    ? // Add right
      addBorder("borderRight", coord, color)
    : // Add bottom
      addBorder("borderBottom", coord, color);
};

export const getSeaOpacityBack = function () {
  [...document.querySelectorAll(".sea")].forEach((sea) => {
    sea.style.opacity = "1";
  });
};

export const closeNotificationWindow1 = function () {
  notificatonWindow1.classList.add("hidden");

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
  // Define number of minutes
  const min = String(Math.trunc(time / SECONDS_IN_MINUTE)).padStart(2, 0);

  // Define number of seconds
  const sec = String(Math.trunc(time % SECONDS_IN_MINUTE)).padStart(2, 0);

  labelTimer.textContent = `${min}:${sec}`;
  return `${min}:${sec}`;
};

export const startTimer = function (fleet, newGame = false) {
  // When new game starts timer stops
  if (newGame) {
    clearInterval(timer);
    return;
  }

  // Every time when turn changes I need to clear the previous timer because it won't go by itself
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

  const labelContraryTimer = contraryFleet
    .closest(".sea-container")
    .querySelector(".timer-time");

  timeContraryLeftLabel.style.opacity = "100";
  const tick = function () {
    labelContraryTimer.textContent = timerClock(time, labelTimer);

    if (time === 0) {
      console.log(playingCheck.playing, "play", time);

      const fleetSide =
        fleet === mySideEnemyFleet ? enemySideMyFleet : mySideEnemyFleet;

      clearInterval(timer);
      timeLeftLabel.style.opacity = "0";
      console.log(fleet, "fleet");
      showEndResults(fleetSide, true);
    }
    time--;
  };

  let time = TIME_LENGTHS.shotTime;
  tick();
  // The function is called every second
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

const toggleUsernameForm = function (fleet, display) {
  const fleetIsMySideMyFleet = fleet === mySideMyFleet;

  // Shows and hides items when it's required
  (fleetIsMySideMyFleet
    ? [username1Input, inputUsernameLabel1, submitUsername1]
    : [username2Input, inputUsernameLabel2, submitUsername2]
  ).forEach((item) => {
    console.log(item.style.display);
    item.style.display = display;
  });

  const changeDisplayState = function (state, toggleMethod) {
    if (fleetIsMySideMyFleet) {
      changeUsernameBtn1.style.display = state;
      newGameBtn1.style.display = state;

      playerUsername1?.classList[toggleMethod]("data");
    }

    if (!fleetIsMySideMyFleet) {
      changeUsernameBtn2.style.display = state;
      newGameBtn2.style.display = state;

      playerUsername2?.classList[toggleMethod]("data");
    }
  };

  if (display !== "flex") {
    changeDisplayState("flex", "add");
  }

  if (display === "flex") {
    changeDisplayState("none", "remove");
  }
};

export const openUsernameForm = function (fleet, display) {
  toggleUsernameForm(fleet, display);
};

export const closeUsernameForm = function (fleet, display) {
  toggleUsernameForm(fleet, display);
};

export function sleep(timeInMilliseconds) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, timeInMilliseconds);
  });
}
