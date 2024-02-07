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
} from "./helpers";

let playing;
let bothFleetsReady = [];
let newGameAgreement = [];
export { playing, bothFleetsReady, newGameAgreement };
let firstTurn = "";

export const gameStartControl = function (fleet, fleetParts) {
  // playing = false;
  const fleetIsEnemySideMyFleet = fleet === enemySideMyFleet;

  const startPlaying = function (e) {
    playing = false;
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
      // [[findCell("cell2")], [0].length],
      // [[findCell("cell3")], [0].length],
      // [
      //   [findCell("cell4"), findCell("cell5"), findCell("cell6")],
      //   [0, 0, 0].length,
      // ],
      // [[findCell("cell7"), findCell("cell8")], [0, 0].length],
      [
        [findCell("cell2"), findCell("cell3"), findCell("cell4")],

        [0, 0, 0].length,
      ],
      // [[findCell("cell12"), findCell("cell14")], [0, 0].length],
      [[findCell("cell5"), findCell("cell6")], [0, 0].length],
      [
        [
          findCell("cell7"),
          findCell("cell8"),
          findCell("cell9"),
          findCell("cell10"),
        ],

        [0, 0, 0, 0].length,
      ],
      // [[findCell("cell19")], [0].length],
    ];

    let createMoreShips = [
      [[findCell("cell1")], [0].length],
      // [[findCell("cell2")], [0].length],
      // [[findCell("cell3")], [0].length],
      // [[findCell("cell4")], [0].length],
      [
        [
          findCell("cell5"),
          findCell("cell6"),
          findCell("cell7"),
          findCell("cell8"),
        ],

        [0, 0, 0, 0].length,
      ],
      [
        [findCell("cell2"), findCell("cell3"), findCell("cell4")],
        [0, 0, 0].length,
      ],
      // [[findCell("cell8"), findCell("cell9")], [0, 0].length],
      // [[findCell("cell10"), findCell("cell11")], [0, 0].length],

      // [
      //   [findCell("cell12"), findCell("cell13"), findCell("cell14")],

      //   [0, 0, 0].length,
      // ],

      [[findCell("cell9"), findCell("cell10")], [0, 0].length],
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

        if (createShip(sortedCoords, ship[1], fleetParts) === false) {
          return false;
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
          fleetParts[1].splice(0);

        return false;
      };
      if (
        createManuallyPlacedShips(
          fleetIsEnemySideMyFleet ? createFleetShips : createMoreShips,
          fleetIsEnemySideMyFleet ? enemySideMyShips : mySideEnemyShips
        ).includes(false)
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

    bothSideShips.push(ships);

    const addBorder = function (borderSide, coord) {
      const fleetSide = fleetIsEnemySideMyFleet
        ? mySideMyFleet
        : enemySideEnemyFleet;
      fleetSide &&
        (fleetSide.querySelector(`.${coord}`).closest(".dropzone").style[
          borderSide
        ] = "2px solid #15aabf");
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
          ship.style.backgroundColor = "#e3fafc";
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
    flattenedBothSideShips.length === createFleetShips.length * 2 + 2 &&
      flattenedBothSideShips.includes("mySideEnemyFleet") &&
      flattenedBothSideShips.includes("enemySideMyFleet") &&
      ((playing = true),
      console.log("Game started 🥰"),
      console.log(playing, "playing"),
      // Making sure that I will not destroy my own ship ;)
      allowForbidClick(mySideMyFleet, "none"),
      allowForbidClick(
        enemySideEnemyFleet,

        "none"
      ));

    console.log(firstTurn);

    console.log(playing);
    if (!playing) return;
    getSeaOpacityBack();
    mySideEnemyFleet
      ? (firstTurn < 0.5 &&
          (allowForbidClick(mySideEnemyFleet, "auto"),
          (enemySideMyFleet.closest(".sea").style.opacity = "0.7")),
        firstTurn >= 0.5 &&
          (allowForbidClick(enemySideMyFleet, "auto"),
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
