import * as GlobalVars from "./globalVars";
import { playing } from "./gameStartControl";
export default function (fleet) {
  GlobalVars.mySideMyFleet.classList.add("player0");
  playing === true &&
    (GlobalVars.enemySideMyFleet.style.pointerEvents = "none");
  [GlobalVars.mySideEnemyFleet, GlobalVars.enemySideMyFleet].forEach(
    (fleet) => {
      fleet.addEventListener("click", function (e) {
        if (
          e.target.classList.contains("ship") ||
          e.target.textContent !== "" ||
          e.target.querySelector(".ship")?.classList.contains("ship")
        )
          return;
        console.log(fleet, "float");
        const turn =
          playing && fleet === GlobalVars.enemySideMyFleet
            ? GlobalVars.mySideEnemyFleet
            : GlobalVars.enemySideMyFleet;
        playing && (turn.style.pointerEvents = "auto");
        playing && (fleet.style.pointerEvents = "none");
      });
    }
  );
}
