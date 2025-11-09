export function randomNumberFromRange(min, max) {
  // min ≤ result ≤ max  (both inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomLetterFun(min, max) {
  const start = min.charCodeAt(0);
  const end = max.charCodeAt(0);
  const code = Math.floor(Math.random() * (end - start + 1)) + start;
  return String.fromCharCode(code).toLowerCase();
}

export function checkShipSafety(fullShipWithSurroundings, checkFleetBusiness) {
  console.log(
    "fullShipWithSurroundingsrand",
    fullShipWithSurroundings,
    fullShipWithSurroundings
      .filter((coord) => typeof coord === "string")
      .filter((coord) =>
        checkFleetBusiness.find(
          (point) => point?.toLowerCase() === coord?.toLowerCase()
        )
      ).length
  );

  return fullShipWithSurroundings
    .filter((coord) => typeof coord === "string")
    .filter((coord) => checkFleetBusiness.find((point) => point === coord))
    .length;
}

export function remakeShip(
  randomRange,
  randomLetterRangeProp,
  size,
  createShip
) {
  const [ship, shipWithSurroundings] = createShip?.({
    randomRange,
    randomLetterRangeProp,
    size,
  });

  return [ship, shipWithSurroundings];
}

export function generateSurroundingFields({
  coord,
  lowerLetters,
  top,
  bottom,
  left,
  right,
  topRight,
  topLeft,
  bottomRight,
  bottomLeft,
}) {
  let shipSurroundings = [];

  if (top) {
    shipSurroundings = [coord.slice(0, 1) + (Number(coord.slice(1)) - 1)];
  }

  if (bottom) {
    shipSurroundings = [
      ...shipSurroundings,
      coord.slice(0, 1) + (Number(coord.slice(1)) + 1),
    ];
  }

  if (left) {
    shipSurroundings = [
      ...shipSurroundings,
      lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) - 1] +
        Number(coord.slice(1)),
      ,
    ];
  }

  if (right) {
    shipSurroundings = [
      ...shipSurroundings,
      lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) + 1] +
        Number(coord.slice(1)),
    ];
  }

  if (topLeft) {
    shipSurroundings = [
      ...shipSurroundings,
      lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) - 1] +
        (Number(coord.slice(1)) - 1),
    ];
  }

  if (topRight) {
    shipSurroundings = [
      ...shipSurroundings,
      lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) + 1] +
        (Number(coord.slice(1)) - 1),
    ];
  }

  if (bottomLeft) {
    shipSurroundings = [
      ...shipSurroundings,
      lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) - 1] +
        (Number(coord.slice(1)) + 1),
    ];
  }

  if (bottomRight) {
    shipSurroundings = [
      ...shipSurroundings,
      lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) + 1] +
        (Number(coord.slice(1)) + 1),
    ];
  }

  // shipSurroundings = [
  //   // Top and Bottom
  //   coord.slice(0, 1) + (Number(coord.slice(1)) + 1),
  //   coord.slice(0, 1) + (Number(coord.slice(1)) - 1),
  //   // Right top and bottom
  //   lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) + 1] +
  //     (Number(coord.slice(1)) - 1),
  //   lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) + 1] +
  //     (Number(coord.slice(1)) + 1),
  //   // Left and Right
  //   lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) - 1] +
  //     Number(coord.slice(1)),
  //   lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) + 1] +
  //     Number(coord.slice(1)),
  //   // Left top and bottom
  //   lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) - 1] +
  //     (Number(coord.slice(1)) - 1),
  //   lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) - 1] +
  //     (Number(coord.slice(1)) + 1),
  // ];

  return shipSurroundings;
}
