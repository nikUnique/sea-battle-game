import * as GlobalVars from "./globalVars";
import "./fleetEnvironment";

// Cannot be in another file, because they are primitives which cannot be mutated after being imported
let dragged;
let playing;

/**************************/
/* CREATING FLEET */
/**************************/
const createFleet = function (fleetPart) {
  const fleet = fleetPart[0];
  const ships = [fleetPart[1]];
  const newShipsCoords = fleetPart[2];

  const createShip = function (coords, size) {
    const bigCoords = coords?.map((coord) => {
      return coord.toUpperCase();
    });

    if (bigCoords === undefined) return;
    const checkSpace = ships?.map((ship) => {
      return ship?.coords?.some((coord) => bigCoords.includes(coord));
    });

    if (checkSpace.includes(true)) {
      console.log(
        "In such a mood it wouldn't be surprising if you had stepped with you shoe on a dog's poop 🍭"
      );
      return;
    }

    const checkSpaceAround = ships.map((ship) => {
      return ship?.unavailabeCells?.some((cell) => {
        if (bigCoords.includes(cell))
          console.log(
            `You cannot place your ship on ${cell} because it's around another ship. Find a better place to drop an anchor 😂`
          );
        return bigCoords.includes(cell);
      });
    });

    if (checkSpaceAround.includes(true)) return;

    const sameLetter = coords.map((coord) => {
      return coord[0];
    });

    const sameNumber = coords.map((coord) => {
      return coord[1];
    });

    const columnShip = [...new Set(sameLetter)];
    const rowShip = [...new Set(sameNumber)];

    if (columnShip.length !== 1 && rowShip.length !== 1) {
      console.log("Place your ships in the right order, man 🕺");
      return;
    }

    if (
      fleet !== GlobalVars.mySideMyFleet &&
      fleet !== GlobalVars.enemySideEnemyFleet
    ) {
      const checkWholesomness = coords.map((coord, i) => {
        const coordSlice01 = coord.slice(0, 1);
        const coordSlice1 = coord.slice(1);

        const letterAround = GlobalVars.letters.indexOf(coordSlice01);

        if (
          coords.length > 1 &&
          !coords.includes(
            GlobalVars.letters[letterAround] + (coordSlice1 - 1)
          ) &&
          !coords.includes(
            GlobalVars.letters[letterAround] + (+coordSlice1 + 1)
          ) &&
          !coords.includes(
            GlobalVars.letters[letterAround - 1] + coordSlice1
          ) &&
          !coords.includes(GlobalVars.letters[letterAround + 1] + coordSlice1)
        ) {
          return true;
        }
      });

      if (checkWholesomness.includes(true)) {
        console.log("Place your ships in the right order, man 🤸‍♂️");
        return;
      }
    }

    const cellsAround = bigCoords.reduce((acc, coord, i) => {
      fleet.querySelector(`.${coord}`).classList.add("ship");
      const coordSlice01 = coord.slice(0, 1);
      const coordSlice1 = coord.slice(1);
      const letterAround = GlobalVars.letters.indexOf(coordSlice01);

      const previousCell = coordSlice01 + (+coordSlice1 - 1);
      const nextCell = coordSlice01 + (+coordSlice1 + 1);

      const rightCell = GlobalVars.letters[letterAround + 1] + coordSlice1;

      const leftCell = GlobalVars.letters[letterAround - 1] + coordSlice1;

      const diagonalCells = function (number1, number2) {
        return (
          GlobalVars.letters[letterAround + number1] + (+coordSlice1 + number2)
        );
      };

      const rightTopCell = diagonalCells(1, -1);
      const leftTopCell = diagonalCells(-1, -1);
      const leftBottomCell = diagonalCells(-1, 1);
      const rightBottomCell = diagonalCells(1, 1);

      return (acc += `, ${previousCell}, ${nextCell}, ${leftCell} ,${rightCell} ,${rightTopCell} ,${leftTopCell} ,${leftBottomCell} ,${rightBottomCell}`);
    }, "");

    const readyCellsAround = [
      ...new Set(
        cellsAround
          .replace(",", "")
          .split(",")
          .map((cell) => cell.trim())
          .filter((cell) => GlobalVars.letters.includes(cell.slice(0, 1)))
      ),
    ];

    bigCoords.forEach((pos) => {
      console.log(pos);
      fleet.querySelector(`.${pos}`).classList.add("ship-color");
      fleet
        .querySelector(`.${pos}`)
        .insertAdjacentHTML("beforebegin", `<div class="${pos} cell"></div`);
    });
    const ship = {
      coords: bigCoords,
      size: size,
      unavailabeCells: readyCellsAround,
    };
    return ship;
  };

  fleet !== GlobalVars.mySideEnemyFleet &&
    fleet !== GlobalVars.enemySideMyFleet &&
    newShipsCoords.forEach((ship) => {
      ships.push(createShip(...ship));
    });
  console.log(fleet, "fleeet");
  const cleanShips = ships.slice().filter((ship) => ship !== undefined);

  /**************************/
  /* PLACING SHIPS MANUALLY */
  /**************************/

  const shipEls = fleet.querySelectorAll(".ship");

  shipEls.forEach((shipEl, i) => {
    shipEl.classList.add(`cell${i + 1}`);
  });

  const cells = [...fleet.querySelectorAll("td")].filter((cell) => {
    return !cell.classList.contains("ship");
  });

  cells.forEach((cell) => {
    cell.classList.add("dropzone");
  });

  shipEls.forEach((shipEl) => {
    shipEl.setAttribute("draggable", true);
  });

  fleet.addEventListener("dragstart", function (e) {
    console.log("DRAGSTART");
    console.log(e.target);
    dragged = e.target;
  });

  fleet.addEventListener("dragend", function (e) {
    console.log("DRAGEND", e.target);
    fleet.querySelector(`.${dragged.classList[dragged.classList.length - 1]}`);
  });

  ["dragover", "dragenter", "dragleave", "drop"].forEach((ev) => {
    fleet.addEventListener(
      ev,
      function (e) {
        if (e.target.classList.contains("dropzone")) {
          console.log(ev);
          ev === "dragenter"
            ? e.target.classList.add("dragover")
            : e.target.classList.remove("dragover");
          if (ev === "drop") {
            e.preventDefault();
            console.log(dragged);
            e.target.appendChild(dragged);

            fleet
              .querySelector(
                `.${dragged.classList[dragged.classList.length - 1]}`
              )
              .classList.replace(
                fleet.querySelector(
                  `.${dragged.classList[dragged.classList.length - 1]}`
                ).classList[0],
                e.target.querySelector("div").classList[0]
              );
          }
        }
        if (ev === "dragover") {
          e.preventDefault();
          if (e.target.classList.contains("ship")) return;
          e.target.classList.add("dragover");
        }

        if (ev === "dragleave") {
          console.log("--------DRAGLEAVE------");
          console.log(e.target);
          if (e.target.children) return;

          e.target
            .querySelector("td")
            .querySelector("div")
            .classList.add(`${dragged.classList[0]} cell`);
        }
      },
      ev === "dragover" && false
    );
  });

  /**************************/
  /* GAME START CONTROL */
  /**************************/

  [...fleet.querySelectorAll(".ship")].forEach((ship, i) => {
    let color;
    i === 0 && (color = "#f03e3e");
    i > 0 && i < 3 && (color = "#94d82d");
    i > 0 && i > 2 && (color = "#be4bdb");
    ship.style.backgroundColor = color;
  });

  if (fleet === GlobalVars.mySideMyFleet) {
    const startGameBtnMarkup = `<button class="start-game">Start playing 😹</button>`;
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
        ships.push(createShip(...ship));
      });
    }

    if (fleet === GlobalVars.mySideEnemyFleet) {
      createMoreShips.forEach((ship) => {
        ships.push(createShip(...ship));
      });
    }

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

  /**************************/
  /* GAME CONTROL */
  /**************************/

  GlobalVars.mySideMyFleet.classList.add("player0");
  playing === true &&
    (GlobalVars.enemySideMyFleet.style.pointerEvents = "none");
  [GlobalVars.mySideEnemyFleet, GlobalVars.enemySideMyFleet].forEach(
    (fleet) => {
      fleet.addEventListener("click", function (e) {
        if (
          e.target.classList.contains("ship") ||
          e.target.textContent !== "" ||
          e.target.querySelector(".ship")?.classList.contains("ship")
        )
          return;
        console.log(fleet, "float");
        const turn =
          playing && fleet === GlobalVars.enemySideMyFleet
            ? GlobalVars.mySideEnemyFleet
            : GlobalVars.enemySideMyFleet;
        playing && (turn.style.pointerEvents = "auto");
        playing && (fleet.style.pointerEvents = "none");
      });
    }
  );

  /**************************/
  /* SHOOTING LOGIC */
  /**************************/
  fleet.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(playing, "lay");
    if (
      !playing ||
      e.target.querySelector(".ship")?.classList.contains("ship")
    ) {
      console.log("dropzone");
      return;
    }

    const miss = "&bull;";
    const addMarkToFleet = function (fleet) {
      if (e.target.classList[0] === "dropzone") {
        return fleet.querySelector(
          `.${e.target.querySelector("div").classList[0]}`
        );
      } else {
        return fleet.querySelector(`.${e.target.classList[0]}`);
      }
    };
    if (!e.target.closest(".ship") && e.target.textContent === "") {
      e.target.querySelector("div").classList.add("miss");
      e.target.querySelector("div").insertAdjacentHTML("afterbegin", miss);

      if (
        e.target
          .closest(".enemy-side--my-float")
          ?.querySelector(`.${e.target.classList[0]}`)
      ) {
        addMarkToFleet(GlobalVars.mySideMyFleet).classList.add("miss");

        addMarkToFleet(GlobalVars.mySideMyFleet).insertAdjacentHTML(
          "afterbegin",
          miss
        );
      } else {
        addMarkToFleet(GlobalVars.enemySideEnemyFleet).classList.add("miss");

        addMarkToFleet(GlobalVars.enemySideEnemyFleet).insertAdjacentHTML(
          "afterbegin",
          miss
        );
      }
    }

    if (e.target.closest(".ship")?.textContent === "") {
      const injuredShipPos = ships.findIndex((ship) => {
        return ship?.coords?.includes(e.target.classList[0]);
      });

      e.target.classList.add("injure");
      const injure = "&cross;";
      e.target.insertAdjacentHTML("afterbegin", injure);

      const destroyedShipCoords = ships[injuredShipPos].coords.map((_, i) => {
        return fleet
          .querySelector(`.${ships[injuredShipPos]?.coords[i]}`)
          .nextElementSibling.classList.contains("injure");
      });

      if (
        e.target
          .closest(".enemy-side--my-float")
          ?.querySelector(`.${e.target.classList[0]}`)
      ) {
        addMarkToFleet(
          GlobalVars.mySideMyFleet
        ).nextElementSibling.insertAdjacentHTML("afterbegin", injure);

        addMarkToFleet(
          GlobalVars.mySideMyFleet
        ).nextElementSibling.classList.add("injure");
      } else {
        addMarkToFleet(
          GlobalVars.enemySideEnemyFleet
        ).nextElementSibling.insertAdjacentHTML("afterbegin", injure);

        addMarkToFleet(
          GlobalVars.enemySideEnemyFleet
        ).nextElementSibling.classList.add("injure");
      }

      if (!destroyedShipCoords.includes(false)) {
        const destroyedShip = ships[injuredShipPos].coords.map((_, i) => {
          return fleet.querySelector(`.${ships[injuredShipPos]?.coords[i]}`);
        });

        const filledAreaAroundShip = ships[injuredShipPos].unavailabeCells
          .filter((cell) => {
            // Filtering out coords on which the ship inself is placed, because unavailableCells also included them
            return !ships[injuredShipPos].coords.includes(cell);
          })
          .map((cell, i) => {
            const cellAround = fleet.querySelector(`.${cell}`);

            // There is also can be an imaginary 11th cell when it comes to side ships(because unavailableCells contains them, but only for conveniency reason), so there is a check whether that cell exists or not, because there is no 11th cell exists in the sea(Means that this could be misunderstood as if 11th cell exists but transparent)
            cellAround && (cellAround.style.fontSize = "3.9rem");

            const surroundDestroyedShip = function (fleet, cellAround) {
              cellAround?.textContent === "" &&
                fleet
                  .querySelector(`.${cell}`)
                  ?.insertAdjacentHTML("afterbegin", miss);
              !cellAround?.classList.contains("miss") &&
                cellAround?.classList.add("cell-around");
              cellAround && (cellAround.style.fontSize = "3.9rem");
            };

            const markContraryFleet = function (fleet) {
              const cellAroundContrarySide = fleet.querySelector(`.${cell}`);

              surroundDestroyedShip(fleet, cellAroundContrarySide);
            };

            e.target.closest(".ship").closest(".enemy-side--my-float") &&
              markContraryFleet(GlobalVars.mySideMyFleet);

            e.target.closest(".ship").closest(".my-side--enemy-float") &&
              markContraryFleet(GlobalVars.enemySideEnemyFleet);

            // If the cell is empty then a new mark will be inserted, but if there is something inside then nothing will happen
            surroundDestroyedShip(fleet, cellAround);
          });
      }
    }

    /**************************/
    /* CONTROLLING THE END OF THE GAME */
    /**************************/

    const allShips = [...fleet.querySelectorAll(".ship")];

    const injuredShips = allShips
      .map((ship) => {
        if (ship.classList.contains("injure")) return ship;
      })
      .filter((ship) => {
        if (ship) return ship;
      });

    const areAllShipsInjured = injuredShips.length === allShips.length;

    // Show notification window
    const openNotificationWindow = function () {
      const resultsMessage = document.querySelector(".results-message");
      const player0 = "Dendy";
      const player1 = "Many";

      const addNotification = function (player) {
        resultsMessage.insertAdjacentHTML(
          "afterbegin",
          `${player} won the game`
        );
      };

      if (fleet === GlobalVars.mySideEnemyFleet) addNotification(player0);

      if (fleet !== GlobalVars.mySideEnemyFleet) addNotification(player1);

      GlobalVars.notificatonWindow.classList.remove("hidden");
      GlobalVars.overlay.classList.remove("hidden");
      [GlobalVars.mySideEnemyFleet, GlobalVars.enemySideMyFleet].forEach(
        (fleet) => playing && (fleet.style.pointerEvents = "none")
      );
    };

    const closeNotificationWindow = function () {
      GlobalVars.notificatonWindow.classList.add("hidden");
      GlobalVars.overlay.classList.add("hidden");
    };

    if (areAllShipsInjured) openNotificationWindow();

    GlobalVars.btnCloseNotificationWindow.addEventListener(
      "click",
      closeNotificationWindow
    );
    GlobalVars.overlay.addEventListener("click", closeNotificationWindow);

    document.addEventListener("keydown", function (e) {
      // console.log(e.key);

      if (
        e.key === "Escape" &&
        !GlobalVars.notificatonWindow.classList.contains("hidden")
      ) {
        closeNotificationWindow();
      }
    });
  });
};

[
  [
    GlobalVars.mySideMyFleet,
    GlobalVars.mySideMyShips,
    GlobalVars.createMyShips,
  ],
  [
    GlobalVars.mySideEnemyFleet,
    GlobalVars.mySideEnemyShips,
    GlobalVars.createEnemyShips,
  ],
  [
    GlobalVars.enemySideEnemyFleet,
    GlobalVars.enemySideEnemyShips,
    GlobalVars.createEnemyShips,
  ],
  [
    GlobalVars.enemySideMyFleet,
    GlobalVars.enemySideMyShips,
    GlobalVars.createMyShips,
  ],
].forEach((container, i) => createFleet(container));

// The situation about now: I created right spicing rules, so now I would not be able to put one ship on the next or previos cell of another ship, so all ships are at least one cell away from each other
// Now it's time to do some refactoring
// Refactoring finished, now it's time to think about shooting feature
// When I click on a cell I need to extract a class of it
// Next step: when I click on a ship a symbol of injured or destoryed ship should be shown
// Now it's visible whether the shoot hit the goal or not. Now it's time to surround a destroyed ship with dots
// When I injure a ship which is more than one cell I want to not fill space around with dots, but when the ship is completely destoryed I want to fill space around with dots
// Right now spaces which are empty but shot will be marked with one color, but spaces which weren't shot around the destroyed ship will be marked with another color, so, what was planned is completed
// Now it's time to refactor
// All 3 files are refactored nicely, now it's time to think about the next feature
// How am I going to control the end of the game? When all coords in all ships have class "injured" then I need to do some action, for example show some modal window with the results of the battle
// The logic of defining whether all ships damaged or not is defined, not it's time to show notification message
// Now notification window shows up when all ships are destroyed, what to do next? Now I should think about applying the same functionality to the enemy part
// Part of the funtionalit is already aplied, now it's time to somehow link 2 fleets together
// Now I need to make sure that when I shoot mySideEnemyFleet that only will change enemySideEnemyFleet
// The situaton for now: the last goal is completed, my enemy shoots only affect my side and my shoots only affect his side, now it's time of refactoring
// At this point everything is nice refactored, now it's time to think about the next feature: I need to create turns. This means that it can be my turn or my enemy's turn
// Turns are created and work like intended, let's figure out the winner of the game
// The winner is defined, now it's time to do something about ship placing
// Now ships are not longer the same on both sides, all planned goals untill now are completed, now it's time to think about another feature
// Now I can create some input form inputting coords for ships
// Now I don't need any input form or anything like that! Now the ships are draggable, so I can manually do this!
// All code is refactored and this time I should make a feature to first place ships and only then to play
// In the beginning I place my ships on my side and when I push the start button, then my ships will render on my opponent's side
// Right now after pushing start button duplicate fleet is rendered and it's playable, everything after duplicating the fleet is working, however, I still cannot  place ships manually, I can drag a ship and drop it somewhere, but it will not be duplicated to another side, so this is what should be fixed, but before let's refactor the code
// Now I can manually place ships where I want and they will be duplicated and I can play as in the real game, but to set everything properly I first need to place right parts of ships together and if they will not be connected in the right way, then there will be a mess, so I need to find a condition which will help me in this situation.
// Everything is working perfectly, there is no way you will start the game when you misplaced any of your ships, it will just not allow it! So, it's playable, but right now there is a big mess, so I need to clean it up and refactor the code :)
// Current situation: all code in the controller and css is refactored, now the controller file contains about 670 lines of code, now it's time to divide it up to different files
