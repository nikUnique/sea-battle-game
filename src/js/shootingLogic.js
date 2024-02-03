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
      if (e.target.classList[0] === "dropzone")
        return fleet.querySelector(
          `.${e.target.querySelector("div").classList[0]}`
        );

      if (e.target.classList[0] !== "dropzone")
        return fleet.querySelector(`.${e.target.classList[0]}`);
    };

    !e.target.closest(".ship") &&
      e.target.textContent === "" &&
      (e.target.querySelector("div").classList.add("miss"),
      e.target.querySelector("div").insertAdjacentHTML("afterbegin", miss),
      e.target
        .closest(".enemy-side--my-fleet")
        ?.querySelector(`.${e.target.classList[0]}`) &&
        (addMarkToFleet(GlobalVars.mySideMyFleet).classList.add("miss"),
        addMarkToFleet(GlobalVars.mySideMyFleet).insertAdjacentHTML(
          "afterbegin",
          miss
        )),
      !e.target
        .closest(".enemy-side--my-fleet")
        ?.querySelector(`.${e.target.classList[0]}`) &&
        (addMarkToFleet(GlobalVars.enemySideEnemyFleet).classList.add("miss"),
        addMarkToFleet(GlobalVars.enemySideEnemyFleet).insertAdjacentHTML(
          "afterbegin",
          miss
        )));

    if (e.target.closest(".ship")?.textContent !== "") return;

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

    e.target
      .closest(".enemy-side--my-fleet")
      ?.querySelector(`.${e.target.classList[0]}`) &&
      (addMarkToFleet(
        GlobalVars.mySideMyFleet
      ).nextElementSibling.insertAdjacentHTML("afterbegin", injure),
      addMarkToFleet(GlobalVars.mySideMyFleet).nextElementSibling.classList.add(
        "injure"
      ));

    !e.target
      .closest(".enemy-side--my-fleet")
      ?.querySelector(`.${e.target.classList[0]}`) &&
      (addMarkToFleet(
        GlobalVars.enemySideEnemyFleet
      ).nextElementSibling.insertAdjacentHTML("afterbegin", injure),
      addMarkToFleet(
        GlobalVars.enemySideEnemyFleet
      ).nextElementSibling.classList.add("injure"));

    if (destroyedShipCoords.includes(false)) return;

    const sortedCoordNumbers = ships[injuredShipPos].coords
      .map((coord) => {
        return coord.slice(1);
      })
      .sort((a, b) => a - b);

    const sortedCoordLetters = ships[injuredShipPos].coords
      .map((letter, i) => {
        return letter.slice(0, 1);
      })
      .sort();

    const sortedCoords = ships[injuredShipPos].coords.map((ship, i) => {
      return sortedCoordLetters[i] + sortedCoordNumbers[i];
    });

    const addBorder = function (borderSide, coord) {
      fleet.querySelector(`.${coord}`).closest(".dropzone").style[borderSide] =
        "2px solid #ff6f6f";
    };

    sortedCoords.map((coord, i, arr) => {
      // Columns:
      // 1. Add top to the first cell
      ships[injuredShipPos].direction === "column"
        ? i === 0 && addBorder("borderTop", coord)
        : // Add left to the top cell
          i === 0 && addBorder("borderLeft", coord);
      // 2. Add the bottom to the last cell
      ships[injuredShipPos].direction === "column"
        ? i === arr.length - 1 && addBorder("borderBottom", coord)
        : i === arr.length - 1 && addBorder("borderRight", coord);

      // 3. Right and left
      ships[injuredShipPos].direction === "column"
        ? addBorder("borderLeft", coord)
        : addBorder("borderTop", coord);

      ships[injuredShipPos].direction === "column"
        ? addBorder("borderRight", coord)
        : addBorder("borderBottom", coord);
    });

    const destroyedShip = ships[injuredShipPos].coords.map((_, i) => {
      return fleet.querySelector(`.${ships[injuredShipPos]?.coords[i]}`);
    });

    const filledAreaAroundShip = ships[injuredShipPos].unavailabeCells
      .filter((cell) => {
        // Filtering out coords on which the ship inself is placed, because unavailableCells also included them
        return !ships[injuredShipPos].coords.includes(cell);
      })
      .filter((cell) => {
        return fleet.querySelector(`.${cell}`)?.textContent === "";
      })

      .map((cell, i) => {
        setTimeout(function () {
          const cellAround = fleet.querySelector(`.${cell}`);

          // There is also can be an imaginary 11th cell when it comes to side ships(because unavailableCells contains them, but only for conveniency reason), so there is a check whether that cell exists or not, because there is no 11th cell exists in the sea(Means that this could be misunderstood as if 11th cell exists but transparent)
          cellAround && (cellAround.style.fontSize = "3.2rem");

          const surroundDestroyedShip = function (fleet, cellAround) {
            console.log(new Date());
            cellAround?.textContent === "" &&
              fleet
                .querySelector(`.${cell}`)
                ?.insertAdjacentHTML("afterbegin", miss);
            !cellAround?.classList.contains("miss") &&
              cellAround?.classList.add("cell-around");
            cellAround && (cellAround.style.fontSize = "3.2rem");
            cellAround.classList.contains("injure") &&
              (cellAround.style.fontSize = "4rem");
          };

          const markContraryFleet = function (fleet) {
            const cellAroundContrarySide = fleet.querySelector(`.${cell}`);

            surroundDestroyedShip(fleet, cellAroundContrarySide);
          };

          e.target.closest(".ship").closest(".enemy-side--my-fleet") &&
            markContraryFleet(GlobalVars.mySideMyFleet);

          e.target.closest(".ship").closest(".my-side--enemy-fleet") &&
            markContraryFleet(GlobalVars.enemySideEnemyFleet);

          // If the cell is empty then a new mark will be inserted, but if there is something inside then nothing will happen

          surroundDestroyedShip(fleet, cellAround);
        }, 100 * i);
      });

    /**************************/
    /* CONTROLLING THE END OF THE GAME */
    /**************************/

    showEndResults(fleet);
  });
}
