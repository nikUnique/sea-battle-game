import * as GlobalVars from "./globalVars";

export default createShip = function (coords, size, fleetParts) {
  const fleet = fleetParts[0];
  const ships = fleetParts[1];
  const letters = GlobalVars.letters;
  const bigCoords = coords?.map((coord) => {
    return coord.toUpperCase();
  });

  if (bigCoords === undefined) return;
  const checkSpace = fleetParts[1]?.map((ship, i) => {
    return ship?.coords?.some((coord) => {
      return bigCoords.includes(coord);
    });
  });

  if (checkSpace.includes(true)) {
    console.log(
      "In such a mood it wouldn't be surprising if you stepped with you shoe on a dog's poop 🍭"
    );
    return false;
  }

  const checkSpaceAround = fleetParts[1].map((ship) => {
    return ship?.unavailabeCells?.some((cell) => {
      if (bigCoords.includes(cell))
        console.log(
          `You cannot place your ship on ${cell} because it's around another ship. Find a better place to drop an anchor 😂`
        );

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
  if (columnShip.length !== 1 && rowShip.length !== 1) {
    console.log("Place your ships in the right order, man 🕺");

    return false;
  }

  if (
    fleet !== GlobalVars.mySideMyFleet &&
    fleet !== GlobalVars.enemySideEnemyFleet
  ) {
    const checkWholesomness = coords.map((coord, i) => {
      const coordSlice01 = coord.slice(0, 1);
      const coordSlice1 = coord.slice(1);

      const letterAround = letters.indexOf(coordSlice01);

      if (
        coords.length > 1 &&
        !coords.includes(letters[letterAround] + (coordSlice1 - 1)) &&
        !coords.includes(letters[letterAround] + (+coordSlice1 + 1)) &&
        !coords.includes(letters[letterAround - 1] + coordSlice1) &&
        !coords.includes(letters[letterAround + 1] + coordSlice1)
      ) {
        return false;
      }
    });

    if (checkWholesomness.includes(false)) {
      console.log(ships, "sho");
      console.log("Place your ships in the right order, man 🤸‍♂️");
      return false;
    }
  }

  const cellsAround = bigCoords.reduce((acc, coord, i) => {
    fleet.querySelector(`.${coord}`)?.classList.add("ship");
    const coordSlice01 = coord.slice(0, 1);
    const coordSlice1 = coord.slice(1);
    const letterAround = letters.indexOf(coordSlice01);

    const previousCell = coordSlice01 + (+coordSlice1 - 1);
    const nextCell = coordSlice01 + (+coordSlice1 + 1);

    const rightCell = letters[letterAround + 1] + coordSlice1;

    const leftCell = letters[letterAround - 1] + coordSlice1;

    const diagonalCells = function (number1, number2) {
      return letters[letterAround + number1] + (+coordSlice1 + number2);
    };

    const rightTopCell = diagonalCells(1, -1);
    const leftTopCell = diagonalCells(-1, -1);
    const leftBottomCell = diagonalCells(-1, 1);
    const rightBottomCell = diagonalCells(1, 1);

    return (acc += `, ${previousCell}, ${nextCell}, ${leftCell} ,${rightCell} ,${rightTopCell} ,${leftTopCell} ,${leftBottomCell} ,${rightBottomCell}`);
  }, "");

  const readyCellsAround = [
    ...new Set(
      cellsAround
        .replace(",", "")
        .split(",")
        .map((cell) => cell.trim())
        .filter((cell) => letters.includes(cell.slice(0, 1)))
    ),
  ];

  console.log(bigCoords, "flu");

  bigCoords.forEach((pos) => {
    const cellEl = fleet.querySelector(`.${pos}`);
    cellEl?.classList.add("ship-color");
    cellEl && (cellEl.textContent = size);

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
};
