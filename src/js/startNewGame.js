import {
  bothFleetsReady,
  newGameAgreement,
  playingCheck,
} from "./gameStartControl";
import {
  allTimers,
  bothSideShips,
  createEnemyShips,
  createMyShips,
  enemySideEnemyFleet,
  enemySideEnemyShips,
  enemySideMyFleet,
  mySideEnemyFleet,
  mySideMyFleet,
  mySideMyShips,
  newGameBtn,
  newGameBtn2,
  startGameBtn,
  startGameBtn2,
} from "./globalVars";
import {
  allowForbidClick,
  closeNotificationWindow,
  closeNotificationWindow2,
  getSeaOpacityBack,
  startTimer,
} from "./helpers";
import placeShipsManually from "./placeShipsManually";

export const startNewGame = function (fleet, fleetParts) {
  const fleetIsMySideMyFleet = fleet === mySideMyFleet;

  const submitBtn = document.querySelector(
    `.submit-username--fleet-${fleetIsMySideMyFleet ? 1 : 2}`
  );
  const inputPlayer1Username = document.querySelector(
    ".fill-username--player-1"
  );
  const inputPlayer2Username = document.querySelector(
    ".fill-username--player-2"
  );
  const username1Label = document.querySelector(".username-1");
  const username2Label = document.querySelector(".username-2");
  console.log(inputPlayer1Username);
  const submitUsernames = function () {
    inputPlayer1Username.value = "player-1";
    inputPlayer2Username.value = "player-2";

    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const checkUsernameCase = function (input) {
        return (
          input.value.toLowerCase().slice(0, 1).toUpperCase() +
          input.value.slice(1).toLowerCase() +
          "'s ships"
        );
      };

      const player1Username = checkUsernameCase(inputPlayer1Username);

      const player2Username = checkUsernameCase(inputPlayer2Username);

      if (
        fleetIsMySideMyFleet
          ? player1Username.length < 2
          : player2Username.length < 2
      ) {
        console.log("Your username should contains atleast 2 letters");
        return;
      }
      (fleetIsMySideMyFleet ? username1Label : username2Label).textContent = "";
      const playerUsername = fleetIsMySideMyFleet
        ? player1Username
        : player2Username;
      const usernameLabel = fleetIsMySideMyFleet
        ? username1Label.insertAdjacentHTML("afterbegin", playerUsername)
        : username2Label.insertAdjacentHTML("afterbegin", playerUsername);

      fleetIsMySideMyFleet
        ? (inputPlayer1Username.value = "")
        : (inputPlayer2Username.value = "");
      console.log(playerUsername);
    });
  };

  submitUsernames();

  (fleetIsMySideMyFleet ? newGameBtn : newGameBtn2).addEventListener(
    "click",
    function (e) {
      fleetIsMySideMyFleet &&
        !newGameAgreement.includes("mySideMyFleet") &&
        newGameAgreement.push("mySideMyFleet");
      fleet === enemySideEnemyFleet &&
        !newGameAgreement.includes("enemySideEnemyFleet") &&
        newGameAgreement.push("enemySideEnemyFleet");
      if (newGameAgreement.length !== 2) return;

      const refreshFleets = function () {
        closeNotificationWindow();
        closeNotificationWindow2();

        (fleetIsMySideMyFleet ? startGameBtn : startGameBtn2).removeAttribute(
          "disabled",
          true
        );
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

        const clearFleets = function () {
          [...document.querySelectorAll("td")].forEach((cell) => {
            cell.querySelector(".ship")?.remove();
            cell.querySelector(".miss")?.classList.remove("miss");
            cell.removeAttribute("style");

            cell.querySelector(".cell-around")?.classList.remove("cell-around");
            cell.querySelector(".cell").textContent = "";
          }),
            mySideMyShips.splice(0),
            enemySideEnemyShips.splice(0),
            createMyShips.forEach((ship) => {
              createShip(...ship, [
                mySideMyFleet,
                mySideMyShips,
                createMyShips,
              ]);
            }),
            createEnemyShips.forEach((ship) => {
              createShip(...ship, [
                enemySideEnemyFleet,
                enemySideEnemyShips,
                createEnemyShips,
              ]);
            }),
            newGameBtn.setAttribute("disabled", true),
            newGameBtn2.setAttribute("disabled", true),
            startGameBtn.removeAttribute("disabled", true),
            startGameBtn2.removeAttribute("disabled", true),
            bothFleetsReady.splice(0);
          bothSideShips.splice(0);
        };

        fleetIsMySideMyFleet ? clearFleets() : "";

        fleet === enemySideEnemyFleet ? clearFleets() : "";

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
    }
  );
};
