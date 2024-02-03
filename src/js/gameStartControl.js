import * as GlobalVars from "./globalVars";
import placeShipsManually from "./placeShipsManually";

let playing, startGameBtn;
export { playing };
let firstTurn = Math.random();

const allowForbidClick = function (fleet, state) {
  fleet.style.pointerEvents = state;
};
const paintShips = function (fleet) {
  [...fleet.querySelectorAll(".ship")].forEach((ship, i) => {
    let color;
    i === 0 && (color = "#f03e3e");
    i > 0 && i < 4 && (color = "#94d82d");
    i > 0 && i > 3 && (color = "#be4bdb");
    ship.style.backgroundColor = color;
  });
};
export const gameStartControl = function (fleet, fleetParts) {
  paintShips(fleet);

  const startGameBtnMarkup =
    fleet === GlobalVars.mySideMyFleet
      ? `<button class="start-game">Start Playing 😹</button>`
      : "";
  document
    .querySelector("body")
    .insertAdjacentHTML("afterbegin", startGameBtnMarkup);

  playing = false;
  startGameBtn = document.querySelector(".start-game");
  fleet !== GlobalVars.mySideMyFleet &&
    fleet !== GlobalVars.enemySideEnemyFleet &&
    startGameBtn.addEventListener("click", function (e) {
      fleet === GlobalVars.mySideEnemyFleet && (firstTurn = Math.random());
      allowForbidClick(startGameBtn, "none");
      allowForbidClick(fleet, "none");

      const findCell = function (cell) {
        let fleetSide;
        fleet === GlobalVars.enemySideMyFleet &&
          (fleetSide = GlobalVars.mySideMyFleet);

        fleet === GlobalVars.mySideEnemyFleet &&
          (fleetSide = GlobalVars.enemySideEnemyFleet);

        if (!fleetSide) return;

        return `${fleetSide.querySelector(`.${cell}`)?.classList[0]}`;
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

      console.log(createFleetShips);

      fleet === GlobalVars.enemySideMyFleet &&
        (GlobalVars.enemySideMyShips.splice(0),
        createFleetShips.forEach((ship) => {
          createShip(...ship, fleetParts);
        }));

      fleet === GlobalVars.mySideEnemyFleet &&
        (GlobalVars.mySideEnemyShips.splice(0),
        createMoreShips.forEach((ship) => {
          createShip(...ship, fleetParts);
        }));

      const ships = fleetParts[1];

      if (
        fleet !== GlobalVars.mySideEnemyFleet &&
        fleet !== GlobalVars.enemySideMyFleet
      )
        return;

      GlobalVars.bothSideShips.push(ships);
      fleet === GlobalVars.mySideEnemyFleet &&
        GlobalVars.bothSideShips.push("mySideEnemyFleet");
      fleet === GlobalVars.enemySideMyFleet &&
        GlobalVars.bothSideShips.push("enemySideMyFleet");

      const flattenedBothSideShips = GlobalVars.bothSideShips.flat(2);

      flattenedBothSideShips.length === createFleetShips.length * 2 + 2 &&
        flattenedBothSideShips.includes("mySideEnemyFleet") &&
        flattenedBothSideShips.includes("enemySideMyFleet") &&
        ((playing = true),
        console.log("Game started 🥰"),
        console.log(playing, "playing"),
        // Making sure that I will not destroy my own ship ;)
        allowForbidClick(GlobalVars.mySideMyFleet, "none"),
        allowForbidClick(GlobalVars.enemySideEnemyFleet, "none"));

      GlobalVars.mySideEnemyFleet &&
        (firstTurn < 0.5 &&
          allowForbidClick(GlobalVars.mySideEnemyFleet, "auto"),
        firstTurn > 0.5 &&
          allowForbidClick(GlobalVars.enemySideMyFleet, "auto"));

      fleet === GlobalVars.enemySideMyFleet &&
        flattenedBothSideShips.length / 2 - 1 !== createFleetShips.length &&
        console.log("Place your ships in the right way, 🐒");
    });
};

export const startNewGame = function (fleet, fleetParts) {
  const newGameBtn = document.querySelector(".new-game-btn");

  newGameBtn.addEventListener("click", function (e) {
    allowForbidClick(startGameBtn, "auto");
    playing = false;
    [
      [GlobalVars.mySideMyFleet, "auto"],
      [GlobalVars.enemySideEnemyFleet, "auto"],
      [GlobalVars.mySideEnemyFleet, "none"],
      [GlobalVars.enemySideMyFleet, "none"],
    ].forEach((item) => allowForbidClick(...item));

    fleet === GlobalVars.mySideMyFleet &&
      ([...document.querySelectorAll("td")].forEach((cell) => {
        cell.querySelector(".ship")?.remove();
        cell.querySelector(".miss")?.classList.remove("miss");
        cell.removeAttribute("style");

        cell.querySelector(".cell-around")?.classList.remove("cell-around");
        cell.querySelector(".cell").textContent = "";
      }),
      fleetParts[1].splice(0),
      GlobalVars.createMyShips.forEach((ship) => {
        createShip(...ship, fleetParts);
      }));

    fleet === GlobalVars.enemySideEnemyFleet &&
      (fleetParts[1].splice(0),
      GlobalVars.createEnemyShips.forEach((ship) => {
        createShip(...ship, fleetParts);
      }));

    paintShips(fleet);

    placeShipsManually(fleet);

    GlobalVars.bothSideShips.splice(0);
  });
};
