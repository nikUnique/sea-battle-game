import { MIN_INPUT_LENGTH, NEW_GAME_AGREEMENT_COMPLETE_LENGTH } from "./config";

import {
  bothFleetsReady,
  newGameAgreement,
  playingCheck,
} from "./gameStartControl";

import {
  allTimers,
  bothSideShips,
  changeUsernameBtn1,
  changeUsernameBtn2,
  createEnemyShips,
  createMyShips,
  enemySideEnemyFleet,
  enemySideEnemyShips,
  enemySideMyFleet,
  mySideEnemyFleet,
  mySideMyFleet,
  mySideMyShips,
  newGameBtn1,
  newGameBtn2,
  startGameBtn1,
  startGameBtn2,
} from "./globalVars";

import {
  allowForbidClick,
  closeNotificationWindow1,
  closeNotificationWindow2,
  getSeaOpacityBack,
  closeUsernameForm,
  openUsernameForm,
  startTimer,
} from "./helpers";

import placeShipsManually from "./placeShipsManually";
import createShip from "./makeShips";

export const startNewGame = function (fleet) {
  const fleetIsMySideMyFleet = fleet === mySideMyFleet;

  const definePlayerNumber = fleetIsMySideMyFleet ? 1 : 2;

  const newGameBtn = fleetIsMySideMyFleet ? newGameBtn1 : newGameBtn2;

  const changeUsernameBtn = fleetIsMySideMyFleet
    ? changeUsernameBtn1
    : changeUsernameBtn2;

  changeUsernameBtn.addEventListener("click", function (e) {
    openUsernameForm(fleet, "flex");
  });

  const submitBtn = document.querySelector(
    `.submit-username--fleet-${definePlayerNumber}`
  );

  const inputUsername = document.querySelector(
    `.fill-username--player-${definePlayerNumber}`
  );

  const usernameLabel = document.querySelector(
    `.username-${definePlayerNumber}`
  );

  const submitUsernames = function () {
    // Default player name
    inputUsername.value =
      (fleetIsMySideMyFleet ? "First" : "Second") + "-player";

    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const checkUsernameCase = function (input) {
        return (
          input.value.toLowerCase().slice(0, 1).toUpperCase() +
          input.value.slice(1).toLowerCase()
        );
      };

      const playerUsername = checkUsernameCase(inputUsername).trim();

      if (playerUsername.length < MIN_INPUT_LENGTH) {
        console.log("Your username should contains at least 2 letters");

        return;
      }

      if (playerUsername.includes(" ")) {
        console.log(playerUsername, "username");

        console.log("Your username should not contain empty spaces");

        return;
      }

      usernameLabel.textContent = "";

      usernameLabel.insertAdjacentHTML(
        "afterbegin",
        playerUsername + "'s ships"
      );

      inputUsername.value = "";

      console.log(playerUsername);
      closeUsernameForm(fleet, "none");
    });
  };

  submitUsernames();

  newGameBtn.addEventListener("click", function () {
    fleetIsMySideMyFleet &&
      !newGameAgreement.includes("mySideMyFleet") &&
      newGameAgreement.push("mySideMyFleet");
    fleet === enemySideEnemyFleet &&
      !newGameAgreement.includes("enemySideEnemyFleet") &&
      newGameAgreement.push("enemySideEnemyFleet");

    // Defines whether both player pressed "New Game" button or not
    if (newGameAgreement.length !== NEW_GAME_AGREEMENT_COMPLETE_LENGTH) return;

    const refreshFleets = function () {
      closeNotificationWindow1();
      closeNotificationWindow2();

      getSeaOpacityBack();

      allTimers.forEach((timerEl) => {
        timerEl.style.opacity = "0";
      });

      startTimer(fleet, true);

      playingCheck.playing = false;

      [
        [mySideMyFleet, "auto"],
        [enemySideEnemyFleet, "auto"],
        [mySideEnemyFleet, "none"],
        [enemySideMyFleet, "none"],
      ].forEach((item) => allowForbidClick(...item));

      newGameBtn1.setAttribute("disabled", true);

      newGameBtn2.setAttribute("disabled", true);

      const clearAndRefreshFleets = function () {
        [...document.querySelectorAll("td")].forEach((cell) => {
          cell.querySelector(".ship")?.remove();

          cell.querySelector(".miss")?.classList.remove("miss");

          cell.removeAttribute("style");

          cell.querySelector(".cell-around")?.classList.remove("cell-around");

          cell.querySelector(".cell").textContent = "";
        });
        mySideMyShips.splice(0);
        enemySideEnemyShips.splice(0);

        createMyShips.forEach((ship) => {
          createShip(...ship, [mySideMyFleet, mySideMyShips, createMyShips]);
        });

        createEnemyShips.forEach((ship) => {
          createShip(...ship, [
            enemySideEnemyFleet,
            enemySideEnemyShips,
            createEnemyShips,
          ]);
        });

        startGameBtn1.removeAttribute("disabled", true);

        startGameBtn2.removeAttribute("disabled", true);

        [changeUsernameBtn1, changeUsernameBtn2].forEach((btn) => {
          btn.removeAttribute("disabled", true);
        });

        startGameBtn1.style.display = "";
        startGameBtn2.style.display = "";
        bothFleetsReady.splice(0);
        bothSideShips.splice(0);
      };

      if (fleetIsMySideMyFleet || fleet === enemySideEnemyFleet) {
        clearAndRefreshFleets();
      }

      placeShipsManually(mySideMyFleet, [
        mySideMyFleet,
        mySideMyShips,
        createMyShips,
      ]);
      placeShipsManually(enemySideEnemyFleet, [
        enemySideEnemyFleet,
        enemySideEnemyShips,
        createEnemyShips,
      ]);
    };

    refreshFleets();
  });
};
