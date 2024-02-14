import {
  mySideMyFleet,
  enemySideEnemyFleet,
  mySideEnemyFleet,
  enemySideMyFleet,
  enemySideMyShips,
  mySideEnemyShips,
  bothSideShips,
  newGameBtn2,
  newGameBtn,
  startGameBtn,
  startGameBtn2,
} from "./globalVars";
import {
  allowForbidClick,
  buildShipBorder,
  getSeaOpacityBack,
  selectCellsAround,
  startTimer,
} from "./helpers";

const playingCheck = { playing: false };

let bothFleetsReady = [];
let newGameAgreement = [];
export { playingCheck, bothFleetsReady, newGameAgreement };
let firstTurn = "";
let checkCells;

export const gameStartControl = function (fleet, fleetParts) {
  // playing = false;
  const fleetIsEnemySideMyFleet = fleet === enemySideMyFleet;

  const startPlaying = function (e) {
    playingCheck.playing = false;
    newGameAgreement.splice(0);

    fleet === mySideEnemyFleet && (firstTurn = Math.random());
    (fleetIsEnemySideMyFleet ? startGameBtn : startGameBtn2).setAttribute(
      "disabled",
      true
    );

    allowForbidClick(fleet, "none");
    console.log(fleet);
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
      // [[findCell("cell2")], [0].length],
      // [[findCell("cell3")], [0].length],
      // [
      //   [findCell("cell4"), findCell("cell5"), findCell("cell6")],
      //   [0, 0, 0].length,
      // ],
      // [[findCell("cell7"), findCell("cell8")], [0, 0].length],
      [
        [findCell("cell3"), findCell("cell4"), findCell("cell5")],

        [0, 0, 0].length,
      ],
      // [[findCell("cell12"), findCell("cell14")], [0, 0].length],
      [[findCell("cell6"), findCell("cell7")], [0, 0].length],
      [
        [
          findCell("cell8"),
          findCell("cell9"),
          findCell("cell10"),
          findCell("cell11"),
        ],

        [0, 0, 0, 0].length,
      ],
      // [[findCell("cell19")], [0].length],
    ];

    let createMoreShips = [
      [[findCell("cell1")], [0].length],
      [[findCell("cell2")], [0].length],
      // [[findCell("cell2")], [0].length],
      // [[findCell("cell3")], [0].length],
      // [[findCell("cell4")], [0].length],
      [
        [
          findCell("cell6"),
          findCell("cell7"),
          findCell("cell8"),
          findCell("cell9"),
        ],

        [0, 0, 0, 0].length,
      ],
      [
        [findCell("cell3"), findCell("cell4"), findCell("cell5")],
        [0, 0, 0].length,
      ],
      // [[findCell("cell8"), findCell("cell9")], [0, 0].length],
      // [[findCell("cell10"), findCell("cell11")], [0, 0].length],

      // [
      //   [findCell("cell12"), findCell("cell13"), findCell("cell14")],

      //   [0, 0, 0].length,
      // ],

      [[findCell("cell10"), findCell("cell11")], [0, 0].length],
    ];

    const createManuallyPlacedShips = function (createSource, ships) {
      ships.splice(0);

      const sortCoords = createSource.map((ship) => {
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

        if (sortedCoords.length === 4) {
          const inBetweenShipParts = sortedCoords.filter((cell, i, arr) => {
            return i !== 0 && i !== arr.length - 1;
          });

          checkCells = inBetweenShipParts
            .map((cell) => {
              fleet.querySelector(`.${cell}`).classList;

              const cellAttrbs = selectCellsAround(cell);

              const selectCell = function (cell) {
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

          console.log(inBetweenShipParts, "inBetween");
          console.log(checkCells.flat(2), "check");
        }
      });

      return sortCoords;
    };

    const checkProperShipPlacement = function () {
      const resetWrongShipPlacement = function () {
        console.log("Place your ships in the right way, 🐒");

        (fleetIsEnemySideMyFleet
          ? startGameBtn
          : startGameBtn2
        ).removeAttribute("disabled", true);

        [...fleet.querySelectorAll("td")].forEach((cell) => {
          cell.querySelector(".ship")?.remove();
          cell.removeAttribute("style");
          cell.querySelector(".cell").textContent = "";
        }),
          console.log(fleetParts[1]);
        fleetParts[1].splice(0);

        return false;
      };
      if (
        createManuallyPlacedShips(
          fleetIsEnemySideMyFleet ? createFleetShips : createMoreShips,
          fleetIsEnemySideMyFleet ? enemySideMyShips : mySideEnemyShips
        ).includes(false) ||
        checkCells.flat(2).length !== 4
      ) {
        return resetWrongShipPlacement();
      }
    };
    if (checkProperShipPlacement() === false) {
      console.log("Yeah, that is wrong");
      return;
    }

    bothFleetsReady.push(true);
    allowForbidClick(
      fleetIsEnemySideMyFleet ? mySideMyFleet : enemySideEnemyFleet,
      "none"
    );

    [...document.querySelectorAll(".ship")].forEach((shipEl) => {
      bothFleetsReady.length === 2 && (shipEl.textContent = "");
    });

    const ships = fleetParts[1];

    const submarines = ships.filter((ship) => {
      const shipEl = fleet.querySelector(`.${ship.coords[0]}`);
      console.log(shipEl.classList[0]);
      return ship.coords.length === 1;
    });

    const rewardSubmarine = Math.trunc(Math.random() * 2) + 1;
    console.log(rewardSubmarine);
    console.log(submarines);
    submarines.forEach((submarine, i) => {
      i + 1 === rewardSubmarine
        ? fleet
            .querySelector(`.${submarine.coords[0]}`)
            .nextElementSibling.classList.add("reward")
        : "";
    });

    bothSideShips.push(ships);

    const addBorder = function (borderSide, coord) {
      const fleetSide = fleetIsEnemySideMyFleet
        ? mySideMyFleet
        : enemySideEnemyFleet;
      fleetSide &&
        (fleetSide.querySelector(`.${coord}`).closest(".dropzone").style[
          borderSide
        ] = "2px solid #3bc9db");
    };

    bothFleetsReady.length === 1 &&
      (fleet === mySideEnemyFleet ? enemySideEnemyFleet : mySideMyFleet)
        .querySelectorAll(".ship")
        .forEach((ship) => {
          ship.classList.remove("ship-color");
          ship.textContent = "";
        });

    bothFleetsReady.length === 2 &&
      [mySideMyFleet, enemySideEnemyFleet].forEach((fleet) => {
        fleet.querySelectorAll(`.ship`).forEach((ship) => {
          ship.style.backgroundColor = "#e6fcf5";
        });
      });

    ships.map((ship, i) => {
      ship.coords.map((coord, i, arr) => {
        buildShipBorder([ship, coord, i, arr, addBorder]);
      });
    });

    if (fleet !== mySideEnemyFleet && fleet !== enemySideMyFleet) return;

    fleet === mySideEnemyFleet && bothSideShips.push("mySideEnemyFleet");
    fleetIsEnemySideMyFleet && bothSideShips.push("enemySideMyFleet");

    const flattenedBothSideShips = bothSideShips.flat(2);

    console.log(flattenedBothSideShips);
    if (
      flattenedBothSideShips.length === createFleetShips.length * 2 + 2 &&
      flattenedBothSideShips.includes("mySideEnemyFleet") &&
      flattenedBothSideShips.includes("enemySideMyFleet")
    ) {
      playingCheck.playing = true;
      console.log("Game started 🥰");
      console.log(playingCheck.playing, "playing");

      // Disable right-click
      // document.addEventListener("contextmenu", (e) => e.preventDefault());
      // function ctrlShiftKey(e, key) {
      //   return e.ctrlKey && e.shiftKey && e.key === key.charCodeAt(0);
      // }
      // (document.onkeydown = (e) => {
      //   // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
      //   if (
      //     e.key === 123 ||
      //     ctrlShiftKey(e, "I") ||
      //     ctrlShiftKey(e, "J") ||
      //     ctrlShiftKey(e, "C") ||
      //     (e.ctrlKey && e.key === "U".charCodeAt(0))
      //   )
      //     return false;
      // }),

      // Making sure that I will not destroy my own ship ;)
      allowForbidClick(mySideMyFleet, "none"),
        allowForbidClick(
          enemySideEnemyFleet,

          "none"
        );
    }

    console.log(firstTurn);

    if (!playingCheck.playing) return;
    getSeaOpacityBack();
    mySideEnemyFleet
      ? (firstTurn < 0.5 &&
          (allowForbidClick(mySideEnemyFleet, "auto"),
          startTimer(mySideEnemyFleet),
          (enemySideMyFleet.closest(".sea").style.opacity = "0.7")),
        firstTurn >= 0.5 &&
          (allowForbidClick(enemySideMyFleet, "auto"),
          startTimer(enemySideMyFleet),
          (mySideEnemyFleet.closest(".sea").style.opacity = "0.7")))
      : "";
    [newGameBtn, newGameBtn2].forEach((btn) => {
      console.log("btn");
      btn.removeAttribute("disabled", true);
    });
  };

  fleet !== mySideMyFleet &&
    fleet !== enemySideEnemyFleet &&
    (fleetIsEnemySideMyFleet ? startGameBtn : startGameBtn2).addEventListener(
      "click",
      startPlaying
    );
};

// Nice idea about making binoculars for 10 seconds to find more ships

// Binoculars feature:
// 1. When you destroyed a ship for which destruction there should be an award in a kind of magic video camera then for 10 seconds hovering effect on ships will be different from hovering effect on empty cells
// If destroyed ship has reward class then add binoculars to the fleet on which that ship was destroyed, but before I need randomly add this reward class to the ship in the beginning of the game
// Take all ship's classes and assign one of them to the ship
