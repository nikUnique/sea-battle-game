import * as GlobalVars from "./globalVars";
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
    const startGameBtnMarkup = `<button class="start-game">Start Playing 😹</button>`;
    document
      .querySelector("body")
      .insertAdjacentHTML("afterbegin", startGameBtnMarkup);
  }

  playing = false;
  const startGameBtn = document.querySelector(".start-game");
  startGameBtn.addEventListener("click", function (e) {
    GlobalVars.enemySideMyFleet.style.pointerEvents = "none";

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

    if (fleet === GlobalVars.enemySideMyFleet) {
      createFleetShips.forEach((ship) => {
        createShip(...ship, fleetParts);
      });
    }

    if (fleet === GlobalVars.mySideEnemyFleet) {
      createMoreShips.forEach((ship) => {
        createShip(...ship, fleetParts);
      });
    }

    const ships = fleetParts[1];

    if (
      fleet === GlobalVars.mySideEnemyFleet ||
      fleet === GlobalVars.enemySideMyFleet
    ) {
      GlobalVars.bothSideShips.push(ships);
      fleet === GlobalVars.mySideEnemyFleet &&
        GlobalVars.bothSideShips.push("mySideEnemyFleet");
      fleet === GlobalVars.enemySideMyFleet &&
        GlobalVars.bothSideShips.push("enemySideMyFleet");

      const flattenedBothSideShips = GlobalVars.bothSideShips.flat(2);
      if (
        !flattenedBothSideShips.includes(undefined) &&
        flattenedBothSideShips.includes("mySideEnemyFleet") &&
        flattenedBothSideShips.includes("enemySideMyFleet")
      ) {
        playing = true;
        console.log("Game started 🥰");
      } else {
        console.log("Place your ships in the right way 😃");
        return;
      }
    }

    // Making sure that I will not destroy my own ship ;)
    if (playing) {
      console.log(playing, "playing");
      GlobalVars.mySideMyFleet.style.pointerEvents = "none";
      GlobalVars.enemySideEnemyFleet.style.pointerEvents = "none";
    }
  });
};
