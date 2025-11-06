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
  [["g4", "h4"], ["e6", "e7"].length],

  [["c7", "d7", "e7"], ["J4", "I4", "h4"].length],
  [["c9", "d9", "e9", "f9"], ["J4", "I4", "h4", "e4"].length],
];

let fourCellShip, fourCellShipWithSurroundings;
let threeCellShipOne, threeCellShipOneWithSurroundings;
let threeCellShipTwo, threeCellShipTwoWithSurroundings;
let twoCellShipOne, twoCellShipOneWithSurroundings;
let twoCellShipTwo, twoCellShipTwoWithSurroundings;
let twoCellShipThree, twoCellShipThreeWithSurroundings;

// function createFourCellShip() {
//   const randomNumber = Math.floor(Math.random() * 10) + 1;
//   const randomNumberForLetter = Math.floor(Math.random() * 10);
//   console.log("randomNumberForLetter", randomNumberForLetter);

//   const randomLetter = letters[randomNumberForLetter];
//   const randomCoord = randomLetter + randomNumber;
//   console.log("randomCoord", randomCoord);

//   // Is horizontal or not
//   const isHorizontal = Math.random() < 0.5;
//   console.log("isHorizontalrand", isHorizontal);
//   let secondCoord, thirdCoord, fourthCoord;

//   if (!isHorizontal) {
//     let direction = "top";
//     // Second coord
//     secondCoord =
//       randomNumber - 1 > 0 && letters[randomNumberForLetter] + randomNumber - 1;

//     // Means that there is no right anymore
//     if (!secondCoord) {
//       direction = "bottom";
//       secondCoord = letters[randomNumberForLetter] + (randomNumber + 1);
//       thirdCoord = letters[randomNumberForLetter] + (randomNumber + 2);
//       fourthCoord = letters[randomNumberForLetter] + (randomNumber + 3);
//       // Full 4-cell ship if the direction changed to the left
//     }

//     if (direction === "top" && !thirdCoord) {
//       thirdCoord =
//         randomNumber - 2 > 0 &&
//         letters[randomNumberForLetter] + randomNumber - 2;

//       if (!thirdCoord) {
//         direction = "bottom";
//         thirdCoord = letters[randomNumberForLetter] + (randomNumber + 1);
//         fourthCoord = letters[randomNumberForLetter] + (randomNumber + 2);
//       }
//       // Full 4-cell ship if the direction changed to the left
//     }

//     // --------------------------------

//     if (direction === "top" && !fourthCoord) {
//       fourthCoord =
//         randomNumber - 3 > 0 &&
//         letters[randomNumberForLetter] + randomNumber - 3;

//       if (!fourthCoord) {
//         direction = "bottom";
//         fourthCoord = letters[randomNumberForLetter] + (randomNumber + 1);
//       }
//     }

//     fourCellShip = [randomCoord, secondCoord, thirdCoord, fourthCoord].sort();
//     fourCellShipWithSurroundings = [
//       randomCoord,
//       letters[randomNumberForLetter - 1] + Number(fourCellShip[0].slice(1)),
//       letters[randomNumberForLetter + 1] + Number(fourCellShip[0].slice(1)),

//       secondCoord,
//       letters[randomNumberForLetter - 1] + Number(secondCoord.slice(1)),
//       letters[randomNumberForLetter + 1] + Number(secondCoord.slice(1)),

//       thirdCoord,
//       letters[randomNumberForLetter - 1] + Number(thirdCoord.slice(1)),
//       letters[randomNumberForLetter + 1] + Number(thirdCoord.slice(1)),

//       fourthCoord,
//       letters[randomNumberForLetter - 1] + Number(fourthCoord.slice(1)),
//       letters[randomNumberForLetter + 1] + Number(fourthCoord.slice(1)),

//       letters[randomNumberForLetter] + (+randomNumber + 1),
//       letters[randomNumberForLetter - 1] + (randomNumber + 1),
//       letters[randomNumberForLetter + 1] + (randomNumber + 1),

//       letters[randomNumberForLetter] + (randomNumber + 4),
//       letters[randomNumberForLetter - 1] + (randomNumber + 4),
//       letters[randomNumberForLetter + 1] + (randomNumber + 4),

//       // letters[randomNumberForLetter - 1] + fourCellShip[0].slice(1),
//       // letters[randomNumberForLetter - 1] + (+fourCellShip[0].slice(1) + 1),
//       // letters[randomNumberForLetter - 1] + (+fourCellShip[0].slice(1) - 1),

//       // letters[randomNumberForLetter + 4] + fourCellShip[0].slice(1),
//       // letters[randomNumberForLetter + 4] + (+fourCellShip[0].slice(1) + 1),
//       // letters[randomNumberForLetter + 4] + (+fourCellShip[0].slice(1) - 1),
//     ];
//     console.log("fourCellShiprand", fourCellShip, fourCellShipWithSurroundings);
//   }

//   if (isHorizontal) {
//     let direction = "right";
//     // Second coord
//     secondCoord =
//       letters[randomNumberForLetter + 1] &&
//       letters[randomNumberForLetter + 1] + randomNumber;

//     // Means that there is no right anymore
//     if (!secondCoord) {
//       direction = "left";
//       secondCoord = letters[randomNumberForLetter - 1] + randomNumber;
//       thirdCoord = letters[randomNumberForLetter - 2] + randomNumber;
//       fourthCoord = letters[randomNumberForLetter - 3] + randomNumber;
//       // Full 4-cell ship if the direction changed to the left
//     }

//     if (direction === "right" && !thirdCoord) {
//       thirdCoord =
//         letters[randomNumberForLetter + 2] &&
//         letters[randomNumberForLetter + 2] + randomNumber;

//       if (!thirdCoord) {
//         direction = "left";
//         thirdCoord = letters[randomNumberForLetter - 1] + randomNumber;
//         fourthCoord = letters[randomNumberForLetter - 2] + randomNumber;
//       }
//       // Full 4-cell ship if the direction changed to the left
//     }

//     // --------------------------------

//     if (direction === "right" && !fourthCoord) {
//       fourthCoord =
//         letters[randomNumberForLetter + 3] &&
//         letters[randomNumberForLetter + 3] + randomNumber;

//       if (!fourthCoord) {
//         direction = "left";
//         fourthCoord = letters[randomNumberForLetter - 1] + randomNumber;
//       }
//     }

//     fourCellShip = [randomCoord, secondCoord, thirdCoord, fourthCoord].sort();
//     fourCellShipWithSurroundings = [
//       randomCoord,
//       randomLetter + (randomNumber + 1),
//       randomLetter + (randomNumber - 1),

//       secondCoord,
//       secondCoord.slice(0, 1) + (randomNumber + 1),
//       secondCoord.slice(0, 1) + (randomNumber - 1),

//       thirdCoord,
//       thirdCoord.slice(0, 1) + (randomNumber + 1),
//       thirdCoord.slice(0, 1) + (randomNumber - 1),

//       fourthCoord,
//       fourthCoord.slice(0, 1) + (randomNumber + 1),
//       fourthCoord.slice(0, 1) + (randomNumber - 1),

//       letters[randomNumberForLetter - 1] + fourCellShip[0].slice(1),
//       letters[randomNumberForLetter - 1] + (+fourCellShip[0].slice(1) + 1),
//       letters[randomNumberForLetter - 1] + (+fourCellShip[0].slice(1) - 1),

//       letters[randomNumberForLetter + 4] + fourCellShip[0].slice(1),
//       letters[randomNumberForLetter + 4] + (+fourCellShip[0].slice(1) + 1),
//       letters[randomNumberForLetter + 4] + (+fourCellShip[0].slice(1) - 1),
//     ];
//     console.log("fourCellShiprand", fourCellShip, fourCellShipWithSurroundings);
//   }
// }

// function createThreeCellShipOne() {
//   const randomNumber = Math.floor(Math.random() * 10) + 1;
//   const randomNumberForLetter = Math.floor(Math.random() * 10);
//   // console.log("randomNumberForLetter", randomNumberForLetter);

//   const randomLetter = letters[randomNumberForLetter];
//   const randomCoord = randomLetter + randomNumber;
//   // console.log("randomCoord", randomCoord);

//   // Is horizontal or not
//   const isHorizontal = Math.random() < 0.5;
//   // console.log("isHorizontalrand", isHorizontal);
//   let secondCoord, thirdCoord;
//   let direction = "right";

//   if (isHorizontal) {
//     // Second coord
//     secondCoord =
//       letters[randomNumberForLetter + 1] &&
//       letters[randomNumberForLetter + 1] + randomNumber;

//     // Means that there is no right anymore
//     if (!secondCoord) {
//       direction = "left";
//       secondCoord = letters[randomNumberForLetter - 1] + randomNumber;
//       thirdCoord = letters[randomNumberForLetter - 2] + randomNumber;
//       // Full 3-cell ship if the direction changed to the left
//     }

//     if (direction === "right" && !thirdCoord) {
//       thirdCoord =
//         letters[randomNumberForLetter + 2] &&
//         letters[randomNumberForLetter + 2] + randomNumber;

//       if (!thirdCoord) {
//         direction = "left";
//         thirdCoord = letters[randomNumberForLetter - 1] + randomNumber;
//       }
//       // Full 3-cell ship if the direction changed to the left
//     }

//     threeCellShipOne = [randomCoord, secondCoord, thirdCoord].sort();
//     threeCellShipOneWithSurroundings = [
//       randomCoord,
//       randomLetter + (randomNumber + 1),
//       randomLetter + (randomNumber - 1),

//       secondCoord,
//       secondCoord.slice(0, 1) + (randomNumber + 1),
//       secondCoord.slice(0, 1) + (randomNumber - 1),

//       thirdCoord,
//       thirdCoord.slice(0, 1) + (randomNumber + 1),
//       thirdCoord.slice(0, 1) + (randomNumber - 1),

//       letters[randomNumberForLetter - 1] + threeCellShipOne[0].slice(1),
//       letters[randomNumberForLetter - 1] + (+threeCellShipOne[0].slice(1) + 1),
//       letters[randomNumberForLetter - 1] + (+threeCellShipOne[0].slice(1) - 1),

//       letters[randomNumberForLetter + 4] + threeCellShipOne[0].slice(1),
//       letters[randomNumberForLetter + 4] + (+threeCellShipOne[0].slice(1) + 1),
//       letters[randomNumberForLetter + 4] + (+threeCellShipOne[0].slice(1) - 1),
//     ];
//     console.log(
//       "threeCellShipOnerand",
//       threeCellShipOne,
//       threeCellShipOneWithSurroundings
//     );
//   }
// }

// function createThreeCellShipTwo() {
//   const randomNumber = Math.floor(Math.random() * 10) + 1;
//   const randomNumberForLetter = Math.floor(Math.random() * 10);
//   // console.log("randomNumberForLetter", randomNumberForLetter);

//   const randomLetter = letters[randomNumberForLetter];
//   const randomCoord = randomLetter + randomNumber;
//   // console.log("randomCoord", randomCoord);

//   // Is horizontal or not
//   const isHorizontal = Math.random() < 0.5;
//   // console.log("isHorizontalrand", isHorizontal);
//   let secondCoord, thirdCoord;
//   let direction = "right";

//   if (isHorizontal) {
//     // Second coord
//     secondCoord =
//       letters[randomNumberForLetter + 1] &&
//       letters[randomNumberForLetter + 1] + randomNumber;

//     // Means that there is no right anymore
//     if (!secondCoord) {
//       direction = "left";
//       secondCoord = letters[randomNumberForLetter - 1] + randomNumber;
//       thirdCoord = letters[randomNumberForLetter - 2] + randomNumber;
//       // Full 3-cell ship if the direction changed to the left
//     }

//     if (direction === "right" && !thirdCoord) {
//       thirdCoord =
//         letters[randomNumberForLetter + 2] &&
//         letters[randomNumberForLetter + 2] + randomNumber;

//       if (!thirdCoord) {
//         direction = "left";
//         thirdCoord = letters[randomNumberForLetter - 1] + randomNumber;
//       }
//       // Full 3-cell ship if the direction changed to the left
//     }

//     threeCellShipTwo = [randomCoord, secondCoord, thirdCoord].sort();
//     threeCellShipTwoWithSurroundings = [
//       randomCoord,
//       randomLetter + (randomNumber + 1),
//       randomLetter + (randomNumber - 1),

//       secondCoord,
//       secondCoord.slice(0, 1) + (randomNumber + 1),
//       secondCoord.slice(0, 1) + (randomNumber - 1),

//       thirdCoord,
//       thirdCoord.slice(0, 1) + (randomNumber + 1),
//       thirdCoord.slice(0, 1) + (randomNumber - 1),

//       letters[randomNumberForLetter - 1] + threeCellShipTwo[0].slice(1),
//       letters[randomNumberForLetter - 1] + (+threeCellShipTwo[0].slice(1) + 1),
//       letters[randomNumberForLetter - 1] + (+threeCellShipTwo[0].slice(1) - 1),

//       letters[randomNumberForLetter + 4] + threeCellShipTwo[0].slice(1),
//       letters[randomNumberForLetter + 4] + (+threeCellShipTwo[0].slice(1) + 1),
//       letters[randomNumberForLetter + 4] + (+threeCellShipTwo[0].slice(1) - 1),
//     ];
//     console.log(
//       "threeCellShipTworand",
//       threeCellShipTwo,
//       threeCellShipTwoWithSurroundings
//     );
//   }
// }

// createFourCellShip();
// createThreeCellShipOne();
// createThreeCellShipTwo();

// Make it flat and check whether we have a new coord there or not, and if yes then we regenerate a random number again and stuff again, top and bottom do all coords, and right and left do only the side coords
let createEnemyShips = [
  [fourCellShip, ["J4", "I4", "h4", "e4"].length],
  [["b3", "c3", "d3"], ["J4", "I4", "h4"].length],
  [["c7", "d7", "e7"], ["J4", "I4", "h4"].length],

  [["a1"], ["d10"].length],
  [["c1"], ["d10"].length],
  [["e1"], ["d10"].length],
  [["a3"], ["d10"].length],

  [["i5", "j5"], ["e6", "e7"].length],
  [["i7", "j7"], ["e6", "e7"].length],
  [["e9", "f9"], ["e6", "e7"].length],
];

// let shouldCheckEnemyShips = createEnemyShips.flat(Infinity);

// const checkedFourCellShip = fourCellShip.filter((coordNew) =>
//   shouldCheckEnemyShips.find((coord) => coord === coordNew)
// );

// const checkedThreeCellShipOne = threeCellShipOne.filter((coordNew) =>
//   shouldCheckEnemyShips.find((coord) => coord === coordNew)
// );
// const checkedThreeCellShipTwo = threeCellShipTwo.filter((coordNew) =>
//   shouldCheckEnemyShips.find((coord) => coord === coordNew)
// );

// const checkedTwoCellShipOne = twoCellShipOne.filter((coordNew) =>
//   shouldCheckEnemyShips.find((coord) => coord === coordNew)
// );
// const checkedTwoCellShipTwo = twoCellShipTwo.filter((coordNew) =>
//   shouldCheckEnemyShips.find((coord) => coord === coordNew)
// );
// const checkedTwoCellShipThree = twoCellShipThree.filter((coordNew) =>
//   shouldCheckEnemyShips.find((coord) => coord === coordNew)
// );

// console.log("rand", checkedFourCellShip);
// console.log("rand", checkedThreeCellShipOne);

// console.log("rand", shouldCheckEnemyShips);
// let checkTopCoords = shouldCheckEnemyShips.filter((coord) => {
//   return !fourCellShip.includes(coord) && !fourCellShip.includes(coord.slice(0,1)+)
// });

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
