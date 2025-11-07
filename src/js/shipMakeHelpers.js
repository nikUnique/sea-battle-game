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
