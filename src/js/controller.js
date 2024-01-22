const mySideMyFleet = document.querySelector(".my-side--my-float");
const mySideEnemyFleet = document.querySelector(".my-side--enemy-float");
const enemySideEnemyFleet = document.querySelector(".enemy-side--enemy-float");
const enemySideMyFleet = document.querySelector(".enemy-side--my-float");
const seas = document.querySelectorAll(".sea");
const notificatonWindow = document.querySelector(".notification-window");
const overlay = document.querySelector(".overlay");
const btnCloseNotificationWindow = document.querySelector(
  ".close-notification-window"
);
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const seaFleet = Array.from({ length: 10 }, (_, i) => i + 1);
const createMyShips = [
  [["F10"], 1],
  [["A1", "A2", "A3", "A4"], 4],
  [["B4", "B5"], 2],
  [["J3", "I3"], 2],
  [["e1"], 1],
];
const createEnemyShips = [
  [["B4", "B5"], 2],
  [["I2"], 1],
  [["J10"], 1],
  [["F10"], 1],
];
let dragged;
let myShips = [];
let enemyShips = [];
// Make sure that I will not destroy my own ship ;)
mySideMyFleet.style.pointerEvents = "none";
enemySideEnemyFleet.style.pointerEvents = "none";

/**************************/
/* CREATING SHIPS */
/**************************/

const markup = seaFleet
  .map(
    (item, i) => `
    <tr class="row-${i + 1}">
<th>${item}</th>
 ${letters
   .map((letter) => `<td><div class="${letter}${i + 1} cell" ></div></td>`)
   .join("")}
</tr>
`
  )
  .join("");

const markupSeaHead = ` ${seaFleet
  .map((_, i) => {
    return i > 0
      ? `<th>${letters[i]}</th>`
      : `<th></th> 
        <th>${letters[i]}</th>`;
  })
  .join("")}`;

[
  mySideMyFleet,
  mySideEnemyFleet,
  enemySideEnemyFleet,
  enemySideMyFleet,
].forEach((container) => container.insertAdjacentHTML("afterbegin", markup));

[...seas].forEach((sea) =>
  sea.querySelector("tr").insertAdjacentHTML("afterbegin", markupSeaHead)
);

const createFleet = function (fleetPart) {
  const fleet = fleetPart[0];
  const ships = [fleetPart[1]];
  const newShipsCoords = fleetPart[2];
  console.log(fleet);
  console.log(ships);
  const createShip = function (coords, size) {
    const bigCoords = coords?.map((coord) => coord.toUpperCase());
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

    const cellsAround = bigCoords.reduce((acc, coord) => {
      fleet.querySelector(`.${coord}`).classList.add("ship");
      const coordSlice01 = coord.slice(0, 1);
      const coordSlice1 = coord.slice(1);
      const letterAround = letters.indexOf(coordSlice01);

      const previousCell = coordSlice01 + (+coordSlice1 - 1);
      const nextCell = coordSlice01 + (+coordSlice1 + 1);

      const rightCell = letters[letterAround + 1] + coordSlice1;

      const leftCell = letters[letterAround - 1] + coordSlice1;

      const diagonalCells = function (number1, number2) {
        return letters[letterAround + number1] + (+coordSlice1 + number2);
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
          .filter((cell) => letters.includes(cell.slice(0, 1)))
      ),
    ];

    bigCoords.forEach((pos) => {
      fleet.querySelector(`.${pos}`).style.backgroundColor = "yellow";
    });
    const ship = {
      coords: bigCoords,
      size: size,
      unavailabeCells: readyCellsAround,
    };
    return ship;
    // ships.push(ship);
  };

  // [
  //   [["d4"], 1],
  //   [["e7", "e8"], 2],
  //   [["h6", "G6", "I6"], 3],
  //   [["D4"], 1],
  //   [["I2"], 1],
  //   [["J10"], 1],
  //   [["F10"], 1],
  //   [["A1", "A2", "A3", "A4"], 4],
  //   [["B4", "B5"], 2],
  //   [["J3", "I3"], 2],
  //   [["e1"], 1],
  //   [["e2"], 1],
  // ]
  newShipsCoords.forEach((ship) => {
    ships.push(createShip(...ship));
  });
  const cleanShips = ships.slice().filter((ship) => ship !== undefined);
  console.log(cleanShips);

  /**************************/
  /* GAME CONTROL */
  /**************************/

  mySideMyFleet.classList.add("player0");
  enemySideMyFleet.style.pointerEvents = "none";
  [mySideEnemyFleet, enemySideMyFleet].forEach((fleet) => {
    fleet.addEventListener("click", function (e) {
      console.log("---------MEGA BRUMWELL------- 🐖");
      if (e.target.classList.contains("ship") || e.target.textContent !== "")
        return;
      const turn =
        fleet === enemySideMyFleet ? mySideEnemyFleet : enemySideMyFleet;
      turn.style.pointerEvents = "auto";
      fleet.style.pointerEvents = "none";
    });
  });

  /**************************/
  /* SHOOTING LOGIC */
  /**************************/

  fleet.addEventListener("click", function (e) {
    e.preventDefault();

    const miss = "&bull;";
    const addMarkToFleet = function (fleet) {
      console.log(e.target.classList[0]);
      return fleet.querySelector(
        e.target.classList[0] === "dropzone"
          ? `.${e.target.querySelector("div").classList[0]}`
          : `.${e.target.classList[0]}`
      );
    };

    if (!e.target.closest(".ship") && e.target.textContent === "") {
      e.target.querySelector("div").classList.add("miss");
      e.target.querySelector("div").insertAdjacentHTML("afterbegin", miss);

      if (
        e.target
          .closest(".enemy-side--my-float")
          ?.querySelector(`.${e.target.classList[0]}`)
      ) {
        addMarkToFleet(mySideMyFleet).classList.add("miss");

        addMarkToFleet(mySideMyFleet).insertAdjacentHTML("afterbegin", miss);
      } else {
        addMarkToFleet(enemySideEnemyFleet).classList.add("miss");

        addMarkToFleet(enemySideEnemyFleet).insertAdjacentHTML(
          "afterbegin",
          miss
        );
      }
    }

    if (e.target.closest(".ship")?.textContent === "") {
      const injuredShipPos = cleanShips.findIndex((ship) => {
        return ship?.coords?.includes(e.target.classList[0]);
      });

      e.target.classList.add("injure");
      const injure = "&cross;";
      e.target.insertAdjacentHTML("afterbegin", injure);

      const destroyedShipCoords = cleanShips[injuredShipPos].coords.map(
        (_, i) => {
          return fleet
            .querySelector(`.${cleanShips[injuredShipPos]?.coords[i]}`)
            .classList.contains("injure");
        }
      );

      console.log("how often this happens");

      if (
        e.target
          .closest(".enemy-side--my-float")
          ?.querySelector(`.${e.target.classList[0]}`)
      ) {
        addMarkToFleet(mySideMyFleet).insertAdjacentHTML("afterbegin", injure);

        addMarkToFleet(mySideMyFleet).classList.add("injure");
      } else {
        addMarkToFleet(enemySideEnemyFleet).insertAdjacentHTML(
          "afterbegin",
          injure
        );

        addMarkToFleet(enemySideEnemyFleet).classList.add("injure");
      }

      if (!destroyedShipCoords.includes(false)) {
        console.log("beny");
        const destroyedShip = cleanShips[injuredShipPos].coords.map((_, i) => {
          return fleet.querySelector(
            `.${cleanShips[injuredShipPos]?.coords[i]}`
          );
        });
        console.log(destroyedShip);

        const filledAreaAroundShip = cleanShips[injuredShipPos].unavailabeCells
          .filter((cell) => {
            // Filtering out coords on which the ship inself is placed, because unavailableCells also included them
            return !cleanShips[injuredShipPos].coords.includes(cell);
          })
          .map((cell, i) => {
            const cellAround = fleet.querySelector(`.${cell}`);

            // There is also can be an imaginary 11th cell when it comes to side ships(because unavailableCells contains them, but only for conveniency reason), so there is a check whether that cell exists or not, because there is no 11th cell exists in the sea(Means that this could be misunderstood as if 11th cell exists but transparent)
            cellAround && (cellAround.style.fontSize = "4rem");

            const surroundDestroyedShip = function (fleet, cellAround) {
              console.log(cellAround);
              cellAround?.textContent === "" &&
                fleet
                  .querySelector(`.${cell}`)
                  ?.insertAdjacentHTML("afterbegin", miss);
              !cellAround?.classList.contains("miss") &&
                cellAround?.classList.add("cell-around");
              cellAround && (cellAround.style.fontSize = "4rem");
            };

            const markContraryFleet = function (fleet) {
              const cellAroundContrarySide = fleet.querySelector(`.${cell}`);

              surroundDestroyedShip(fleet, cellAroundContrarySide);
            };

            if (e.target.closest(".ship").closest(".enemy-side--my-float")) {
              markContraryFleet(mySideMyFleet);
            }

            if (e.target.closest(".ship").closest(".my-side--enemy-float")) {
              markContraryFleet(enemySideEnemyFleet);
            }

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

      if (fleet === mySideEnemyFleet) addNotification(player0);

      if (fleet !== mySideEnemyFleet) addNotification(player1);

      notificatonWindow.classList.remove("hidden");
      overlay.classList.remove("hidden");
      [mySideEnemyFleet, enemySideMyFleet].forEach(
        (fleet) => (fleet.style.pointerEvents = "none")
      );
    };

    const closeNotificationWindow = function () {
      notificatonWindow.classList.add("hidden");
      overlay.classList.add("hidden");
    };

    if (areAllShipsInjured) openNotificationWindow();

    btnCloseNotificationWindow.addEventListener(
      "click",
      closeNotificationWindow
    );
    overlay.addEventListener("click", closeNotificationWindow);

    document.addEventListener("keydown", function (e) {
      // console.log(e.key);

      if (
        e.key === "Escape" &&
        !notificatonWindow.classList.contains("hidden")
      ) {
        closeNotificationWindow();
      }
    });
  });

  /**************************/
  /* PLACING SHIPS MANUALLY */
  /**************************/

  const shipEls = fleet.querySelectorAll(".ship");

  const targets = [...fleet.querySelectorAll("td")].filter((ship) => {
    return !ship.classList.contains("ship");
  });

  targets.forEach((target) => {
    target.classList.add("dropzone");
  });

  shipEls.forEach((source) => {
    source.setAttribute("draggable", true);
  });

  shipEls.forEach((source) => {
    source.addEventListener("dragstart", function (e) {
      console.log("DRAGSTART");
      dragged = e.target;
    });
  });

  ["dragover", "dragenter", "dragleave", "drop"].forEach((ev) => {
    targets.forEach((target) => {
      target.addEventListener(
        ev,
        function (e) {
          if (e.target.classList.contains("dropzone")) {
            ev === "dragenter"
              ? e.target.classList.add("dragover")
              : e.target.classList.remove("dragover");
            ev === "drop" && e.preventDefault();
            ev === "drop" && e.target.appendChild(dragged);
          }
          if (ev === "dragover") {
            e.preventDefault();
          }
        },
        ev === "dragover" && false
      );
    });
  });
};

[
  [mySideMyFleet, myShips, createMyShips],
  [mySideEnemyFleet, enemyShips, createEnemyShips],
  [enemySideEnemyFleet, enemyShips, createEnemyShips],
  [enemySideMyFleet, myShips, createMyShips],
].forEach((container) => createFleet(container));

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
