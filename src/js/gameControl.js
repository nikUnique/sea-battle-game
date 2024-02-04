import {
  mySideMyFleet,
  mySideEnemyFleet,
  enemySideMyFleet,
} from "./globalVars";
import { playing } from "./gameStartControl";
export default function (fleet) {
  mySideMyFleet.classList.add("player0");
  playing === true && (enemySideMyFleet.style.pointerEvents = "none");
  [mySideEnemyFleet, enemySideMyFleet].forEach((fleet) => {
    fleet.addEventListener("click", function (e) {
      if (
        e.target.classList.contains("ship") ||
        e.target.textContent !== "" ||
        e.target.querySelector(".ship")?.classList.contains("ship")
      )
        return;
      console.log(fleet, "float");
      const turn =
        playing && fleet === enemySideMyFleet
          ? mySideEnemyFleet
          : enemySideMyFleet;
      playing && (turn.style.pointerEvents = "auto");
      playing && (fleet.style.pointerEvents = "none");
    });
  });
}
