import * as GlobalVars from "./globalVars";
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
      if (ship) return ship;
    });

  const areAllShipsInjured = injuredShips.length === allShips.length;

  // Show notification window
  const openNotificationWindow = function () {
    const addNotification = function (player) {
      resultsMessage.insertAdjacentHTML("afterbegin", `${player} won the game`);
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
}
