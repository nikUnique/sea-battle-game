import * as GlobalVars from "./globalVars";
export default function (fleet, fleetParts) {
  let dragged;
  const shipEls = fleet.querySelectorAll(".ship");
  const ships = fleetParts[1];
  shipEls.forEach((shipEl, i) => {
    shipEl.classList.add(`cell${i + 1}`);
  });
  const letters = GlobalVars.letters;

  // Is it possible to make unavailable cells unavailabe during ship placing?
  // When a ship is placed make cells unavailabe right away

  const cells = [...fleet.querySelectorAll("td")].filter((cell) => {
    return !cell.classList.contains("ship");
  });

  cells.forEach((cell) => {
    cell.classList.add("dropzone");
  });

  shipEls.forEach((shipEl) => {
    shipEl.setAttribute("draggable", true);
  });

  fleet.addEventListener("dragstart", function (e) {
    console.log("DRAGSTART");
    console.log(e.target);
    dragged = e.target;
  });

  fleet.addEventListener("dragend", function (e) {
    // const letters = GlobalVars.letters;

    console.log("DRAGEND", e.target);
    // console.log(e.target.classList[0]);
    // const coord = e.target.classList[0];
    // const coordSlice01 = coord.slice(0, 1);
    // const coordSlice1 = coord.slice(1);
    // const letterAround = letters.indexOf(coordSlice01);

    // const previousCell = coordSlice01 + (+coordSlice1 - 1);
    // const nextCell = coordSlice01 + (+coordSlice1 + 1);
    // const rightCell = letters[letterAround + 1] + coordSlice1;

    // const leftCell = letters[letterAround - 1] + coordSlice1;
    // console.log(rightCell, leftCell);
    // console.log(previousCell, nextCell);

    // const diagonalCells = function (number1, number2) {
    //   return letters[letterAround + number1] + (+coordSlice1 + number2);
    // };

    // const rightTopCell = diagonalCells(1, -1);
    // const leftTopCell = diagonalCells(-1, -1);
    // const leftBottomCell = diagonalCells(-1, 1);
    // const rightBottomCell = diagonalCells(1, 1);

    // console.log(rightTopCell, leftTopCell, leftBottomCell, rightBottomCell);
    // [
    //   previousCell,
    //   nextCell,
    //   rightCell,
    //   leftCell,
    //   rightTopCell,
    //   leftTopCell,
    //   leftBottomCell,
    //   rightBottomCell,
    // ].forEach((cell) => {
    //   document
    //     .querySelector(`.${cell}`)
    //     ?.closest(".dropzone")
    //     ?.classList.add("no-drop");
    // });
    // How to make cell unavailable after droping one?
    // When the ship is dropped I need to change or create unavailable cells exactly for that ship
    // The target shouldn't be an unavailable cell

    // const cellsAround = bigCoords.reduce((acc, coord, i) => {

    // });

    // console.log(
    //   ships.map((ship) => {
    //     //   console.log(ship);
    //     //   const unavailableCells = ship.unavailabeCells.filter((cell) => {
    //     //     console.log(document.querySelector(".cell"));
    //     //     return !document.querySelector(".cell")?.classList.contains("ship");
    //     //   });
    //     return ship.unavailabeCells.some((cell) => {
    //       return e.target.classList[0].includes(cell);
    //     });
    //     // console.log(unavailableCells, "un");
    //   })
    // );

    fleet.querySelector(`.${dragged?.classList[dragged.classList.length - 1]}`);
  });

  ["dragover", "dragenter", "dragleave", "drop"].forEach((ev) => {
    fleet.addEventListener(
      ev,
      function (e) {
        e.target.classList.contains("dropzone")
          ? (console.log(ev), e.target.classList.remove("dragover"))
          : "";

        if (ev === "drop") {
          e.preventDefault(),
            console.log(dragged),
            !e.target.classList.contains("ship") &&
              e.target.appendChild(dragged),
            fleet
              .querySelector(
                `.${dragged.classList[dragged.classList.length - 1]}`
              )
              .classList.replace(
                fleet.querySelector(
                  `.${dragged.classList[dragged.classList.length - 1]}`
                ).classList[0],
                e.target.querySelector("div")?.classList[0]
              );
        }

        const checkDragoverE = function () {
          e.preventDefault();
          console.log("put");
          console.log(e, "put");

          if (ev !== "dragover") return;
          if (
            e.target.classList.contains("ship") ||
            e.target.classList.length === 0
          ) {
            return;
          }
          e.target.classList.add("dragover");
        };

        checkDragoverE();
      },
      ev === "dragover" && false
    );
  });
}
