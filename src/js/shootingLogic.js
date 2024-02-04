import {
  mySideMyFleet,
  enemySideEnemyFleet,
  enemySideMyFleet,
} from "./globalVars";
import showEndResults from "./showEndResults";
import { playing } from "./gameStartControl";
import { buildShipBorder } from "./buildShipBorder";
export default function (fleet, ships) {
  fleet.addEventListener("click", function (e) {
    e.preventDefault();

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

    const addMissMark = function () {
      if (e.target.textContent !== "") return;
      e.target.querySelector("div").classList.add("miss");
      e.target.querySelector("div").insertAdjacentHTML("afterbegin", miss);
      e.target
        .closest(".enemy-side--my-fleet")
        ?.querySelector(`.${e.target.classList[0]}`) &&
        (addMarkToFleet(mySideMyFleet).classList.add("miss"),
        addMarkToFleet(mySideMyFleet).insertAdjacentHTML("afterbegin", miss)),
        !e.target
          .closest(".enemy-side--my-fleet")
          ?.querySelector(`.${e.target.classList[0]}`) &&
          (addMarkToFleet(enemySideEnemyFleet).classList.add("miss"),
          addMarkToFleet(enemySideEnemyFleet).insertAdjacentHTML(
            "afterbegin",
            miss
          ));
    };

    !e.target.closest(".ship") && addMissMark();

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
      (addMarkToFleet(mySideMyFleet).nextElementSibling.insertAdjacentHTML(
        "afterbegin",
        injure
      ),
      addMarkToFleet(mySideMyFleet).nextElementSibling.classList.add("injure"));

    !e.target
      .closest(".enemy-side--my-fleet")
      ?.querySelector(`.${e.target.classList[0]}`) &&
      (addMarkToFleet(
        enemySideEnemyFleet
      ).nextElementSibling.insertAdjacentHTML("afterbegin", injure),
      addMarkToFleet(enemySideEnemyFleet).nextElementSibling.classList.add(
        "injure"
      ));

    if (destroyedShipCoords.includes(false)) return;

    const addBorder = function (borderSide, coord) {
      const selectTd = function (fleetSide) {
        fleetSide.querySelector(`.${coord}`).closest(".dropzone").style[
          borderSide
        ] = "2px solid #ff6f6f";
      };

      selectTd(fleet);
      selectTd(
        fleet === enemySideMyFleet ? mySideMyFleet : enemySideEnemyFleet
      );
    };

    ships[injuredShipPos].coords.map((coord, i, arr) => {
      buildShipBorder([ships[injuredShipPos], coord, i, arr, addBorder]);
    });

    const destroyedShip = ships[injuredShipPos].coords.map((cell, i) => {
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

      .map((cell, i, arr) => {
        console.log(new Date());
        const cellAround = fleet.querySelector(`.${cell}`);
        console.log(cellAround, "cellAround");
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
            (cellAround.style.fontSize = "3.9rem");
          cellAround.style.visibility = "hidden";
          setTimeout(function () {
            cellAround.style.visibility = "visible";
          }, i * 100);
        };

        const markContraryFleet = function (fleet) {
          const cellAroundContrarySide = fleet.querySelector(`.${cell}`);

          surroundDestroyedShip(fleet, cellAroundContrarySide);
        };

        e.target.closest(".ship").closest(".enemy-side--my-fleet") &&
          markContraryFleet(mySideMyFleet);

        e.target.closest(".ship").closest(".my-side--enemy-fleet") &&
          markContraryFleet(enemySideEnemyFleet);

        // If the cell is empty then a new mark will be inserted, but if there is something inside then nothing will happen

        surroundDestroyedShip(fleet, cellAround);
      });

    /**************************/
    /* CONTROLLING THE END OF THE GAME */
    /**************************/

    showEndResults(fleet);
  });
}
