import {
  mySideMyFleet,
  enemySideEnemyFleet,
  mySideEnemyFleet,
  enemySideMyFleet,
  enemySideMyShips,
  mySideEnemyShips,
  bothSideShips,
  createEnemyShips,
  createMyShips,
} from "./globalVars";
import { buildShipBorder } from "./buildShipBorder";
import placeShipsManually from "./placeShipsManually";

let playing, startGameBtn;
export { playing };
let firstTurn = Math.random();

const allowForbidClick = function (fleet, state) {
  fleet.style.pointerEvents = state;
};

export const gameStartControl = function (fleet, fleetParts) {
  const startGameBtnMarkup =
    fleet === mySideMyFleet
      ? `<button class="start-game">Start Playing 😹</button>`
      : "";
  document
    .querySelector("body")
    .insertAdjacentHTML("afterbegin", startGameBtnMarkup);

  playing = false;
  startGameBtn = document.querySelector(".start-game");
  fleet !== mySideMyFleet &&
    fleet !== enemySideEnemyFleet &&
    startGameBtn.addEventListener("click", function (e) {
      fleet === mySideEnemyFleet && (firstTurn = Math.random());
      allowForbidClick(startGameBtn, "none");
      allowForbidClick(fleet, "none");

      const findCell = function (cell) {
        return `${
          (fleet === enemySideMyFleet
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
        createSource.map((ship) => {
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

          createShip(sortedCoords, ship[1], fleetParts);
        });
      };
      createManuallyPlacedShips(
        fleet === enemySideMyFleet ? createFleetShips : createMoreShips,
        fleet === enemySideMyFleet ? enemySideMyShips : mySideEnemyShips
      );

      [...document.querySelectorAll(".ship")].forEach((shipEl) => {
        shipEl.textContent = "";
      });

      const ships = fleetParts[1];

      const addBorder = function (borderSide, coord) {
        (fleet === enemySideMyFleet ? mySideMyFleet : enemySideEnemyFleet)
          .querySelector(`.${coord}`)
          .closest(".dropzone").style[borderSide] = "2px solid #15aabf";
      };

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

      bothSideShips.push(ships);
      fleet === mySideEnemyFleet && bothSideShips.push("mySideEnemyFleet");
      fleet === enemySideMyFleet && bothSideShips.push("enemySideMyFleet");

      const flattenedBothSideShips = bothSideShips.flat(2);

      flattenedBothSideShips.length === createFleetShips.length * 2 + 2 &&
        flattenedBothSideShips.includes("mySideEnemyFleet") &&
        flattenedBothSideShips.includes("enemySideMyFleet") &&
        ((playing = true),
        console.log("Game started 🥰"),
        console.log(playing, "playing"),
        // Making sure that I will not destroy my own ship ;)
        allowForbidClick(mySideMyFleet, "none"),
        allowForbidClick(enemySideEnemyFleet, "none"));

      mySideEnemyFleet &&
        (firstTurn < 0.5 && allowForbidClick(mySideEnemyFleet, "auto"),
        firstTurn > 0.5 && allowForbidClick(enemySideMyFleet, "auto"));

      fleet === enemySideMyFleet &&
        flattenedBothSideShips.length / 2 - 1 !== createFleetShips.length &&
        console.log("Place your ships in the right way, 🐒");
    });
};

export const startNewGame = function (fleet, fleetParts) {
  const ships = fleetParts[1];
  const newGameBtn = document.querySelector(".new-game-btn");

  newGameBtn.addEventListener("click", function (e) {
    allowForbidClick(startGameBtn, "auto");
    playing = false;
    [
      [mySideMyFleet, "auto"],
      [enemySideEnemyFleet, "auto"],
      [mySideEnemyFleet, "none"],
      [enemySideMyFleet, "none"],
    ].forEach((item) => allowForbidClick(...item));

    fleet === mySideMyFleet
      ? ([...document.querySelectorAll("td")].forEach((cell) => {
          cell.querySelector(".ship")?.remove();
          cell.querySelector(".miss")?.classList.remove("miss");
          cell.removeAttribute("style");

          cell.querySelector(".cell-around")?.classList.remove("cell-around");
          cell.querySelector(".cell").textContent = "";
        }),
        ships.splice(0),
        createMyShips.forEach((ship) => {
          createShip(...ship, fleetParts);
        }))
      : "";

    fleet === enemySideEnemyFleet &&
      (ships.splice(0),
      createEnemyShips.forEach((ship) => {
        createShip(...ship, fleetParts);
      }));
    placeShipsManually(fleet);

    bothSideShips.splice(0);
  });
};
