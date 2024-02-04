import {
  mySideEnemyFleet,
  enemySideMyFleet,
  notificatonWindow,
  overlay,
  btnCloseNotificationWindow,
} from "./globalVars";
import { playing } from "./gameStartControl";

export default function (fleet) {
  const player0 = "Dendy";
  const player1 = "Many";
  const resultsMessage = document.querySelector(".results-message");
  const allShips = [...fleet.querySelectorAll(".ship")];

  const injuredShips = allShips
    .map((ship) => {
      if (ship.classList.contains("injure")) return ship;
    })
    .filter((ship) => {
      // It can be undefined
      if (ship) return ship;
    });

  const areAllShipsInjured = injuredShips.length === allShips.length;

  // Show notification window
  const openNotificationWindow = function () {
    const addNotification = function (player) {
      resultsMessage.textContent !== "" && (resultsMessage.textContent = "");
      resultsMessage.insertAdjacentHTML("afterbegin", `${player} won the game`);
    };

    fleet === mySideEnemyFleet && addNotification(player0);

    fleet !== mySideEnemyFleet && addNotification(player1);

    notificatonWindow.classList.remove("hidden");
    overlay.classList.remove("hidden");
    [mySideEnemyFleet, enemySideMyFleet].forEach(
      (fleet) => playing && (fleet.style.pointerEvents = "none")
    );
  };

  const closeNotificationWindow = function () {
    notificatonWindow.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  areAllShipsInjured && openNotificationWindow();

  btnCloseNotificationWindow.addEventListener("click", closeNotificationWindow);
  overlay.addEventListener("click", closeNotificationWindow);

  document.addEventListener("keydown", function (e) {
    // console.log(e.key);

    e.key === "Escape" &&
      !notificatonWindow.classList.contains("hidden") &&
      closeNotificationWindow();
  });
}
