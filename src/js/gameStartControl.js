import * as GlobalVars from "./globalVars";
import placeShipsManually from "./placeShipsManually";
export let playing;
export const gameStartControl = function (fleet, fleetParts) {
  [...fleet.querySelectorAll(".ship")].forEach((ship, i) => {
    let color;
    i === 0 && (color = "#f03e3e");
    i > 0 && i < 3 && (color = "#94d82d");
    i > 0 && i > 2 && (color = "#be4bdb");
    ship.style.backgroundColor = color;
  });

  if (fleet === GlobalVars.mySideMyFleet) {
    const startGameBtnMarkup = `<button class="start-game ${
      document.querySelector(".start-game") ? "second-btn" : ""
    }">Start Playing 😹</button>`;
    // document.querySelector(".start-game")?.remove();
    document
      .querySelector("body")
      .insertAdjacentHTML("afterbegin", startGameBtnMarkup);
  }

  playing = false;
  const startGameBtn = document.querySelector(".start-game");
  fleet !== GlobalVars.mySideMyFleet &&
    fleet !== GlobalVars.enemySideEnemyFleet &&
    startGameBtn.addEventListener("click", function (e) {
      GlobalVars.enemySideMyFleet.style.pointerEvents = "none";
      console.log(fleet, "where");
      const findCell = function (cell) {
        let fleetSide;
        if (fleet === GlobalVars.enemySideMyFleet) {
          fleetSide = GlobalVars.mySideMyFleet;
        }
        if (fleet === GlobalVars.mySideEnemyFleet) {
          fleetSide = GlobalVars.enemySideEnemyFleet;
        }

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

        [
          [
            findCell("cell6"),
            findCell("cell7"),
            findCell("cell8"),
            findCell("cell9"),
          ],

          [0, 0, 0, 0].length,
        ],
        // [[findCell("cell19")], [0].length],
        [[findCell("cell5"), findCell("cell10")], [0, 0].length],
      ];

      let createMoreShips = [
        [[findCell("cell1")], [0].length],
        // [[findCell("cell2")], [0].length],
        // [[findCell("cell3")], [0].length],
        // [[findCell("cell4")], [0].length],
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
        [
          [
            findCell("cell5"),
            findCell("cell6"),
            findCell("cell7"),
            findCell("cell8"),
          ],

          [0, 0, 0, 0].length,
        ],
        [[findCell("cell9"), findCell("cell10")], [0, 0].length],
      ];

      console.log(createFleetShips);
      // document.querySelector(".second-btn") &&
      //   ((fleetParts[1] = []), (fleetParts[2] = []));

      fleet === GlobalVars.enemySideMyFleet &&
        (GlobalVars.enemySideMyShips.splice(0),
        createFleetShips.forEach((ship) => {
          console.log("Start Playing", fleet);

          createShip(...ship, fleetParts);
        }));

      // document.querySelector(".second-btn") &&
      //   ((fleetParts[1] = []), (fleetParts[2] = []));
      fleet === GlobalVars.mySideEnemyFleet &&
        (GlobalVars.mySideEnemyShips.splice(0),
        createMoreShips.forEach((ship) => {
          console.log("Continue playing");

          createShip(...ship, fleetParts);
        }));

      let ships = fleetParts[1];
      console.log(ships, "ships");

      if (
        fleet === GlobalVars.mySideEnemyFleet ||
        fleet === GlobalVars.enemySideMyFleet
      ) {
        console.log("baron");
        console.log(fleetParts[2]);
        GlobalVars.bothSideShips.push(ships);
        fleet === GlobalVars.mySideEnemyFleet &&
          GlobalVars.bothSideShips.push("mySideEnemyFleet");
        fleet === GlobalVars.enemySideMyFleet &&
          GlobalVars.bothSideShips.push("enemySideMyFleet");
        console.log(GlobalVars.bothSideShips);
        const flattenedBothSideShips = GlobalVars.bothSideShips.flat(2);
        console.log(flattenedBothSideShips);
        if (
          flattenedBothSideShips.length === createFleetShips.length * 2 + 2 &&
          flattenedBothSideShips.includes("mySideEnemyFleet") &&
          flattenedBothSideShips.includes("enemySideMyFleet")
        ) {
          playing = true;
          console.log("Game started 🥰");
          // Making sure that I will not destroy my own ship ;)
          if (playing) {
            console.log(playing, "playing");
            GlobalVars.mySideMyFleet.style.pointerEvents = "none";
            GlobalVars.enemySideEnemyFleet.style.pointerEvents = "none";
          }
          GlobalVars.mySideEnemyFleet.style.pointerEvents = "auto";
          return ships;
          // GlobalVars.enemySideMyFleet.style.pointerEvents = "auto";
        } else {
          console.log("Place your ships in the right way");
          return;
        }
      }
    });
};

export const startNewGame = function (fleet, fleetParts) {
  const newGameBtn = document.querySelector(".new-game-btn");

  newGameBtn.addEventListener("click", function (e) {
    playing = false;
    GlobalVars.mySideMyFleet.style.pointerEvents = "auto";
    GlobalVars.enemySideEnemyFleet.style.pointerEvents = "auto";
    GlobalVars.mySideEnemyFleet.style.pointerEvents = "none";
    GlobalVars.enemySideMyFleet.style.pointerEvents = "none";
    console.log("Beny");

    console.log(GlobalVars.createMyShips);
    console.log("boomer");
    console.log(fleet, "fleet");
    if (fleet === GlobalVars.mySideMyFleet) {
      ("");
      const allCells = [...document.querySelectorAll("td")];

      console.log(allCells);
      allCells.forEach((cell) => {
        console.log("clean");
        cell.querySelector(".ship")?.remove();
        cell.querySelector(".miss")?.classList.remove("miss");
        cell.querySelector(".miss")?.classList.remove("miss");
        cell.querySelector(".cell-around")?.classList.remove("cell-around");
        cell.querySelector(".cell").textContent = "";
      });

      // ships = [];
      fleetParts[1].splice(0);
      // fleetParts[2] = [];
      // GlobalVars.bothSideShips = [];
      console.log("ship");
      GlobalVars.createMyShips.forEach((ship) => {
        createShip(...ship, fleetParts);
      });
      console.log(fleetParts[1], "ships");
    }

    if (fleet === GlobalVars.enemySideEnemyFleet) {
      // ships = [];
      fleetParts[1].splice(0);
      // fleetParts[2] = [];
      // GlobalVars.bothSideShips = [];
      GlobalVars.createEnemyShips.forEach((ship) => {
        createShip(...ship, fleetParts);
      });

      console.log(fleetParts[1], "ships");
    }
    placeShipsManually(fleet);

    GlobalVars.bothSideShips.pop();
    GlobalVars.bothSideShips.pop();
    console.log(GlobalVars.bothSideShips);
    // (fleet === GlobalVars.mySideEnemyFleet ||
    //   fleet === GlobalVars.enemySideMyFleet) &&
    //   gameStartControl(fleet, fleetParts);
    console.log(fleetParts, "fleetParts");
    // playing = true;
    // if (playing) {
    //   console.log(playing, "playing");
    //   GlobalVars.mySideMyFleet.style.pointerEvents = "none";
    //   GlobalVars.enemySideEnemyFleet.style.pointerEvents = "none";
    // }
  });
};
