import {
  mySideMyFleet,
  mySideEnemyFleet,
  enemySideMyFleet,
} from "./globalVars";
import { playing } from "./gameStartControl";
import shootingLogic, { keyShot } from "./shootingLogic";
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
      )
        return;

      const turn =
        playing && fleet === enemySideMyFleet
          ? mySideEnemyFleet
          : enemySideMyFleet;
      if (playing) {
        (turn.style.pointerEvents = "auto"),
          /*    turn.querySelector("td").setAttribute("tabindex", 10000),
        turn.querySelector("td").focus() */ (fleet.closest(
            ".sea"
          ).style.opacity = "0.7");

        // // Arrow gameplay control
        // let start = turn.querySelector("td");
        // let sibling;
        // start.focus();
        // start.style.backgroundColor = "#50b988";
        // start.style.color = "white";

        // const changeStyle = (sibling) => {
        //   console.log(start, "start");
        //   if (sibling !== null) {
        //     start.focus();
        //     start.style.backgroundColor = "";
        //     start.style.color = "";
        //     sibling.focus();
        //     sibling.classList.add("focused");
        //     sibling.style.backgroundColor = "#50b988";
        //     sibling.style.color = "white";
        //     start = sibling;
        //   }
        // };

        // const checkKey = (e) => {
        //   // e = e || window.e;
        //   const idx = start.cellIndex;
        //   console.log(e, "e");
        //   if (e.key === "ArrowUp") {
        //     // up arrow
        //     turn.querySelector(".focused")?.classList.remove("focused");
        //     const previousRow = start.parentElement.previousElementSibling;
        //     if (previousRow !== null) {
        //       sibling = previousRow.cells[idx];
        //       changeStyle(sibling);
        //     }
        //   } else if (e.key === "ArrowDown") {
        //     // down arrow
        //     turn.querySelector(".focused")?.classList.remove("focused");
        //     const nextRow = start.parentElement.nextElementSibling;
        //     if (nextRow !== null) {
        //       sibling = nextRow.cells[idx];
        //       changeStyle(sibling);
        //     }
        //   } else if (e.key === "ArrowLeft") {
        //     // left arrow
        //     turn.querySelector(".focused")?.classList.remove("focused");
        //     sibling = start.previousElementSibling;
        //     changeStyle(sibling);
        //   } else if (e.key === "ArrowRight") {
        //     // right arrow
        //     turn.querySelector(".focused")?.classList.remove("focused");
        //     console.log("Arrow right");
        //     sibling = start.nextElementSibling;
        //     changeStyle(sibling);
        //   }
        //   // const keyShot = function (e) {
        //   //   if (e.key === "Enter") {
        //   //     shootingLogic(fleet, );
        //   //   }
        //   // };
        //   // document.addEventListener("keydown", keyShot);
        // };

        // document.onkeydown = checkKey;
        // // start.addEventListener("keydown", function (e) {
        // //   if (e.key === "Enter") {
        // //     shootingLogic(sibling, e);
        // //   }
        // // });
      }
      playing && (fleet.style.pointerEvents = "none"),
        (turn.closest(".sea").style.opacity = "1");
    });
  });
}
