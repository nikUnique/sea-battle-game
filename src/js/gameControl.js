import {
  mySideMyFleet,
  mySideEnemyFleet,
  enemySideMyFleet,
  enemySideEnemyFleet,
} from "./globalVars";

import { playingCheck } from "./gameStartControl";

import { startTimer } from "./helpers";

export default function () {
  // playingCheck.playing === true &&
  //   (enemySideMyFleet.style.pointerEvents = "none");

  [mySideEnemyFleet, enemySideMyFleet].forEach((fleet) => {
    console.log(playingCheck.playing);

    // Adding an event listener to fleets on which we try to find ships
    fleet.addEventListener("click", function (e) {
      if (
        // Check complition of conditions which define whether the turn should or should not be changed
        e.target.classList.contains("ship") ||
        e.target.textContent !== "" ||
        e.target.querySelector(".ship")?.classList.contains("ship")
      ) {
        return;
      }

      const turn =
        playingCheck.playing && fleet === enemySideMyFleet
          ? mySideEnemyFleet
          : enemySideMyFleet;

      if (playingCheck.playing) {
        turn.style.pointerEvents = "auto";
        fleet.closest(".sea").style.opacity = "0.7";

        startTimer(turn);

        /*   fleet.closest(".sea-container").querySelector(".timer-label") && */
        fleet
          .closest(".sea-container")
          .querySelector(".timer-label").style.opacity = "0";

        // Selecting part of the fleet which is on your opponent's side
        const fleetSide =
          fleet === enemySideMyFleet ? mySideMyFleet : enemySideEnemyFleet;

        fleetSide
          .closest(".sea-container")
          .querySelector(".timer-label").style.opacity = "0";
      }

      // The turn changed and because of this the side which turn it was before will be unavailable for clicks
      playingCheck.playing && (fleet.style.pointerEvents = "none");

      turn.closest(".sea").style.opacity = "1";
    });
  });
}
