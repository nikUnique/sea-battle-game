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
import {
  closeNotificationWindow,
  closeNotificationWindow2,
  getSeaOpacityBack,
} from "./helpers";
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

  const composeMessage = function (messageEl, fleetSide) {
    messageEl.textContent !== "" && (messageEl.textContent = "");
    messageEl.insertAdjacentHTML(
      "afterbegin",
      `You ${fleet === fleetSide ? "won" : "lost"} the battle! ${
        fleet === fleetSide ? "Congratulations! 🎊" : "Get lucky other time 😐"
      }`
    );
  };

  // Show notification window
  const openNotificationWindow = function () {
    const addNotification = function (player) {
      composeMessage(resultsMessage, enemySideMyFleet);
      composeMessage(resultsMessage2, mySideEnemyFleet);
    };

    fleet === mySideEnemyFleet && addNotification(player1);

    fleet !== mySideEnemyFleet && addNotification(player2);

    notificatonWindow.classList.remove("hidden");
    notificatonWindow2.classList.remove("hidden");

    // overlay.classList.remove("hidden");
    [mySideEnemyFleet, enemySideMyFleet].forEach(
      (fleet) => playing && (fleet.style.pointerEvents = "none"),

      getSeaOpacityBack()
    );
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
