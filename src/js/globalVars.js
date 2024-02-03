const mySideMyFleet = document.querySelector(".my-side--my-fleet");
const mySideEnemyFleet = document.querySelector(".my-side--enemy-fleet");
const enemySideEnemyFleet = document.querySelector(".enemy-side--enemy-fleet");
const enemySideMyFleet = document.querySelector(".enemy-side--my-fleet");
const seas = document.querySelectorAll(".sea");
const notificatonWindow = document.querySelector(".notification-window");
const overlay = document.querySelector(".overlay");
const btnCloseNotificationWindow = document.querySelector(
  ".close-notification-window"
);
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const seaFleet = Array.from({ length: 10 }, (_, i) => i + 1);

let createMyShips = [
  [["e1"], ["e1"].length],
  // [["j1"], ["e1"].length],
  // [["a3"], ["e1"].length],
  // [["h10"], ["e1"].length],

  // [["i7", "j7"], ["e6", "e7"].length],
  // [["a9", "a10"], ["e6", "e7"].length],
  [["b3", "c3", "d3"], ["J4", "I4", "h4"].length],
  [["g4", "h4"], ["e6", "e7"].length],

  // [["c8", "d8", "e8"], ["J4", "I4", "h4"].length],
  [["c9", "d9", "e9", "f9"], ["J4", "I4", "h4", "e4"].length],
];
let createEnemyShips = [
  [["a1"], ["d10"].length],
  // [["c1"], ["d10"].length],
  // [["e1"], ["d10"].length],
  // [["g1"], ["d10"].length],

  // [["i5", "j5"], ["e6", "e7"].length],
  // [["i7", "j7"], ["e6", "e7"].length],
  [["d4", "e4", "f4", "g4"], ["J4", "I4", "h4", "e4"].length],
  [["d2", "e2", "f2"], ["J4", "I4", "h4"].length],
  [["e9", "f9"], ["e6", "e7"].length],
  // [["b4", "c4", "d4"], ["J4", "I4", "h4"].length],
];

let mySideMyShips = [];
let enemySideEnemyShips = [];
let mySideEnemyShips = [];
let enemySideMyShips = [];
let bothSideShips = [];

export {
  bothSideShips,
  mySideMyFleet,
  mySideEnemyFleet,
  enemySideEnemyFleet,
  enemySideMyFleet,
  seas,
  notificatonWindow,
  overlay,
  btnCloseNotificationWindow,
  letters,
  seaFleet,
  createMyShips,
  createEnemyShips,
  mySideMyShips,
  enemySideEnemyShips,
  mySideEnemyShips,
  enemySideMyShips,
};
