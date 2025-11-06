// FLEET ENVIRONMENT
const mySideMyFleet = document.querySelector(".my-side--my-fleet");
const mySideEnemyFleet = document.querySelector(".my-side--enemy-fleet");
const enemySideEnemyFleet = document.querySelector(".enemy-side--enemy-fleet");
const enemySideMyFleet = document.querySelector(".enemy-side--my-fleet");
const seaContainers = document.querySelectorAll(".sea-container");
const seas = document.querySelectorAll(".sea");
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const seaFleet = Array.from({ length: 10 }, (_, i) => i + 1);
const startGameBtn1 = document.querySelector(".fleet-1");
const startGameBtn2 = document.querySelector(".fleet-2");
const player1 = document.querySelector(".username-1").textContent;
const player2 = document.querySelector(".username-2").textContent;
const allTimers = [...document.querySelectorAll(".timer-label")];
const waitingForOpponentLabel1 = document.querySelector(".waiting-opponent-1");
const waitingForOpponentLabel2 = document.querySelector(".waiting-opponent-2");
const errorMessage1 = document.querySelector(".error-message-1");
const errorMessage2 = document.querySelector(".error-message-2");

let createMyShips = [
  [["d1"], ["e1"].length],
  [["f1"], ["e1"].length],
  [["h1"], ["e1"].length],
  [["j1"], ["e1"].length],

  [["a5", "b5"], ["e6", "e7"].length],
  [["d5", "e5"], ["e6", "e7"].length],
  [["b3", "c3", "d3"], ["J4", "I4", "h4"].length],
  [["c7", "d7", "e7"], ["J4", "I4", "h4"].length],
  [["g4", "h4"], ["e6", "e7"].length],

  [["c9", "d9", "e9", "f9"], ["J4", "I4", "h4", "e4"].length],
];

let createEnemyShips = [
  [["a1"], ["d10"].length],
  [["c1"], ["d10"].length],
  [["e1"], ["d10"].length],
  [["a3"], ["d10"].length],

  [["i5", "j5"], ["e6", "e7"].length],
  [["i7", "j7"], ["e6", "e7"].length],
  [["d4", "e4", "f4", "g4"], ["J4", "I4", "h4", "e4"].length],
  [["h2", "i2", "j2"], ["J4", "I4", "h4"].length],
  [["e9", "f9"], ["e6", "e7"].length],
  [["b5", "b6", "b7"], ["J4", "I4", "h4"].length],
];

let mySideMyShips = [];
let enemySideEnemyShips = [];
let mySideEnemyShips = [];
let enemySideMyShips = [];
let bothSideShips = [];

// NOTIFICATION WINDOW

const notificatonWindow1 = document.querySelector(
  ".notification-window.player-1"
);
const notificatonWindow2 = document.querySelector(
  ".notification-window.player-2"
);
const resultsMessage1 = document.querySelector(".results-message");
const resultsMessage2 = document.querySelector(".results-message-2");
const btnCloseNotificationWindow1 = document.querySelector(
  ".close-notification-window"
);
const btnCloseNotificationWindow2 = document.querySelector(
  ".close-notification-window-2"
);
// const overlay = document.querySelector(".overlay");

// MENU BUTTONS
const menuBtnsContainer1 = document.querySelector(".menu-btns-container-1");
const menuBtnsContainer2 = document.querySelector(".menu-btns-container-2");
const playerUsername1 = document.querySelector(".player-username-1");
const playerUsername2 = document.querySelector(".player-username-2");
const newGameBtn1 = document.querySelector(".new-game-btn.player-1");
const newGameBtn2 = document.querySelector(".new-game-btn.player-2");
const changeUsernameBtn1 = document.querySelector(".change-username-btn-1");
const changeUsernameBtn2 = document.querySelector(".change-username-btn-2");

// FILL USERNAME FORM
const username1Input = document.querySelector(".fill-username--player-1");
const username2Input = document.querySelector(".fill-username--player-2");
const inputUsernameLabel2 = document.querySelector(".your-name-2");
const inputUsernameLabel1 = document.querySelector(".your-name-1");
const submitUsername1 = document.querySelector(".submit-username--fleet-1");
const submitUsername2 = document.querySelector(".submit-username--fleet-2");

export {
  bothSideShips,
  mySideMyFleet,
  mySideEnemyFleet,
  enemySideEnemyFleet,
  enemySideMyFleet,
  seas,
  seaContainers,
  notificatonWindow1,
  notificatonWindow2,
  btnCloseNotificationWindow1,
  btnCloseNotificationWindow2,
  newGameBtn1,
  newGameBtn2,
  startGameBtn1,
  startGameBtn2,
  changeUsernameBtn1,
  changeUsernameBtn2,
  username1Input,
  username2Input,
  menuBtnsContainer1,
  menuBtnsContainer2,
  playerUsername1,
  playerUsername2,
  errorMessage1,
  errorMessage2,
  inputUsernameLabel2,
  submitUsername2,
  inputUsernameLabel1,
  submitUsername1,
  letters,
  seaFleet,
  allTimers,
  waitingForOpponentLabel1,
  waitingForOpponentLabel2,
  createMyShips,
  createEnemyShips,
  mySideMyShips,
  enemySideEnemyShips,
  mySideEnemyShips,
  enemySideMyShips,
  resultsMessage1,
  resultsMessage2,
  player1,
  player2,
  // overlay,
};
