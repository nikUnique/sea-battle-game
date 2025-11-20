import {
  mySideMyFleet,
  mySideEnemyFleet,
  enemySideMyFleet,
  enemySideEnemyFleet,
} from "./globalVarsPause.js";

import { playingCheck, whoseTurn } from "./gameStartControl.js";

import { sleep, startTimer } from "./helpers.js";

export function gameControlHandler(e, fleet) {
  console.log("fleet in the gameControlHandler", fleet, e);

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

  whoseTurn.turn = turn;

  console.log("turn", turn);

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
}

// export default function () {
//   // playingCheck.playing === true &&
//   //   (enemySideMyFleet.style.pointerEvents = "none");

//   [mySideEnemyFleet, enemySideMyFleet].forEach((fleet) => {
//     console.log(playingCheck.playing);

//     // Adding an event listener to fleets on which we try to find ships
//     fleet.addEventListener("click", async function (e) {
//       console.log("this in gameControl", this, fleet);
//       // deferExecution(e, this);

//       await sleep((duration.duration - 0.2) * 1000);
//       console.log("this AFter sleep", this, fleet);
//       gameControlHandler(e, this);
//     });
//   });
// }
