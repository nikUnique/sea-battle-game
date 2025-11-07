// FLEET ENVIRONMENT
const mySideMyFleet = document.querySelector(".my-side--my-fleet");
const mySideEnemyFleet = document.querySelector(".my-side--enemy-fleet");
const enemySideEnemyFleet = document.querySelector(".enemy-side--enemy-fleet");
const enemySideMyFleet = document.querySelector(".enemy-side--my-fleet");
const seaContainers = document.querySelectorAll(".sea-container");
const seas = document.querySelectorAll(".sea");
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const lowerLetters = letters.map((letter) => letter.toLowerCase());
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

let readyEnemyShips = [];

const randomNumber = Math.floor(Math.random() * 10) + 1;
const randomNumberForLetter = Math.floor(Math.random() * 10);

const randomLetter = lowerLetters[randomNumberForLetter];

function randomNumberFromRange(min, max) {
  // min ≤ result ≤ max  (both inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomLetterFun(min, max) {
  const start = min.charCodeAt(0);
  const end = max.charCodeAt(0);
  const code = Math.floor(Math.random() * (end - start + 1)) + start;
  return String.fromCharCode(code).toLowerCase();
}

function checkShipSafety(fullShipWithSurroundings, checkFleetBusiness) {
  console.log("checkFleetBusinessrand", checkFleetBusiness);

  return fullShipWithSurroundings.filter((coord) =>
    checkFleetBusiness.find((point) => point === coord)
  ).length;
}

function remakeShip(randomRange, randomLetterRangeProp, size) {
  const [ship, shipWithSurroundings] = createShip?.({
    randomRange,
    randomLetterRangeProp,
    size,
  });
  return [ship, shipWithSurroundings];
}

function createShip({ randomRange, randomLetterRangeProp, size }) {
  const checkFleetBusiness = readyEnemyShips.flat();
  const randomFromRange = randomNumberFromRange(randomRange[0], randomRange[1]);
  const randomLetterRange = randomLetterFun(
    randomLetterRangeProp[0],
    randomLetterRangeProp[1]
  );

  // Is horizontal or not
  const isHorizontal = Math.random() < 0.5;
  const isTop = Math.random() < 0.5;
  const isRight = Math.random() < 0.5;

  // console.log("isHorizontalrand", isHorizontal);

  const randomCoordByNumber = randomLetter + randomFromRange;
  const randomCoordByLetter = randomLetterRange + randomNumber;
  // console.log("randomCoordByNumber", randomCoordByNumber);
  // console.log("randomCoordByLetter", randomCoordByLetter);

  let firstCoord, secondCoord, thirdCoord, fourthCoord;
  if (!isHorizontal && isTop) {
    firstCoord = randomCoordByNumber;

    secondCoord = randomLetter + (randomFromRange - 1);

    thirdCoord = randomLetter + (randomFromRange - 2);

    fourthCoord = randomLetter + (randomFromRange - 3);
  }

  if (!isHorizontal && !isTop) {
    firstCoord = randomCoordByNumber;
    secondCoord = randomLetter + (randomFromRange + 1);
    thirdCoord = randomLetter + (randomFromRange + 2);
    fourthCoord = randomLetter + (randomFromRange + 3);
  }

  if (isHorizontal && isRight) {
    firstCoord = randomCoordByLetter;
    secondCoord =
      letters[letters.indexOf(randomLetterRange.toUpperCase()) + 1] +
      randomNumber;
    thirdCoord =
      letters[letters.indexOf(randomLetterRange.toUpperCase()) + 2] +
      randomNumber;
    fourthCoord =
      letters[letters.indexOf(randomLetterRange.toUpperCase()) + 3] +
      randomNumber;
  }

  if (isHorizontal && !isRight) {
    firstCoord = randomCoordByLetter;
    secondCoord =
      letters[letters.indexOf(randomLetterRange.toUpperCase()) - 1] +
      randomNumber;
    thirdCoord =
      letters[letters.indexOf(randomLetterRange.toUpperCase()) - 2] +
      randomNumber;
    fourthCoord =
      letters[letters.indexOf(randomLetterRange.toUpperCase()) - 3] +
      randomNumber;
  }

  if (size === 1) {
    const oneCellShipWithSurroundings = [
      firstCoord,

      // Top and Bottom
      firstCoord.slice(0, 1) + (Number(firstCoord.slice(1)) + 1),
      firstCoord.slice(0, 1) + (Number(firstCoord.slice(1)) - 1),

      // Right top and bottom
      lowerLetters[lowerLetters.indexOf(firstCoord.slice(0, 1)) + 1] +
        (Number(firstCoord.slice(1)) - 1),
      lowerLetters[lowerLetters.indexOf(firstCoord.slice(0, 1)) + 1] +
        (Number(firstCoord.slice(1)) + 1),

      // Left and Right
      lowerLetters[lowerLetters.indexOf(firstCoord.slice(0, 1)) - 1] +
        Number(firstCoord.slice(1)),
      lowerLetters[lowerLetters.indexOf(firstCoord.slice(0, 1)) + 1] +
        Number(firstCoord.slice(1)),

      // Left top and bottom
      lowerLetters[lowerLetters.indexOf(firstCoord.slice(0, 1)) - 1] +
        (Number(firstCoord.slice(1)) - 1),
      lowerLetters[lowerLetters.indexOf(firstCoord.slice(0, 1)) - 1] +
        (Number(firstCoord.slice(1)) + 1),
    ];

    const isShipDangerous = checkShipSafety(
      oneCellShipWithSurroundings,
      checkFleetBusiness
    );

    if (isShipDangerous) {
      return remakeShip(randomRange, randomLetterRangeProp, size);
    }

    readyEnemyShips = [...readyEnemyShips, firstCoord];

    return [[firstCoord], oneCellShipWithSurroundings];
  }

  if (size === 2) {
    let twoCellShipWithSurroundings;
    if (isHorizontal && isRight) {
      console.log("Horizontal and Rightrand");

      twoCellShipWithSurroundings = [
        firstCoord,
        secondCoord,

        // First coord
        // Top and Bottom
        firstCoord.slice(0, 1) + (Number(firstCoord.slice(1)) + 1),
        firstCoord.slice(0, 1) + (Number(firstCoord.slice(1)) - 1),

        // Left
        lowerLetters[lowerLetters.indexOf(firstCoord.slice(0, 1)) - 1] +
          Number(firstCoord.slice(1)),

        // Left top and bottom
        lowerLetters[lowerLetters.indexOf(firstCoord.slice(0, 1)) - 1] +
          (Number(firstCoord.slice(1)) - 1),
        lowerLetters[lowerLetters.indexOf(firstCoord.slice(0, 1)) - 1] +
          (Number(firstCoord.slice(1)) + 1),

        // Second coord
        // Top and Bottom
        secondCoord.slice(0, 1) + (Number(secondCoord.slice(1)) + 1),
        secondCoord.slice(0, 1) + (Number(secondCoord.slice(1)) - 1),

        // Right
        lowerLetters[lowerLetters.indexOf(firstCoord.slice(0, 1)) + 1] +
          Number(firstCoord.slice(1)),

        // Right top and bottom
        lowerLetters[lowerLetters.indexOf(secondCoord.slice(0, 1)) + 1] +
          (Number(secondCoord.slice(1)) - 1),
        lowerLetters[lowerLetters.indexOf(secondCoord.slice(0, 1)) + 1] +
          (Number(secondCoord.slice(1)) + 1),
      ];
    }

    if (isHorizontal && !isRight) {
      console.log("Horizontal and Leftrand");

      twoCellShipWithSurroundings = [
        firstCoord,
        secondCoord,

        // First coord
        // Top and Bottom
        firstCoord.slice(0, 1) + (Number(firstCoord.slice(1)) + 1),
        firstCoord.slice(0, 1) + (Number(firstCoord.slice(1)) - 1),

        // Right
        lowerLetters[lowerLetters.indexOf(firstCoord.slice(0, 1)) + 1] +
          Number(firstCoord.slice(1)),

        // Right top and bottom
        lowerLetters[lowerLetters.indexOf(firstCoord.slice(0, 1)) + 1] +
          (Number(firstCoord.slice(1)) - 1),
        lowerLetters[lowerLetters.indexOf(firstCoord.slice(0, 1)) + 1] +
          (Number(firstCoord.slice(1)) + 1),

        // Second coord
        // Top and Bottom
        secondCoord.slice(0, 1) + (Number(secondCoord.slice(1)) + 1),
        secondCoord.slice(0, 1) + (Number(secondCoord.slice(1)) - 1),

        // Left
        lowerLetters[lowerLetters.indexOf(secondCoord.slice(0, 1)) - 1] +
          Number(secondCoord.slice(1)),

        // Left top and bottom
        lowerLetters[lowerLetters.indexOf(secondCoord.slice(0, 1)) - 1] +
          (Number(secondCoord.slice(1)) - 1),
        lowerLetters[lowerLetters.indexOf(secondCoord.slice(0, 1)) - 1] +
          (Number(secondCoord.slice(1)) + 1),
      ];
    }

    const isShipDangerous = checkShipSafety(
      twoCellShipWithSurroundings,
      checkFleetBusiness
    );

    if (isShipDangerous) {
      return remakeShip(randomRange, randomLetterRangeProp, size);
    }

    readyEnemyShips = [...readyEnemyShips, [firstCoord, secondCoord]];
    return [[firstCoord, secondCoord]];
  }
  if (size === 3) {
    readyEnemyShips = [
      ...readyEnemyShips,
      [firstCoord, secondCoord, thirdCoord],
    ];
    return [[firstCoord, secondCoord, thirdCoord]];
  }

  readyEnemyShips = [
    ...readyEnemyShips,
    [firstCoord, secondCoord, thirdCoord, fourthCoord],
  ];
  return [[firstCoord, secondCoord, thirdCoord, fourthCoord]];
}

// const [fourCellShip] = createShip({
//   randomRange: [4, 7],
//   randomLetterRangeProp: ["d", "g"],
//   size: 4,
// });

// const [threeCellShipOne] = createShip({
//   randomRange: [3, 8],
//   randomLetterRangeProp: ["c", "h"],
//   size: 3,
// });

const [oneCellShipOne] = createShip?.({
  randomRange: [1, 10],
  randomLetterRangeProp: ["a", "j"],
  size: 1,
});
const [oneCellShipTwo] = createShip?.({
  randomRange: [1, 10],
  randomLetterRangeProp: ["a", "j"],
  size: 1,
});
const [oneCellShipThree] = createShip?.({
  randomRange: [1, 10],
  randomLetterRangeProp: ["a", "j"],
  size: 1,
});
const [oneCellShipFour] = createShip?.({
  randomRange: [1, 10],
  randomLetterRangeProp: ["a", "j"],
  size: 1,
});

const [twoCellShipOne] = createShip?.({
  randomRange: [2, 9],
  randomLetterRangeProp: ["b", "i"],
  size: 2,
});

// }
// Make it flat and check whether we have a new coord there or not, and if yes then we regenerate a random number again and stuff again, top and bottom do all coords, and right and left do only the side coords
let createEnemyShips = [
  // [fourCellShip, ["J4", "I4", "h4", "e4"].length],
  // [["d4", "e4", "f4", "g4"], ["J4", "I4", "h4", "e4"].length],
  // [threeCellShipOne, threeCellShipOne.length],
  // [["b5", "b6", "b7"], ["J4", "I4", "h4"].length],

  [oneCellShipOne, ["d10"].length],
  [oneCellShipTwo, ["d10"].length],
  [oneCellShipThree, ["d10"].length],
  [oneCellShipFour, ["d10"].length],

  [twoCellShipOne, twoCellShipOne.length],

  // [["c1"], ["d10"].length],
  // [["e1"], ["d10"].length],
  // [["a3"], ["d10"].length],

  // [["i5", "j5"], ["e6", "e7"].length],
  // [["i7", "j7"], ["e6", "e7"].length],
  // [["h2", "i2", "j2"], ["J4", "I4", "h4"].length],
  // [["e9", "f9"], ["e6", "e7"].length],
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
