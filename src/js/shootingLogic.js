import {
  mySideMyFleet,
  enemySideEnemyFleet,
  enemySideMyFleet,
  mySideEnemyFleet,
} from "./globalVars";

import { randomNumberFromRange } from "./shipMakeHelpers";

import showEndResults from "./showEndResults";

import { playingCheck, whoseTurn } from "./gameStartControl";

import { buildShipBorder, startTimer, timerClock } from "./helpers";

import { APPEAR_TIME, TIME_LENGTHS } from "./config";

function addLastShotMark(fleet, e) {
  // console.log("element", el, el?.nextElementSibling);

  let improvedElement;

  if (e.target.classList[0] === "dropzone") {
    improvedElement = fleet.querySelector(
      `.${e.target.querySelector("div").classList[0]}`
    );
  }

  if (e.target.classList[0] !== "dropzone") {
    improvedElement = fleet.querySelector(`.${e.target.classList[0]}`);
  }

  const markToRemove = fleet
    .querySelector(".last-shot")
    ?.classList.remove("last-shot");
  const markToAdd =
    /* e.target.querySelector(".cell") */ improvedElement?.classList.add(
      "last-shot"
    );
  console.log("classes", fleet.querySelector(".last-shot"), improvedElement);

  console.log("Added last shot mark");
}

export default function (fleet, ships) {
  const shootingLogic = function (e) {
    e.preventDefault();

    // Here are possible 2 options: first is that this variable will be a truthy value because it will successfully select desired element, but second options is that this value will be undefined. So, both of this values make it enough to select the right cell. For example if my opponent shot in a cell of enemySideMyFleet which is his side then that spot will be selected because it happened on his side, but if I shot a cell of mySideEnemyFleet then it will be undefined because closest method will not find enemySideMyFleet in mySideEnemyFleet, so, which means that this is the second option and a cell of mySideEnemyFleet will be chosen when this variable will be used
    const selectChosenCell = e.target
      .closest(".enemy-side--my-fleet")
      ?.querySelector(`.${e.target.classList[0]}`);

    console.log(e.target, "target");

    const addMarkToFleet = function (fleet) {
      // If the first condition is true this means that the shot missed and reached dropzone containing empty cell
      if (e.target.classList[0] === "dropzone")
        return fleet.querySelector(
          `.${e.target.querySelector("div").classList[0]}`
        );

      // If this is true then this means that the shot damaged a ship
      if (e.target.classList[0] !== "dropzone") {
        console.log(
          "fleet.querySelector(`.${e.target.classList[0]}`",
          fleet.querySelector(`.${e.target.classList[0]}`)
        );

        return fleet.querySelector(`.${e.target.classList[0]}`);
      }
    };

    const containsShip =
      !playingCheck.playing ||
      e.target.querySelector(".ship")?.classList.contains("ship");

    // If I made a shot in dropzone containing ship instead of ship itself then this will not count and you can shoot again. This is done this way to make it simplier to select empty cell inside of dropzone which doesn't contain a ship
    if (containsShip) {
      console.log("dropzone");
      return;
    }

    const miss = "&#x1F30A;";

    const whoseFleet =
      fleet === mySideEnemyFleet ? enemySideEnemyFleet : mySideMyFleet;
    if (fleet === mySideEnemyFleet) {
      mySideEnemyFleet
        .querySelector(".last-shot")
        ?.classList.remove("last-shot");
      enemySideEnemyFleet
        .querySelector(".last-shot")
        ?.classList.remove("last-shot");
    }
    if (fleet === enemySideMyFleet) {
      mySideMyFleet.querySelector(".last-shot")?.classList.remove("last-shot");
      enemySideMyFleet
        .querySelector(".last-shot")
        ?.classList.remove("last-shot");
    }

    if (e.target.classList.contains("dropzone")) {
      e.target.querySelector(".cell").classList.add("last-shot");
      whoseFleet
        .querySelector(`.${e.target.querySelector("div").classList[0]}`)
        .classList.add("last-shot");
    }

    if (e.target.classList[0] !== "dropzone") {
      console.log("Our ship target:", e.target);
      e.target.classList.add("last-shot");
      console.log(
        "Opposite",
        whoseFleet.querySelector(`.${e.target.classList[0]}`).nextElementSibling
      );

      whoseFleet
        .querySelector(`.${e.target.classList[0]}`)
        .nextElementSibling.classList.add("last-shot");
    }

    // addLastShotMark(mySideMyFleet, addMarkToFleet(mySideMyFleet));
    // addLastShotMark(enemySideEnemyFleet, addMarkToFleet(enemySideEnemyFleet));

    // addLastShotMark(fleet, e);
    // addLastShotMark(mySideEnemyFleet ? enemySideEnemyFleet : mySideMyFleet, e);

    // addLastShotMark(fleet, e);

    // if (fleet === mySideEnemyFleet && e.target.classList[0] !== "dropzone") {
    //   console.log("Sandwish");

    //   addLastShotMark(
    //     enemySideMyFleet,
    //     enemySideMyFleet.querySelector(`.${e.target.querySelector(".ship")}`)
    //   );
    // }

    // if (fleet === mySideEnemyFleet) {
    //   addLastShotMark(
    //     enemySideEnemyFleet,
    //     enemySideEnemyFleet.querySelector(`.${e.target.querySelector(".ship")}`)
    //   );
    // }

    // if (selectChosenCell) {
    //   addLastShotMark(mySideMyFleet, e.target.querySelector(".cell"));
    // }
    // if (!selectChosenCell) {
    //   addLastShotMark(enemySideEnemyFleet, e.target.querySelector(".cell"));
    // }

    // if (selectChosenCell) {
    //   addLastShotMark(mySideMyFleet, addMarkToFleet(mySideMyFleet));
    // }

    // if (!selectChosenCell) {
    //   addLastShotMark(fleet, e.target);
    //   addLastShotMark(enemySideEnemyFleet, addMarkToFleet(enemySideEnemyFleet));
    // }

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
    const audio = document.getElementById("cannon");
    audio.currentTime = 0;
    audio.play();
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
        // cellAround && (cellAround.style.fontSize = "3.2rem");

        const surroundDestroyedShip = function (fleet, cellAround) {
          const surroundSign = "&#x1F4A7";
          cellAround?.textContent === "" &&
            fleet
              .querySelector(`.${cell}`)
              ?.insertAdjacentHTML("afterbegin", surroundSign);
          /*   fleet
              .querySelector(`.${cell}`)
              ?.insertAdjacentHTML("afterbegin", miss); */

          !cellAround?.classList.contains("miss") &&
            cellAround?.classList.add("cell-around");

          // cellAround && (cellAround.style.fontSize = "3.2rem");

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

    computerShotHandler();
  });
}

export function computerShotHandler() {
  // console.log("whoseTurn", whoseTurn, whoseTurn.turn === enemySideMyFleet);

  if (!playingCheck.playing) {
    console.log("The game is over 💯");
    return;
  }
  if (
    whoseTurn.turn === enemySideMyFleet
    /* (fleet === mySideEnemyFleet &&
      !e.target.classList.contains("ship") &&
      !e.target.classList.contains("miss") &&
      !e.target.classList.contains("cell-around") */
    // (fleet === mySideEnemyFleet && e.target.classList.contains("ship"))
    /*   (fleet === enemySideMyFleet && e.target.classList.contains("ship")) */
  ) {
    const allMyShips = [...enemySideMyFleet.querySelectorAll("td")]
      .filter((el) => !el.querySelector(".miss"))
      .filter((el) => !el.querySelector(".injure"))
      .filter((el) => !el.querySelector(".cell-around"));

    const timeout = randomNumberFromRange(1, 5);
    console.log("timeout", timeout);

    if (allMyShips.length === 0) return;
    const randomIndex = Math.floor(Math.random() * allMyShips.length);
    const randomElement = allMyShips[randomIndex];
    if (
      !randomElement.querySelector(".ship") &&
      !randomElement.querySelector(".miss") &&
      !randomElement.querySelector(".cell-around")
    ) {
      setTimeout(function () {
        randomElement.click();
      }, timeout * 1000);
    }
    if (
      !randomElement.querySelector(".injure") &&
      !randomElement.querySelector(".miss") &&
      !randomElement.querySelector(".cell-around")
    ) {
      setTimeout(function () {
        randomElement.querySelector(".ship")?.click();
      }, timeout * 1000);
    }
    // console.log("Clicked:", randomElement.children[0]);
  }
}
