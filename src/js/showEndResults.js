import {
  mySideEnemyFleet,
  enemySideMyFleet,
  notificatonWindow,
  notificatonWindow2,
  // overlay,
  btnCloseNotificationWindow,
  btnCloseNotificationWindow2,
} from "./globalVars";

import { playing } from "./gameStartControl";
import { getSeaOpacityBack } from "./helpers";
export default function (fleet) {
  const resultsMessage = document.querySelector(".results-message");
  const resultsMessage2 = document.querySelector(".results-message-2");
  const allShips = [...fleet.querySelectorAll(".ship")];
  const player1 = document.querySelector(".username-1").textContent;
  const player2 = document.querySelector(".username-2").textContent;

  const injuredShips = allShips
    .map((ship) => {
      if (ship.classList.contains("injure")) return ship;
    })
    .filter((ship) => {
      // It can be undefined
      if (ship) return ship;
    });
  console.log(fleet);
  const areAllShipsInjured = injuredShips.length === allShips.length;

  // Show notification window
  const openNotificationWindow = function () {
    const addNotification = function (player) {
      resultsMessage.textContent !== "" && (resultsMessage.textContent = "");
      resultsMessage.insertAdjacentHTML(
        "afterbegin",
        `You ${fleet === enemySideMyFleet ? "won" : "lost"} the battle! ${
          fleet === enemySideMyFleet
            ? "Congratulations!"
            : "Get lucky other time 😐"
        }`
      );

      resultsMessage2.textContent !== "" && (resultsMessage2.textContent = "");
      resultsMessage2.insertAdjacentHTML(
        "afterbegin",
        `You ${fleet === mySideEnemyFleet ? "won" : "lost"} the battle! ${
          fleet === mySideEnemyFleet
            ? "Congratulations!"
            : "Get lucky other time 😐"
        }`
      );
    };

    fleet === mySideEnemyFleet && addNotification(player1);

    fleet !== mySideEnemyFleet && addNotification(player2);

    notificatonWindow.classList.remove("hidden");
    notificatonWindow2.classList.remove("hidden");
    // notificatonWindow.style.position = "absolute";
    // notificatonWindow.style.left = "0";
    // overlay.classList.remove("hidden");
    [mySideEnemyFleet, enemySideMyFleet].forEach(
      (fleet) => playing && (fleet.style.pointerEvents = "none"),

      getSeaOpacityBack()
    );
  };

  const closeNotificationWindow = function () {
    notificatonWindow.classList.add("hidden");

    // overlay.classList.add("hidden");
  };
  const closeNotificationWindow2 = function () {
    notificatonWindow2.classList.add("hidden");
    // overlay.classList.add("hidden");
  };

  areAllShipsInjured && openNotificationWindow();

  btnCloseNotificationWindow.addEventListener("click", closeNotificationWindow);
  // overlay.addEventListener("click", closeNotificationWindow);
  btnCloseNotificationWindow2.addEventListener(
    "click",
    closeNotificationWindow2
  );
  // overlay.addEventListener("click", closeNotificationWindow2);

  // document.addEventListener("keydown", function (e) {
  //   // console.log(e.key);

  //   e.key === "Escape" &&
  //     !notificatonWindow.classList.contains("hidden") &&
  //     !notificatonWindow2.classList.contains("hidden") &&
  //     closeNotificationWindow();
  // });
}
