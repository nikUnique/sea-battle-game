import {
  randomNumberFromRange,
  randomLetterFun,
  checkShipSafety,
  remakeShip,
  generateSurroundingFields,
} from "./shipMakeHelpers";
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
let createShipCount = 0;

function createShip({ randomRange, randomLetterRangeProp, size }) {
  createShipCount++;
  console.log("createShipCountrand", createShipCount);

  const checkFleetBusiness = readyEnemyShips?.flatMap((coord) =>
    coord?.toLowerCase()
  );

  const randomNumber = Math.floor(Math.random() * 10) + 1;
  const randomNumberForLetter = Math.floor(Math.random() * 10);

  const randomLetter = lowerLetters[randomNumberForLetter];
  const randomFromRange = randomNumberFromRange(randomRange[0], randomRange[1]);
  const randomLetterRange = randomLetterFun(
    randomLetterRangeProp[0],
    randomLetterRangeProp[1]
  );

  // Is horizontal or not
  const isHorizontal = Math.random() < 0.5;
  const isTop = Math.random() < 0.5;
  const isRight = Math.random() < 0.5;

  const randomCoordByNumber = randomLetter + randomFromRange;
  const randomCoordByLetter = randomLetterRange + randomNumber;

  if (isHorizontal) {
    console.log("randomCoordbyLetter", randomCoordByLetter);
  }
  if (!isHorizontal) {
    console.log("randomCoordByNumber", randomCoordByNumber);
  }

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
      lowerLetters[lowerLetters.indexOf(randomLetterRange) + 1] + randomNumber;
    thirdCoord =
      lowerLetters[lowerLetters.indexOf(randomLetterRange) + 2] + randomNumber;
    fourthCoord =
      lowerLetters[lowerLetters.indexOf(randomLetterRange) + 3] + randomNumber;
  }

  if (isHorizontal && !isRight) {
    firstCoord = randomCoordByLetter;
    secondCoord =
      lowerLetters[lowerLetters.indexOf(randomLetterRange) - 1] + randomNumber;
    thirdCoord =
      lowerLetters[lowerLetters.indexOf(randomLetterRange) - 2] + randomNumber;
    fourthCoord =
      lowerLetters[lowerLetters.indexOf(randomLetterRange) - 3] + randomNumber;
  }

  if (size === 1) {
    const oneCellShipWithSurroundings = [
      firstCoord,

      ...generateSurroundingFields({
        coord: firstCoord,
        lowerLetters,
        top: "top",
        bottom: "bottom",
        right: "right",
        left: "left",
        topLeft: "topLeft",
        topRight: "topRight",
        bottomLeft: "bottomLeft",
        bottomRight: "bottomRight",
      }),
    ];

    const isShipDangerous = checkShipSafety(
      oneCellShipWithSurroundings,
      checkFleetBusiness
    );

    if (isShipDangerous) {
      return remakeShip(randomRange, randomLetterRangeProp, size, createShip);
    }

    readyEnemyShips = [...readyEnemyShips, firstCoord];
    console.log("readyEnemeyShipsrand", readyEnemyShips);

    return [[firstCoord], oneCellShipWithSurroundings];
  }

  if (size === 2) {
    let twoCellShipWithSurroundings;
    if (isHorizontal && isRight) {
      console.log("Horizontal and Rightrand", firstCoord);

      twoCellShipWithSurroundings = [
        firstCoord,
        secondCoord,

        ...generateSurroundingFields({
          lowerLetters,
          coord: firstCoord,
          top: "top",
          bottom: "bottom",
          left: "left",
          topLeft: "topLeft",
          bottomLeft: "bottomLeft",
        }),

        ...generateSurroundingFields({
          lowerLetters,
          coord: secondCoord,
          top: "top",
          bottom: "bottom",
          right: "right",
          topRight: "topRight",
          bottomRight: "bottomRight",
        }),
      ];
    }

    if (isHorizontal && !isRight) {
      console.log("Horizontal and Leftrand", firstCoord);

      twoCellShipWithSurroundings = [
        firstCoord,
        secondCoord,

        ...generateSurroundingFields({
          lowerLetters,
          coord: firstCoord,
          top: "top",
          bottom: "bottom",
          right: "right",
          topRight: "topRight",
          bottomRight: "bottomRight",
        }),
        ...generateSurroundingFields({
          lowerLetters,
          coord: secondCoord,
          top: "top",
          bottom: "bottom",
          left: "left",
          topLeft: "topLeft",
          bottomLeft: "bottomLeft",
        }),
      ];

      console.log("superLeftrand", twoCellShipWithSurroundings);
    }

    if (!isHorizontal && isTop) {
      console.log("Vertical and Toprand", firstCoord);
      twoCellShipWithSurroundings = [
        firstCoord,
        secondCoord,

        // First coord
        ...generateSurroundingFields({
          lowerLetters,
          coord: firstCoord,
          bottomRight: "bottomRight",
          bottom: "bottom",
          left: "left",
          right: "right",
          bottomLeft: "bottomLeft",
        }),
        ...generateSurroundingFields({
          lowerLetters,
          coord: secondCoord,
          top: "top",
          left: "left",
          right: "right",
          topRight: "topRight",
          topLeft: "topLeft",
        }),
      ];
    }

    if (!isHorizontal && !isTop) {
      console.log("Vertical and Bottomrand", firstCoord);
      twoCellShipWithSurroundings = [
        firstCoord,
        secondCoord,

        ...generateSurroundingFields({
          lowerLetters,
          coord: firstCoord,
          top: "top",
          left: "left",
          right: "right",
          topRight: "topRight",
          topLeft: "topLeft",
        }),
        ...generateSurroundingFields({
          lowerLetters,
          coord: secondCoord,
          bottomRight: "bottomRight",
          bottom: "bottom",
          left: "left",
          right: "right",
          bottomLeft: "bottomLeft",
        }),
      ];
    }

    console.log("checkFleetForBusinessrand", checkFleetBusiness);
    const isShipDangerous = checkShipSafety(
      twoCellShipWithSurroundings,
      checkFleetBusiness
    );

    if (isShipDangerous) {
      return remakeShip(randomRange, randomLetterRangeProp, size, createShip);
    }

    readyEnemyShips = [...readyEnemyShips, firstCoord, secondCoord];
    console.log(firstCoord, secondCoord, "randcoords");
    console.log("readyEnemeyShipsrand", readyEnemyShips);

    return [[firstCoord, secondCoord]];
  }

  if (size === 3) {
    let threeCellShipWithSurroundings;
    if (isHorizontal && isRight) {
      console.log("Horizontal and Rightrand", firstCoord);

      threeCellShipWithSurroundings = [
        firstCoord,
        secondCoord,
        thirdCoord,

        ...generateSurroundingFields({
          lowerLetters,
          coord: firstCoord,
          top: "top",
          bottom: "bottom",
          left: "left",
          topLeft: "topLeft",
          bottomLeft: "bottomLeft",
        }),
        ...generateSurroundingFields({
          lowerLetters,
          coord: secondCoord,
          top: "top",
          bottom: "bottom",
        }),
        ...generateSurroundingFields({
          lowerLetters,
          coord: thirdCoord,
          top: "top",
          bottom: "bottom",
          right: "right",
          topRight: "topRight",
          bottomRight: "bottomRight",
        }),
      ];
    }

    if (isHorizontal && !isRight) {
      console.log("Horizontal and Leftrand", firstCoord);

      threeCellShipWithSurroundings = [
        firstCoord,
        secondCoord,
        thirdCoord,

        ...generateSurroundingFields({
          lowerLetters,
          coord: firstCoord,
          top: "top",
          bottom: "bottom",
          right: "right",
          topRight: "topRight",
          bottomRight: "bottomRight",
        }),

        ...generateSurroundingFields({
          lowerLetters,
          coord: secondCoord,
          top: "top",
          bottom: "bottom",
        }),

        ...generateSurroundingFields({
          lowerLetters,
          coord: thirdCoord,
          top: "top",
          bottom: "bottom",
          left: "left",
          topLeft: "topLeft",
          bottomLeft: "bottomLeft",
        }),
      ];
    }

    if (!isHorizontal && isTop) {
      console.log("Vertical and Toprand", firstCoord);

      threeCellShipWithSurroundings = [
        firstCoord,
        secondCoord,
        thirdCoord,

        ...generateSurroundingFields({
          lowerLetters,
          coord: firstCoord,
          bottomRight: "bottomRight",
          bottom: "bottom",
          left: "left",
          right: "right",
          bottomLeft: "bottomLeft",
        }),

        ...generateSurroundingFields({
          lowerLetters,
          coord: secondCoord,
          left: "left",
          right: "right",
        }),

        ...generateSurroundingFields({
          lowerLetters,
          coord: thirdCoord,
          top: "top",
          left: "left",
          right: "right",
          topRight: "topRight",
          topLeft: "topLeft",
        }),
      ];
    }

    if (!isHorizontal && !isTop) {
      console.log("Vertical and Bottomrand", firstCoord);

      threeCellShipWithSurroundings = [
        firstCoord,
        secondCoord,
        thirdCoord,

        ...generateSurroundingFields({
          lowerLetters,
          coord: firstCoord,
          top: "top",
          left: "left",
          right: "right",
          topRight: "topRight",
          topLeft: "topLeft",
        }),

        ...generateSurroundingFields({
          lowerLetters,
          coord: secondCoord,
          left: "left",
          right: "right",
        }),

        ...generateSurroundingFields({
          lowerLetters,
          coord: thirdCoord,
          bottomRight: "bottomRight",
          bottom: "bottom",
          left: "left",
          right: "right",
          bottomLeft: "bottomLeft",
        }),
      ];
    }

    console.log("checkFleetForBusinessrand", checkFleetBusiness);
    const isShipDangerous = checkShipSafety(
      threeCellShipWithSurroundings,
      checkFleetBusiness
    );

    if (isShipDangerous) {
      return remakeShip(randomRange, randomLetterRangeProp, size, createShip);
    }

    readyEnemyShips = [...readyEnemyShips, firstCoord, secondCoord, thirdCoord];
    return [[firstCoord, secondCoord, thirdCoord]];
  }

  if (size === 4) {
    // size 4
    let fourCellShipWithSurroundings;
    if (isHorizontal && isRight) {
      console.log("Horizontal and Rightrand", firstCoord);

      fourCellShipWithSurroundings = [
        firstCoord,
        secondCoord,
        thirdCoord,
        fourthCoord,

        ...generateSurroundingFields({
          lowerLetters,
          coord: firstCoord,
          top: "top",
          bottom: "bottom",
          left: "left",
          topLeft: "topLeft",
          bottomLeft: "bottomLeft",
        }),
        ...generateSurroundingFields({
          lowerLetters,
          coord: secondCoord,
          top: "top",
          bottom: "bottom",
        }),
        ...generateSurroundingFields({
          lowerLetters,
          coord: thirdCoord,
          top: "top",
          bottom: "bottom",
        }),
        ...generateSurroundingFields({
          lowerLetters,
          coord: fourthCoord,
          top: "top",
          bottom: "bottom",
          right: "right",
          topRight: "topRight",
          bottomRight: "bottomRight",
        }),
      ];
    }

    if (isHorizontal && !isRight) {
      console.log("Horizontal and Leftrand", firstCoord);

      fourCellShipWithSurroundings = [
        firstCoord,
        secondCoord,
        thirdCoord,
        fourthCoord,

        ...generateSurroundingFields({
          lowerLetters,
          coord: firstCoord,
          top: "top",
          bottom: "bottom",
          right: "right",
          topRight: "topRight",
          bottomRight: "bottomRight",
        }),
        ...generateSurroundingFields({
          lowerLetters,
          coord: secondCoord,
          top: "top",
          bottom: "bottom",
        }),
        ...generateSurroundingFields({
          lowerLetters,
          coord: thirdCoord,
          top: "top",
          bottom: "bottom",
        }),
        ...generateSurroundingFields({
          lowerLetters,
          coord: fourthCoord,
          top: "top",
          bottom: "bottom",
          left: "left",
          topLeft: "topLeft",
          bottomLeft: "bottomLeft",
        }),
      ];
    }

    if (!isHorizontal && isTop) {
      console.log("Vertical and Toprand", firstCoord);

      fourCellShipWithSurroundings = [
        firstCoord,
        secondCoord,
        thirdCoord,
        fourthCoord,

        ...generateSurroundingFields({
          lowerLetters,
          coord: firstCoord,
          bottomRight: "bottomRight",
          bottom: "bottom",
          left: "left",
          right: "right",
          bottomLeft: "bottomLeft",
        }),
        ...generateSurroundingFields({
          lowerLetters,
          coord: secondCoord,
          left: "left",
          right: "right",
        }),
        ...generateSurroundingFields({
          lowerLetters,
          coord: thirdCoord,
          left: "left",
          right: "right",
        }),

        ...generateSurroundingFields({
          lowerLetters,
          coord: fourthCoord,
          top: "top",
          left: "left",
          right: "right",
          topRight: "topRight",
          topLeft: "topLeft",
        }),
      ];
    }

    if (!isHorizontal && !isTop) {
      console.log("Vertical and Bottomrand", firstCoord);

      fourCellShipWithSurroundings = [
        firstCoord,
        secondCoord,
        thirdCoord,
        fourthCoord,

        ...generateSurroundingFields({
          lowerLetters,
          coord: firstCoord,
          top: "top",
          left: "left",
          right: "right",
          topRight: "topRight",
          topLeft: "topLeft",
        }),
        ...generateSurroundingFields({
          lowerLetters,
          coord: secondCoord,
          left: "left",
          right: "right",
        }),
        ...generateSurroundingFields({
          lowerLetters,
          coord: thirdCoord,
          left: "left",
          right: "right",
        }),
        ...generateSurroundingFields({
          lowerLetters,
          coord: fourthCoord,
          bottomRight: "bottomRight",
          bottom: "bottom",
          left: "left",
          right: "right",
          bottomLeft: "bottomLeft",
        }),
      ];
    }

    console.log("checkFleetForBusinessrand", checkFleetBusiness);
    const isShipDangerous = checkShipSafety(
      fourCellShipWithSurroundings,
      checkFleetBusiness
    );

    if (isShipDangerous) {
      return remakeShip(randomRange, randomLetterRangeProp, size, createShip);
    }

    readyEnemyShips = [
      ...readyEnemyShips,
      firstCoord,
      secondCoord,
      thirdCoord,
      fourthCoord,
    ];
    return [[firstCoord, secondCoord, thirdCoord, fourthCoord]];
  }
}

const [fourCellShip] = createShip?.({
  randomRange: [4, 7],
  randomLetterRangeProp: ["d", "g"],
  size: 4,
});

const [threeCellShipOne] = createShip?.({
  randomRange: [3, 8],
  randomLetterRangeProp: ["c", "h"],
  size: 3,
});

const [threeCellShipTwo] = createShip?.({
  randomRange: [3, 8],
  randomLetterRangeProp: ["c", "h"],
  size: 3,
});

const [twoCellShipOne] = createShip?.({
  randomRange: [2, 9],
  randomLetterRangeProp: ["b", "i"],
  size: 2,
});

const [twoCellShipTwo] = createShip?.({
  randomRange: [2, 9],
  randomLetterRangeProp: ["b", "i"],
  size: 2,
});

const [twoCellShipThree] = createShip?.({
  randomRange: [2, 9],
  randomLetterRangeProp: ["b", "i"],
  size: 2,
});

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

// const [twoCellShipThree] = createShip?.({
//   randomRange: [2, 9],
//   randomLetterRangeProp: ["b", "i"],
//   size: 2,
// });

createShipCount = 0;

// }
// Make it flat and check whether we have a new coord there or not, and if yes then we regenerate a random number again and stuff again, top and bottom do all coords, and right and left do only the side coords
let createEnemyShips = [
  [oneCellShipOne, oneCellShipOne.length],
  [oneCellShipTwo, oneCellShipTwo.length],
  [oneCellShipThree, oneCellShipThree.length],
  [oneCellShipFour, oneCellShipFour.length],

  [twoCellShipOne, twoCellShipOne.length],
  [twoCellShipTwo, twoCellShipTwo.length],
  [twoCellShipThree, twoCellShipThree.length],
  [threeCellShipOne, threeCellShipOne.length],
  [threeCellShipTwo, threeCellShipTwo.length],

  [fourCellShip, fourCellShip.length],

  // [["a1"], ["d10"].length],
  // [["c1"], ["d10"].length],
  // [["e1"], ["d10"].length],
  // [["a3"], ["d10"].length],

  // [["i5", "j5"], ["e6", "e7"].length],
  // [["i7", "j7"], ["e6", "e7"].length],
  // [["d4", "e4", "f4", "g4"], ["J4", "I4", "h4", "e4"].length],
  // [["h2", "i2", "j2"], ["J4", "I4", "h4"].length],
  // [["e9", "f9"], ["e6", "e7"].length],
  // [["b5", "b6", "b7"], ["J4", "I4", "h4"].length],
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
