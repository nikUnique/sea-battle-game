import {
  mySideMyFleet,
  mySideEnemyFleet,
  enemySideMyFleet,
  enemySideEnemyFleet,
} from "./globalVars";
import { playing } from "./gameStartControl";
import { startTimer } from "./helpers";

export default function (fleet) {
  mySideMyFleet.classList.add("player0");
  playing === true && (enemySideMyFleet.style.pointerEvents = "none");
  [mySideEnemyFleet, enemySideMyFleet].forEach((fleet) => {
    console.log(playing);

    fleet.addEventListener("click", function (e) {
      if (
        e.target.classList.contains("ship") ||
        e.target.textContent !== "" ||
        e.target.querySelector(".ship")?.classList.contains("ship")
      ) {
        return;
      }

      const turn =
        playing && fleet === enemySideMyFleet
          ? mySideEnemyFleet
          : enemySideMyFleet;
      if (playing) {
        (turn.style.pointerEvents = "auto"),
          (fleet.closest(".sea").style.opacity = "0.7");
        startTimer(turn);
        fleet.closest(".sea-container").querySelector(".timer-label") &&
          (fleet
            .closest(".sea-container")
            .querySelector(".timer-label").style.opacity = "0");
        const fleetSide =
          fleet === enemySideMyFleet ? mySideMyFleet : enemySideEnemyFleet;
        fleetSide
          .closest(".sea-container")
          .querySelector(".timer-label").style.opacity = "0";
      }
      playing && (fleet.style.pointerEvents = "none"),
        (turn.closest(".sea").style.opacity = "1");
    });
  });
}
