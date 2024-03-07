import {
  mySideMyFleet,
  enemySideEnemyFleet,
  enemySideMyFleet,
} from "./globalVars.js";

import showEndResults from "./showEndResults.js";

import { playingCheck } from "./gameStartControl.js";

import { buildShipBorder, startTimer, timerClock } from "./helpers.js";

import { APPEAR_TIME, TIME_LENGTHS } from "./config.js";

export default function (fleet, ships) {
  const shootingLogic = function (e) {
    e.preventDefault();

    // Here are possible 2 options: first is that this variable will be a truthy value because it will successfully select desired element, but second options is that this value will be undefined. So, both of this values make it enough to select the right cell. For example if my opponent shot in a cell of enemySideMyFleet which is his side then that spot will be selected because it happened on his side, but if I shot a cell of mySideEnemyFleet then it will be undefined because closest method will not find enemySideMyFleet in mySideEnemyFleet, so, which means that this is the second option and a cell of mySideEnemyFleet will be chosen when this variable will be used
    const selectChosenCell = e.target
      .closest(".enemy-side--my-fleet")
      ?.querySelector(`.${e.target.classList[0]}`);

    console.log(e.target, "target");

    const containsShip =
      !playingCheck.playing ||
      e.target.querySelector(".ship")?.classList.contains("ship");

    // If I made a shot in dropzone containing ship instead of ship itself then this will not count and you can shoot again. This is done this way to make it simplier to select empty cell inside of dropzone which doesn't contain a ship
    if (containsShip) {
      console.log("dropzone");
      return;
    }

    const miss = "&bull;";

    const addMarkToFleet = function (fleet) {
      // If the first condition is true this means that the shot missed and reached dropzone containing empty cell
      if (e.target.classList[0] === "dropzone")
        return fleet.querySelector(
          `.${e.target.querySelector("div").classList[0]}`
        );

      // If this is true then this means that the shot damaged a ship
      if (e.target.classList[0] !== "dropzone")
        return fleet.querySelector(`.${e.target.classList[0]}`);
    };

    const addMissMark = function () {
      if (e.target.textContent !== "") {
        return;
      }

      // This and a piece of code below add a class and insert textContent in the fleet which was clicked
      e.target.querySelector("div").classList.add("miss");

      e.target.querySelector("div").insertAdjacentHTML("afterbegin", miss);

      // These 2 if-statements basically do the same thing as above but duplicating this to the second sea part
      if (selectChosenCell) {
        addMarkToFleet(mySideMyFleet).classList.add("miss");

        addMarkToFleet(mySideMyFleet).insertAdjacentHTML("afterbegin", miss);
      }

      if (!selectChosenCell) {
        addMarkToFleet(enemySideEnemyFleet).classList.add("miss");

        addMarkToFleet(enemySideEnemyFleet).insertAdjacentHTML(
          "afterbegin",
          miss
        );
      }
    };

    // Calls the function when player misses ship
    !e.target.closest(".ship") && addMissMark();

    // If cell in which you shot is already marked then code execution will stop here because the code below marks damaged ships which is already done at this point if target is a marked ship part and if not then the cell was already marked as missed which means that textContent of the target is already not empty in these cases
    if (e.target.textContent !== "") {
      console.log(e.target);
      console.log("You already shot that cell or you missed");
      return;
    }

    const injuredShipPartPos = ships.findIndex((ship) => {
      // Find ship index in the ships arr which was damaged
      return ship?.coords?.includes(e.target.classList[0]);
    });

    console.log(ships);

    e.target.classList.add("injure");
    const injure = "&cross;";

    // e.target.insertAdjacentHTML("afterbegin", injure);

    // A nice neat trick when you don't need empty string but you also don't need it to be filled with something visible, so you just add empty space
    e.target.textContent = " ";

    // Checks whether ship is only damaged or destroyed completely
    const destroyedShipCoords = ships[injuredShipPartPos].coords.map((_, i) => {
      return fleet
        .querySelector(`.${ships[injuredShipPartPos]?.coords[i]}`)
        .nextElementSibling.classList.contains("injure");
    });

    // Duplicate damage mark on the second sea part
    if (selectChosenCell) {
      /* addMarkToFleet(mySideMyFleet).nextElementSibling.insertAdjacentHTML(
        "afterbegin",
        injure
      ), && */
      addMarkToFleet(mySideMyFleet).nextElementSibling.classList.add("injure");

      // When a ship is damaged or destroyed then timer refreshes
      startTimer(fleet);
    }

    if (!selectChosenCell) {
      /* addMarkToFleet(
        enemySideEnemyFleet
      ).nextElementSibling.insertAdjacentHTML("afterbegin", injure), && */
      addMarkToFleet(enemySideEnemyFleet).nextElementSibling.classList.add(
        "injure"
      );

      startTimer(fleet);
    }

    // If ships is destroyed completely it's time to add border to it, but if not then execution stops here
    if (destroyedShipCoords.includes(false)) return;

    const addBorder = function (borderSide, coord, color = "#FA5252") {
      const selectTd = function (fleetSide) {
        fleetSide.querySelector(`.${coord}`).closest(".dropzone").style[
          borderSide
        ] = `2px solid ${color} `;
      };

      selectTd(fleet);

      // Select tds for adding border to ships of the second sea part
      selectTd(
        fleet === enemySideMyFleet ? mySideMyFleet : enemySideEnemyFleet
      );
    };

    ships[injuredShipPartPos].coords.map((coord, i, arr) => {
      buildShipBorder([ships[injuredShipPartPos], coord, i, arr, addBorder]);

      // Code below if-statement will be executed only for 1-cell ships
      if (ships[injuredShipPartPos].coords.length !== 1) {
        return;
      }

      // Check whether 1-cell ship contains reward class or not
      const rewardShip = fleet
        .querySelector(`.${coord}`)
        .nextElementSibling.classList.contains("reward");

      if (!rewardShip) {
        return;
      }
      // Adds special class which is necessary for reward feature
      fleet.classList.add("binoculars");

      const labelBinocularsReward = fleet
        .closest(".sea-container")
        .querySelector(".binoculars-reward-label");

      const labelTimer = fleet
        .closest(".sea-container")
        .querySelector(".timer");

      labelBinocularsReward.style.opacity = "100";

      const tick = function () {
        timerClock(time, labelTimer);

        if (time === 0) {
          clearInterval(timer);

          labelBinocularsReward.style.opacity = "0";

          fleet.classList.remove("binoculars");

          console.log("Magic video camera removed");
        }

        time--;
      };

      let time = TIME_LENGTHS.bonusTime;
      tick();

      // This will make timer
      const timer = setInterval(tick, 1000);
    });

    const filledAreaAroundShip = ships[injuredShipPartPos].unavailabeCells
      .filter((cell) => {
        // Filtering out coords on which the ship inself is placed, because unavailableCells also included them
        return !ships[injuredShipPartPos].coords.includes(cell);
      })
      .filter((cell) => {
        return fleet.querySelector(`.${cell}`)?.textContent === "";
      })
      .map((cell, i) => {
        const cellAround = fleet.querySelector(`.${cell}`);

        console.log(cellAround, "cellAround");

        // There is also can be an imaginary 11th cell when it comes to bottom ships(because unavailableCells contains them, but only for conveniency reason), so there is a check whether that cell exists or not, because there is no 11th cell exists in the sea(Means that this could be misunderstood as if 11th cell exists but transparent)
        cellAround && (cellAround.style.fontSize = "3.2rem");

        const surroundDestroyedShip = function (fleet, cellAround) {
          cellAround?.textContent === "" &&
            fleet
              .querySelector(`.${cell}`)
              ?.insertAdjacentHTML("afterbegin", miss);

          !cellAround?.classList.contains("miss") &&
            cellAround?.classList.add("cell-around");

          cellAround && (cellAround.style.fontSize = "3.2rem");

          cellAround.style.visibility = "hidden";

          // This is done for nice animation effect
          setTimeout(function () {
            cellAround.style.visibility = "visible";
          }, i * APPEAR_TIME);
        };

        const markContraryFleet = function (fleet) {
          const cellAroundContrarySide = fleet.querySelector(`.${cell}`);

          surroundDestroyedShip(fleet, cellAroundContrarySide);
        };

        e.target.closest(".ship").closest(".enemy-side--my-fleet") &&
          markContraryFleet(mySideMyFleet);

        e.target.closest(".ship").closest(".my-side--enemy-fleet") &&
          markContraryFleet(enemySideEnemyFleet);

        // If the cell is empty then a new mark will be inserted, but if there is something inside then nothing will happen
        surroundDestroyedShip(fleet, cellAround);
      });

    /**************************/
    /* CONTROLLING THE END OF THE GAME */
    /**************************/
    showEndResults(fleet);
  };

  fleet.addEventListener("click", function (e) {
    shootingLogic(e);
  });
}
