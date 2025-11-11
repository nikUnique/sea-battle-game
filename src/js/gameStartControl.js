import {
  AMOUNT_OF_DESTROYERS,
  BOTH_FLEETS_READY_COMPLETE_LENGTH,
  IN_BETWEEN_SHIP_PART_LENGTH,
} from "./config";

import {
  mySideMyFleet,
  enemySideEnemyFleet,
  mySideEnemyFleet,
  enemySideMyFleet,
  enemySideMyShips,
  mySideEnemyShips,
  bothSideShips,
  createEnemyShips,
  newGameBtn2,
  newGameBtn1,
  startGameBtn1,
  startGameBtn2,
  waitingForOpponentLabel1,
  waitingForOpponentLabel2,
  changeUsernameBtn1,
  changeUsernameBtn2,
  errorMessage1,
  errorMessage2,
} from "./globalVars";

import {
  allowForbidClick,
  buildShipBorder,
  closeUsernameForm,
  getSeaOpacityBack,
  selectCellsAround,
  startTimer,
} from "./helpers";
import { computerShotHandler } from "./shootingLogic";

// Shows the current state of the game
const playingCheck = { playing: false };

const whoseTurn = { turn: "" };

// Helps to define whether both sides built their fleets and ready to start or not
let bothFleetsReady = [];

// Helpes to define whether both sides agree to start a new game or not
let newGameAgreement = [];

// This variable is for random number to define who will be the first to start the game
let firstTurn;

// Helps to define whether all ships are placed in the right way or not
let checkCells;

export { playingCheck, bothFleetsReady, newGameAgreement, whoseTurn };

export const gameStartControl = function (fleet, fleetParts) {
  const fleetIsEnemySideMyFleet = fleet === enemySideMyFleet;

  const startPlaying = function () {
    playingCheck.playing = false;

    // Reset newGameAgreement
    newGameAgreement.splice(0);

    fleet === mySideEnemyFleet && (firstTurn = Math.random());

    // Right now this isn't necessary because the button just disappers after being clicked
    (fleetIsEnemySideMyFleet ? startGameBtn1 : startGameBtn2).setAttribute(
      "disabled",
      true
    );

    allowForbidClick(fleet, "none");
    console.log(fleet);

    // Finds all ship parts and takes their coords
    const findCell = function (cell) {
      return `${
        (fleetIsEnemySideMyFleet
          ? mySideMyFleet
          : enemySideEnemyFleet
        ).querySelector(`.${cell}`)?.classList[0]
      }`;
    };

    let createFleetShips = [
      [[findCell("cell1")], [0].length],
      [[findCell("cell2")], [0].length],
      [[findCell("cell3")], [0].length],
      [[findCell("cell4")], [0].length],

      [[findCell("cell8"), findCell("cell9")], [0, 0].length],

      [[findCell("cell10"), findCell("cell11")], [0, 0].length],

      [[findCell("cell12"), findCell("cell13")], [0, 0].length],

      [
        [findCell("cell5"), findCell("cell6"), findCell("cell7")],
        [0, 0, 0].length,
      ],

      [
        [findCell("cell14"), findCell("cell15"), findCell("cell16")],

        [0, 0, 0].length,
      ],

      [
        [
          findCell("cell17"),
          findCell("cell18"),
          findCell("cell19"),
          findCell("cell20"),
        ],

        [0, 0, 0, 0].length,
      ],
    ];

    let enemyUpperCaseShips = createEnemyShips.map((el) => {
      const properArray = [el[0].map((coord) => coord.toUpperCase()), el[1]];

      return properArray;
    });

    let createMoreShips = enemyUpperCaseShips;
    //  [
    //   [[findCell("cell1")], [0].length],
    //   [[findCell("cell2")], [0].length],
    //   [[findCell("cell3")], [0].length],
    //   [[findCell("cell7")], [0].length],

    //   [[findCell("cell13"), findCell("cell14")], [0, 0].length],

    //   [[findCell("cell17"), findCell("cell18")], [0, 0].length],

    //   [[findCell("cell19"), findCell("cell20")], [0, 0].length],

    //   [
    //     [findCell("cell4"), findCell("cell5"), findCell("cell6")],
    //     [0, 0, 0].length,
    //   ],

    //   [
    //     [findCell("cell12"), findCell("cell15"), findCell("cell16")],
    //     [0, 0, 0].length,
    //   ],

    //   [
    //     [
    //       findCell("cell8"),
    //       findCell("cell9"),
    //       findCell("cell10"),
    //       findCell("cell11"),
    //     ],

    //     [0, 0, 0, 0].length,
    //   ],
    // ];

    const createManuallyPlacedShips = function (createSource, ships) {
      // Reset previous ships
      ships.splice(0);

      // When fleet is built before manually placing ships, coords are sorted, but when one ship part moved to another place then ships coords may be messed up and so I sorted them again
      let sortCoords = createSource.map((ship) => {
        // ship contains fleet, coords, size and direction
        const sortedLeters = ship[0]
          .map((coord) => {
            return coord.slice(0, 1);
          })
          .sort();

        const sortedNumbers = ship[0]
          .map((coord) => {
            return coord.slice(1);
          })
          .sort((a, b) => a - b);

        const sortedCoords = ship[0].map((coord, i) => {
          return sortedLeters[i] + sortedNumbers[i];
        });

        console.log(sortedCoords);

        if (createShip(sortedCoords, ship[1], fleetParts) === false) {
          return false;
        }

        // This part is required to keep 4-cell ships whole because unlike other ships when this ships divided into 2 part then condition when at least 1 cell to the right, left, top and bottom still will be fulfilled
        if (sortedCoords.length === 4) {
          const inBetweenShipParts = sortedCoords.filter((cell, i, arr) => {
            return i !== 0 && i !== arr.length - 1;
          });

          // Here is a similar idea as before, but here the ship is whole only if in between ship parts have 2 neighbour ship parts each which will be checked later and based on that it will be defined whether the ship is whole or not
          checkCells = inBetweenShipParts
            .map((cell) => {
              const cellAttrbs = selectCellsAround(cell);

              const selectCell = function (cell) {
                // Only cells which contain ships have nextElementSibling
                return fleet.querySelector(`.${cell}`)?.nextElementSibling;
              };
              return [
                selectCell(cellAttrbs.previousCell),

                selectCell(cellAttrbs.nextCell),

                selectCell(cellAttrbs.rightCell),

                selectCell(cellAttrbs.leftCell),
              ];
            })
            .map((cellArr) => {
              return cellArr.filter((cellEl) => {
                return cellEl && cellEl;
              });
            });
        }
      });

      // if (fleet === mySideEnemyFleet || fleet === enemySideEnemyFleet) {
      //   sortCoords = sortCoords.map((coord) =>
      //     coord === false ? undefined : coord
      //   );
      //   checkCells = [
      //     [true, true],
      //     [true, true],
      //   ];
      // }

      console.log("checksells", checkCells);

      return sortCoords;
    };

    const checkProperShipPlacement = function () {
      const resetWrongShipPlacement = function () {
        console.log("Place your ships in the right way, 🐒");

        (fleetIsEnemySideMyFleet
          ? startGameBtn1
          : startGameBtn2
        ).removeAttribute("disabled", true);

        (fleetIsEnemySideMyFleet
          ? errorMessage1
          : errorMessage2
        ).style.opacity = "100";

        [...fleet.querySelectorAll("td")].forEach((cell) => {
          cell.querySelector(".ship")?.remove();

          cell.removeAttribute("style");

          cell.querySelector(".cell").textContent = "";
        }),
          // Clear ships arr
          fleetParts[1].splice(0);

        return false;
      };

      if (
        // The function call depends on what fleet is current one and later it checks whether 4-cell ship is whole or not

        createManuallyPlacedShips(
          fleetIsEnemySideMyFleet ? createFleetShips : createMoreShips,
          fleetIsEnemySideMyFleet ? enemySideMyShips : mySideEnemyShips
        ).includes(false) ||
        checkCells?.flat(2).length !== IN_BETWEEN_SHIP_PART_LENGTH
      ) {
        return resetWrongShipPlacement();
      }
    };

    if (
      checkProperShipPlacement() === false /* &&
      fleet !== enemySideEnemyFleet &&
      fleet !== mySideEnemyFleet */
    ) {
      console.log("Yeah, that is wrong");
      return;
    }

    const ships = fleetParts[1];

    // If ships were placed in the right way this means that the fleet is ready to play and ships are pushed in the arr bellow
    bothSideShips.push(ships);

    // If ships were placed in the wrong way and the "Ready to start" button was pressed, then an error message bellow the grid will appear showing that ship placement is wrong. But if after that ships were placed in the right way then after pressing the button that error message will be gone
    (fleetIsEnemySideMyFleet ? errorMessage1 : errorMessage2).style.opacity =
      "0";

    // If code execution reaches this place, this means that ships were placed in the right way and player is ready to play
    bothFleetsReady.push(true);

    allowForbidClick(
      fleetIsEnemySideMyFleet ? mySideMyFleet : enemySideEnemyFleet,
      "none"
    );

    // Filtering out one-cell ships
    const destroyers = ships.filter((ship) => {
      const shipEl = fleet.querySelector(`.${ship.coords[0]}`);

      return ship.coords.length === 1;
    });

    // Randomly define which destroyer will contain reward
    const rewardDestroyer =
      Math.trunc(Math.random() * AMOUNT_OF_DESTROYERS) + 1;

    // Assign reward
    destroyers.forEach((destroyer, i) => {
      i + 1 === rewardDestroyer
        ? fleet
            .querySelector(`.${destroyer.coords[0]}`)
            .nextElementSibling.classList.add("reward")
        : "";
    });

    const addBorder = function (borderSide, coord) {
      const fleetSide = fleetIsEnemySideMyFleet
        ? mySideMyFleet
        : enemySideEnemyFleet;

      fleetSide &&
        (fleetSide.querySelector(`.${coord}`).closest(".dropzone").style[
          borderSide
        ] = "2px solid  #22b8cf");
    };

    if (bothFleetsReady.length === 1) {
      (fleet === mySideEnemyFleet ? enemySideEnemyFleet : mySideMyFleet)
        .querySelectorAll(".ship")
        .forEach((ship) => {
          ship.classList.remove("ship-color");
          ship.textContent = "";
          ship.style.backgroundColor = "#e6fcf5";
        });
      fleet.querySelectorAll(".ship").forEach((ship) => {
        ship.textContent = "";
        // ship.style.backgroundColor = "#e6fcf5";
      });
    }

    [...document.querySelectorAll(".ship")].forEach((shipEl) => {
      bothFleetsReady.length === 2 && (shipEl.textContent = "");
    });

    // Changes background-color of ships of the player who pressed "Ready to start" button the second
    bothFleetsReady.length === BOTH_FLEETS_READY_COMPLETE_LENGTH &&
      [mySideMyFleet, enemySideEnemyFleet].forEach((fleet) => {
        fleet.querySelectorAll(`.ship`).forEach((ship) => {
          ship.style.backgroundColor = "#e6fcf5";
        });
      });

    ships.map((ship, i) => {
      ship.coords.map((coord, i, arr) => {
        // Once player is ready to start, border will be built on ships
        buildShipBorder([ship, coord, i, arr, addBorder]);
      });
    });

    // All actions relative to your own fleet are finished, so there are left thing to do with the second sea part
    if (fleet !== mySideEnemyFleet && fleet !== enemySideMyFleet) return;

    /* fleet === mySideEnemyFleet && bothSideShips.push("mySideEnemyFleet");

    fleetIsEnemySideMyFleet && bothSideShips.push("enemySideMyFleet"); */

    const flattenedBothSideShips = bothSideShips.flat(2);

    console.log(flattenedBothSideShips, "both");

    (fleetIsEnemySideMyFleet ? startGameBtn1 : startGameBtn2).style.display =
      "none";

    // When your opponent is ready to play, you will see a message informing about that
    (fleetIsEnemySideMyFleet
      ? waitingForOpponentLabel1
      : waitingForOpponentLabel2
    ).style.opacity = "100";

    // If both player are ready to play then informing messages will disappear
    if (
      flattenedBothSideShips.length ===
      createFleetShips.length * 2 /* + 2 */
    ) {
      [waitingForOpponentLabel1, waitingForOpponentLabel2].forEach((label) => {
        label.style.opacity = "0";
      });
    }

    console.log(flattenedBothSideShips);
    if (
      // The condition which fulfillment shows that ships were placed in the right way
      flattenedBothSideShips.length ===
      createFleetShips.length * 2 /* + 2 &&
      flattenedBothSideShips.includes("mySideEnemyFleet") &&
      flattenedBothSideShips.includes("enemySideMyFleet") */
    ) {
      [changeUsernameBtn1, changeUsernameBtn2].forEach((btn) => {
        btn.setAttribute("disabled", true);
      });

      closeUsernameForm(mySideMyFleet, "none");

      closeUsernameForm(enemySideEnemyFleet, "none");

      playingCheck.playing = true;
      console.log("Game started 🥰");

      console.log(playingCheck.playing, "playing");

      // Disable right-click
      document.addEventListener("contextmenu", (e) => e.preventDefault());
      function ctrlShiftKey(e, key) {
        return e.ctrlKey && e.shiftKey && e.key === key.charCodeAt(0);
      }
      document.onkeydown = (e) => {
        // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
        if (
          e.key === 123 ||
          ctrlShiftKey(e, "I") ||
          ctrlShiftKey(e, "J") ||
          ctrlShiftKey(e, "C") ||
          (e.ctrlKey && e.key === "U".charCodeAt(0))
        )
          return false;
      };

      // Making sure that I will not destroy my own ship ;)
      allowForbidClick(mySideMyFleet, "none");

      allowForbidClick(enemySideEnemyFleet, "none");
    }

    if (!playingCheck.playing) return;
    getSeaOpacityBack();

    const defineFirstTurn = function (fleet, contraryFleet) {
      whoseTurn.turn = fleet;
      allowForbidClick(fleet, "auto");
      startTimer(fleet);

      if (whoseTurn.turn === enemySideMyFleet && fleet === enemySideMyFleet) {
        computerShotHandler();
      }

      contraryFleet.closest(".sea").style.opacity = "0.7";
    };

    if (fleet === mySideEnemyFleet || fleet === enemySideMyFleet) {
      firstTurn < 0.5 && defineFirstTurn(mySideEnemyFleet, enemySideMyFleet);

      if (firstTurn >= 0.5) {
        defineFirstTurn(enemySideMyFleet, mySideEnemyFleet);
      }
    }

    [newGameBtn1, newGameBtn2].forEach((btn) => {
      btn.removeAttribute("disabled", true);
    });
  };

  fleet !== mySideMyFleet &&
    fleet !== enemySideEnemyFleet &&
    (fleetIsEnemySideMyFleet ? startGameBtn1 : startGameBtn2).addEventListener(
      "click",
      startPlaying
    );

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Computer is ready to play in 5 seconds
  setTimeout(async function () {
    startGameBtn2.click();
  }, 5000);
};
