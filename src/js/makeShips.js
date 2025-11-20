import * as GlobalVars from "./globalVars.js";
import { selectCellsAround } from "./helpers.js";

export default function (coords, size, fleetParts) {
  const fleet = fleetParts[0];
  const ships = fleetParts[1];
  const letters = GlobalVars.letters;

  const bigCoords = coords?.map((coord) => {
    return coord.toUpperCase();
  });

  // if (bigCoords === undefined) {
  //   return;
  // }

  // Check whether two or more ships were placed in the same cell, which is impossible now, but during development was
  const checkSpace = fleetParts[1]?.map((ship, i) => {
    return ship?.coords?.some((coord) => {
      return bigCoords.includes(coord);
    });
  });

  if (checkSpace.includes(true)) {
    console.log("Place your ships in the right way🍭");
    return false;
  }

  // Check if your ship was placed on the neighbour cells of other ships which is against the rules
  const checkSpaceAround = fleetParts[1].map((ship) => {
    return ship?.unavailabeCells?.some((cell) => {
      if (bigCoords.includes(cell)) {
        console.log(
          `You cannot place your ship on ${cell} because it's around another ship. Find a better place to drop an anchor 😂`
        );
      }

      return bigCoords.includes(cell);
    });
  });

  if (checkSpaceAround.includes(true)) return false;

  const sameLetter = coords.map((coord) => {
    return coord[0];
  });

  const sameNumber = coords.map((coord) => {
    return coord[1];
  });

  const columnShip = [...new Set(sameLetter)];
  const rowShip = [...new Set(sameNumber)];
  console.log(columnShip);

  // Defining if ship parts connected in the right way, or probably one part is in the cell which is diagonally opposite to another part of the same ship
  if (columnShip.length !== 1 && rowShip.length !== 1) {
    console.log("Place your ships in the right order, man 🕺");

    return false;
  }

  // Checks whether every ship is whole or not
  const checkShipsWholesomness = function () {
    if (
      fleet === GlobalVars.mySideMyFleet ||
      fleet === GlobalVars.enemySideEnemyFleet
    ) {
      return;
    }

    const checkShipsWholesomness = coords.map((coord, i) => {
      const cellAttributes = selectCellsAround(coord);

      // Condition checks all ships which have more then one part and every coord of that ship should contain at least one of the coords to the right, left, top or bottom and if not this means that this ship doesn't have all parts connected one after another
      if (
        coords.length > 1 &&
        !coords.includes(
          letters[cellAttributes.letterAround] +
            (cellAttributes.coordSlice1 - 1)
        ) &&
        !coords.includes(
          letters[cellAttributes.letterAround] +
            (+cellAttributes.coordSlice1 + 1)
        ) &&
        !coords.includes(
          letters[cellAttributes.letterAround - 1] + cellAttributes.coordSlice1
        ) &&
        !coords.includes(
          letters[cellAttributes.letterAround + 1] + cellAttributes.coordSlice1
        )
      ) {
        return false;
      }
    });

    if (checkShipsWholesomness.includes(false)) {
      console.log(ships, "ships");

      console.log("Place your ships in the right order, man 🤸‍♂️");

      return false;
    }
  };

  if (checkShipsWholesomness() === false) {
    return false;
  }

  // Computing all cells around damaged ship part
  const cellsAround = bigCoords.reduce((acc, coord, i) => {
    fleet.querySelector(`.${coord}`)?.classList.add("ship");

    const cellAttributes = selectCellsAround(coord);

    const coordSlice01 = cellAttributes.coordSlice01;

    const coordSlice1 = cellAttributes.coordSlice1;

    const letterAround = cellAttributes.letterAround;

    const previousCell = cellAttributes.previousCell;

    const nextCell = cellAttributes.nextCell;

    const rightCell = cellAttributes.rightCell;
    const leftCell = cellAttributes.leftCell;

    const diagonalCells = function (number1, number2) {
      return letters[letterAround + number1] + (+coordSlice1 + number2);
    };

    const rightTopCell = diagonalCells(1, -1);
    const leftTopCell = diagonalCells(-1, -1);

    const leftBottomCell = diagonalCells(-1, 1);

    const rightBottomCell = diagonalCells(1, 1);

    return (acc += `, ${previousCell}, ${nextCell}, ${leftCell} ,${rightCell} ,${rightTopCell} ,${leftTopCell} ,${leftBottomCell} ,${rightBottomCell}`);
  }, "");

  // Every ship part contains 8 cells around and if ship has more than 1 part this means that cells will be repeated and because of this here by creating a set I get rid of duplicate coordinates, but there are also coords on which ship parts themselves are placed, so, they will be taken care of later
  const readyCellsAround = [
    ...new Set(
      cellsAround
        .replace(",", "")
        .split(",")
        .map((cell) => cell.trim())
        .filter((cell) => letters.includes(cell.slice(0, 1)))
    ),
  ];

  console.log(bigCoords, "bigCoords");

  bigCoords.forEach((pos) => {
    const shipPartEl = fleet.querySelector(`.${pos}`);
    if (shipPartEl) {
      shipPartEl.classList.add("ship-color");
      shipPartEl.textContent = size;
    }

    // This is needed for placement reasons, of course a better idea is not to have this at all, but it is as it is
    fleet
      .querySelector(`.${pos}`)
      ?.insertAdjacentHTML("beforebegin", `<div class="${pos} cell"></div`);
  });

  const ship = {
    coords: bigCoords,
    size: size,
    unavailabeCells: readyCellsAround,
    direction:
      [...new Set(sameNumber)].length > [...new Set(sameLetter)].length
        ? "column"
        : "row",
  };

  ships.push(ship);

  // Paint similar ships with different colors
  if (
    fleet === GlobalVars.mySideMyFleet ||
    fleet === GlobalVars.enemySideEnemyFleet
  ) {
    const twoCellShips = ships.filter((ship) => {
      return ship.size === 2;
    });

    twoCellShips.forEach((ship, index) => {
      ship.coords.forEach((coord, i) => {
        index === 0 &&
          (fleet.querySelector(
            `.${coord}`
          ).nextElementSibling.style.backgroundColor = "#22b8cf");
        index === 1 &&
          (fleet.querySelector(
            `.${coord}`
          ).nextElementSibling.style.backgroundColor = "#12b886");
      });
    });

    const threeCellShips = ships.filter((ship) => {
      return ship.size === 3;
    });

    threeCellShips.forEach((ship, index) => {
      ship.coords.forEach((coord, i) => {
        index === 0 &&
          (fleet.querySelector(
            `.${coord}`
          ).nextElementSibling.style.backgroundColor = "#cc5de8");
      });
    });
  }

  console.log(ships, "ships");
}
