import * as GlobalVars from "./globalVars";
import showEndResults from "./showEndResults";
import { playing } from "./gameStartControl";
export default function (fleet, ships) {
  fleet.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(playing, "lay");
    if (
      !playing ||
      e.target.querySelector(".ship")?.classList.contains("ship")
    ) {
      console.log("dropzone");
      return;
    }

    const miss = "&bull;";
    const addMarkToFleet = function (fleet) {
      if (e.target.classList[0] === "dropzone") {
        return fleet.querySelector(
          `.${e.target.querySelector("div").classList[0]}`
        );
      } else {
        return fleet.querySelector(`.${e.target.classList[0]}`);
      }
    };
    if (!e.target.closest(".ship") && e.target.textContent === "") {
      e.target.querySelector("div").classList.add("miss");
      e.target.querySelector("div").insertAdjacentHTML("afterbegin", miss);

      if (
        e.target
          .closest(".enemy-side--my-float")
          ?.querySelector(`.${e.target.classList[0]}`)
      ) {
        addMarkToFleet(GlobalVars.mySideMyFleet).classList.add("miss");

        addMarkToFleet(GlobalVars.mySideMyFleet).insertAdjacentHTML(
          "afterbegin",
          miss
        );
      } else {
        addMarkToFleet(GlobalVars.enemySideEnemyFleet).classList.add("miss");

        addMarkToFleet(GlobalVars.enemySideEnemyFleet).insertAdjacentHTML(
          "afterbegin",
          miss
        );
      }
    }

    if (e.target.closest(".ship")?.textContent === "") {
      const injuredShipPos = ships.findIndex((ship) => {
        return ship?.coords?.includes(e.target.classList[0]);
      });

      console.log(ships);

      e.target.classList.add("injure");
      const injure = "&cross;";
      e.target.insertAdjacentHTML("afterbegin", injure);

      const destroyedShipCoords = ships[injuredShipPos].coords.map((_, i) => {
        return fleet
          .querySelector(`.${ships[injuredShipPos]?.coords[i]}`)
          .nextElementSibling.classList.contains("injure");
      });

      if (
        e.target
          .closest(".enemy-side--my-float")
          ?.querySelector(`.${e.target.classList[0]}`)
      ) {
        addMarkToFleet(
          GlobalVars.mySideMyFleet
        ).nextElementSibling.insertAdjacentHTML("afterbegin", injure);

        addMarkToFleet(
          GlobalVars.mySideMyFleet
        ).nextElementSibling.classList.add("injure");
      } else {
        addMarkToFleet(
          GlobalVars.enemySideEnemyFleet
        ).nextElementSibling.insertAdjacentHTML("afterbegin", injure);

        addMarkToFleet(
          GlobalVars.enemySideEnemyFleet
        ).nextElementSibling.classList.add("injure");
      }

      if (!destroyedShipCoords.includes(false)) {
        const destroyedShip = ships[injuredShipPos].coords.map((_, i) => {
          return fleet.querySelector(`.${ships[injuredShipPos]?.coords[i]}`);
        });

        const filledAreaAroundShip = ships[injuredShipPos].unavailabeCells
          .filter((cell) => {
            // Filtering out coords on which the ship inself is placed, because unavailableCells also included them
            return !ships[injuredShipPos].coords.includes(cell);
          })
          .map((cell, i) => {
            const cellAround = fleet.querySelector(`.${cell}`);

            // There is also can be an imaginary 11th cell when it comes to side ships(because unavailableCells contains them, but only for conveniency reason), so there is a check whether that cell exists or not, because there is no 11th cell exists in the sea(Means that this could be misunderstood as if 11th cell exists but transparent)
            cellAround && (cellAround.style.fontSize = "3.9rem");

            const surroundDestroyedShip = function (fleet, cellAround) {
              cellAround?.textContent === "" &&
                fleet
                  .querySelector(`.${cell}`)
                  ?.insertAdjacentHTML("afterbegin", miss);
              !cellAround?.classList.contains("miss") &&
                cellAround?.classList.add("cell-around");
              cellAround && (cellAround.style.fontSize = "3.9rem");
            };

            const markContraryFleet = function (fleet) {
              const cellAroundContrarySide = fleet.querySelector(`.${cell}`);

              surroundDestroyedShip(fleet, cellAroundContrarySide);
            };

            e.target.closest(".ship").closest(".enemy-side--my-float") &&
              markContraryFleet(GlobalVars.mySideMyFleet);

            e.target.closest(".ship").closest(".my-side--enemy-float") &&
              markContraryFleet(GlobalVars.enemySideEnemyFleet);

            // If the cell is empty then a new mark will be inserted, but if there is something inside then nothing will happen
            surroundDestroyedShip(fleet, cellAround);
          });
      }
    }

    /**************************/
    /* CONTROLLING THE END OF THE GAME */
    /**************************/

    showEndResults(fleet);
  });
}
