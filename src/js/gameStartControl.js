import {
  mySideMyFleet,
  enemySideEnemyFleet,
  mySideEnemyFleet,
  enemySideMyFleet,
  enemySideMyShips,
  mySideEnemyShips,
  bothSideShips,
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

const playingCheck = { playing: false };

let bothFleetsReady = [];
let newGameAgreement = [];
let firstTurn = "";
let checkCells;

export { playingCheck, bothFleetsReady, newGameAgreement };

export const gameStartControl = function (fleet, fleetParts) {
  const fleetIsEnemySideMyFleet = fleet === enemySideMyFleet;

  const startPlaying = function () {
    playingCheck.playing = false;
    newGameAgreement.splice(0);

    fleet === mySideEnemyFleet && (firstTurn = Math.random());
    (fleetIsEnemySideMyFleet ? startGameBtn1 : startGameBtn2).setAttribute(
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

    let createMoreShips = [
      [[findCell("cell1")], [0].length],
      [[findCell("cell2")], [0].length],
      [[findCell("cell3")], [0].length],
      [[findCell("cell7")], [0].length],

      [[findCell("cell13"), findCell("cell14")], [0, 0].length],
      [[findCell("cell17"), findCell("cell18")], [0, 0].length],
      [[findCell("cell19"), findCell("cell20")], [0, 0].length],

      [
        [findCell("cell4"), findCell("cell5"), findCell("cell6")],
        [0, 0, 0].length,
      ],
      [
        [findCell("cell12"), findCell("cell15"), findCell("cell16")],
        [0, 0, 0].length,
      ],

      [
        [
          findCell("cell8"),
          findCell("cell9"),
          findCell("cell10"),
          findCell("cell11"),
        ],

        [0, 0, 0, 0].length,
      ],
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
        }
      });

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

    const ships = fleetParts[1];
    bothSideShips.push(ships);

    (fleetIsEnemySideMyFleet ? errorMessage1 : errorMessage2).style.opacity =
      "0";

    bothFleetsReady.push(true);
    allowForbidClick(
      fleetIsEnemySideMyFleet ? mySideMyFleet : enemySideEnemyFleet,
      "none"
    );

    [...document.querySelectorAll(".ship")].forEach((shipEl) => {
      bothFleetsReady.length === 2 && (shipEl.textContent = "");
    });

    const submarines = ships.filter((ship) => {
      const shipEl = fleet.querySelector(`.${ship.coords[0]}`);
      return ship.coords.length === 1;
    });

    const rewardSubmarine = Math.trunc(Math.random() * 4) + 1;

    submarines.forEach((submarine, i) => {
      i + 1 === rewardSubmarine
        ? fleet
            .querySelector(`.${submarine.coords[0]}`)
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
        });
      fleet.querySelectorAll(".ship").forEach((ship) => {
        ship.textContent = "";
      });
    }

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

    console.log(flattenedBothSideShips, "both");

    (fleetIsEnemySideMyFleet ? startGameBtn1 : startGameBtn2).style.display =
      "none";
    (fleetIsEnemySideMyFleet
      ? waitingForOpponentLabel1
      : waitingForOpponentLabel2
    ).style.opacity = "100";

    if (flattenedBothSideShips.length === createFleetShips.length * 2 + 2) {
      [waitingForOpponentLabel1, waitingForOpponentLabel2].forEach((label) => {
        label.style.opacity = "0";
      });
    }

    console.log(flattenedBothSideShips);
    if (
      flattenedBothSideShips.length === createFleetShips.length * 2 + 2 &&
      flattenedBothSideShips.includes("mySideEnemyFleet") &&
      flattenedBothSideShips.includes("enemySideMyFleet")
    ) {
      [changeUsernameBtn1, changeUsernameBtn2].forEach((btn) => {
        btn.setAttribute("disabled", true);
        btn.style.display = "block";
      });
      closeUsernameForm(mySideMyFleet, "none");
      closeUsernameForm(enemySideEnemyFleet, "none");

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
      // });

      // Making sure that I will not destroy my own ship ;)
      allowForbidClick(mySideMyFleet, "none"),
        allowForbidClick(enemySideEnemyFleet, "none");
    }

    console.log(firstTurn);

    if (!playingCheck.playing) return;
    getSeaOpacityBack();

    const defineFirstTurn = function (fleet, contraryFleet) {
      allowForbidClick(fleet, "auto");
      startTimer(fleet);
      contraryFleet.closest(".sea").style.opacity = "0.7";
    };

    if (fleet === mySideEnemyFleet || fleet === enemySideMyFleet) {
      firstTurn < 0.5 && defineFirstTurn(mySideEnemyFleet, enemySideMyFleet);
      firstTurn >= 0.5 && defineFirstTurn(enemySideMyFleet, mySideEnemyFleet);
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
};
