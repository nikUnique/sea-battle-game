import {
  randomNumberFromRange,
  randomLetterFun,
  checkShipSafety,
  remakeShip,
  generateSurroundingFields,
} from "./shipMakeHelpers.js";
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
let randomCoordCount = 0;
let multipleShipsSets = [];
let multipleShipsObjectSets = [];

function createShip({ randomRange, randomLetterRangeProp, size }) {
  createShipCount++;
  console.log("createShipCountrand", createShipCount);

  const checkFleetBusiness = readyEnemyShips?.flatMap((coord) =>
    coord?.toLowerCase()
  );

  let randomNumber,
    randomNumberForLetter,
    randomLetter,
    randomFromRange,
    randomLetterRange,
    randomCoord,
    isHorizontal,
    isTop,
    isRight,
    randomCoordByNumber,
    randomCoordByLetter;

  function regenerateRandomCoord() {
    console.log("RandomCoordCount", randomCoordCount);
    randomCoordCount++;

    randomNumber = Math.floor(Math.random() * 10) + 1;
    randomNumberForLetter = Math.floor(Math.random() * 10);

    randomLetter = lowerLetters[randomNumberForLetter];
    randomFromRange = randomNumberFromRange(randomRange[0], randomRange[1]);
    randomLetterRange = randomLetterFun(
      randomLetterRangeProp[0],
      randomLetterRangeProp[1]
    );

    // Is horizontal or not
    isHorizontal = Math.random() < 0.5;
    isTop = Math.random() < 0.5;
    isRight = Math.random() < 0.5;

    randomCoordByNumber = randomLetter + randomFromRange;
    randomCoordByLetter = randomLetterRange + randomNumber;

    if (isHorizontal) {
      console.log("randomCoordbyLetter", randomCoordByLetter);
      randomCoord = randomCoordByLetter;
    }
    if (!isHorizontal) {
      console.log("randomCoordByNumber", randomCoordByNumber);
      randomCoord = randomCoordByNumber;
    }
  }

  regenerateRandomCoord();

  const isShipNotSafe = checkShipSafety([randomCoord], checkFleetBusiness);

  if (!isShipNotSafe) {
    regenerateRandomCoord();
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

function createMultipleShipsSets() {
  let fourCellShip,
    threeCellShipOne,
    twoCellShipOne,
    twoCellShipTwo,
    twoCellShipThree,
    threeCellShipTwo,
    oneCellShipOne,
    oneCellShipTwo,
    oneCellShipThree,
    oneCellShipFour;

  [oneCellShipOne] = createShip?.({
    randomRange: [1, 10],
    randomLetterRangeProp: ["a", "j"],
    size: 1,
  });
  [oneCellShipTwo] = createShip?.({
    randomRange: [1, 10],
    randomLetterRangeProp: ["a", "j"],
    size: 1,
  });
  [oneCellShipThree] = createShip?.({
    randomRange: [1, 10],
    randomLetterRangeProp: ["a", "j"],
    size: 1,
  });
  [oneCellShipFour] = createShip?.({
    randomRange: [1, 10],
    randomLetterRangeProp: ["a", "j"],
    size: 1,
  });

  [twoCellShipOne] = createShip?.({
    randomRange: [2, 9],
    randomLetterRangeProp: ["b", "i"],
    size: 2,
  });

  [fourCellShip] = createShip?.({
    randomRange: [4, 7],
    randomLetterRangeProp: ["d", "g"],
    size: 4,
  });

  [threeCellShipOne] = createShip?.({
    randomRange: [3, 8],
    randomLetterRangeProp: ["c", "h"],
    size: 3,
  });

  [threeCellShipTwo] = createShip?.({
    randomRange: [3, 8],
    randomLetterRangeProp: ["c", "h"],
    size: 3,
  });

  [twoCellShipTwo] = createShip?.({
    randomRange: [2, 9],
    randomLetterRangeProp: ["b", "i"],
    size: 2,
  });

  [twoCellShipThree] = createShip?.({
    randomRange: [2, 9],
    randomLetterRangeProp: ["b", "i"],
    size: 2,
  });

  multipleShipsSets = [...multipleShipsSets, readyEnemyShips];
  readyEnemyShips = [];

  multipleShipsObjectSets = [
    ...multipleShipsObjectSets,
    [
      fourCellShip,
      threeCellShipOne,
      twoCellShipOne,
      twoCellShipTwo,
      twoCellShipThree,
      threeCellShipTwo,
      oneCellShipOne,
      oneCellShipTwo,
      oneCellShipThree,
      oneCellShipFour,
    ],
  ];

  if (multipleShipsSets.length < 30) {
    // console.log("multipelShipSetsOur", multipleShipsSets);
    // console.log("multipleShipsSets in a loopour", multipleShipsSets.length);
    createMultipleShipsSets();
  }

  return {
    fourCellShip,
    threeCellShipOne,
    twoCellShipOne,
    twoCellShipTwo,
    twoCellShipThree,
    threeCellShipTwo,
    oneCellShipOne,
    oneCellShipTwo,
    oneCellShipThree,
    oneCellShipFour,
  };
}

createMultipleShipsSets();

// console.log("multipleInstancesour", multipleShipsSets);

// const muiltipleSetsWithoutSingleCoords = filteredWithoutSingleShips.filter((coordArray, i) => {

// })

const muiltipleSetsWithoutSingleCoords = multipleShipsObjectSets
  .map((shipObjArr, i) => {
    return shipObjArr.filter((coordsArr) => {
      return coordsArr.length > 2;
    });
  })
  .map((shipObjArr, i) => {
    return shipObjArr.flat();
  });

// console.log(
//   "muiltipleSetsWithoutSingleCoords",
//   muiltipleSetsWithoutSingleCoords
// );

const sizeOfTheBestSet = muiltipleSetsWithoutSingleCoords.map((shipArr, i) => {
  return shipArr.filter((coord) => {
    return (
      "a,j".indexOf(coord.slice(0, 1)) >= 0 ||
      "1,10".indexOf(coord.slice(1)) >= 0
    );
  });
});
// console.log("sizeOfTheBEstour", sizeOfTheBestSet);

const bestArr = sizeOfTheBestSet.reduce(
  (acc, shipArr, i) => {
    console.log("acc", shipArr, acc);

    if (shipArr.length > acc?.size) {
      return {
        size: shipArr.length,
        index: i,
      };
    }

    if (shipArr.length <= acc?.size) {
      return {
        size: acc.size,
        index: acc.index,
      };
    }
  },
  {
    size: 0,
    index: 0,
  }
);

console.log("bestArr", bestArr);
console.log("multipleShipObjects", multipleShipsObjectSets);

const [
  fourCellShip,
  threeCellShipOne,
  twoCellShipOne,
  twoCellShipTwo,
  twoCellShipThree,
  threeCellShipTwo,
  oneCellShipOne,
  oneCellShipTwo,
  oneCellShipThree,
  oneCellShipFour,
] = multipleShipsObjectSets[bestArr.index];

// Get the index of the array with the most elements

// console.log("shipAnalysisour", bestOfTheBestSet);

console.log("We should wait");

createShipCount = 0;
randomCoordCount = 0;

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
  // [fourCellShipTwo, fourCellShip.length],

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

const duration = {
  duration: 0,
};

const lottieSplash = {
  waterSplash: "",
};

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
  lowerLetters,
  duration,
  lottieSplash,
  // overlay,
};
