import { notificatonWindow, notificatonWindow2 } from "./globalVars";

export const buildShipBorder = function (borderParts) {
  const ship = borderParts[0];
  const coord = borderParts[1];
  const i = borderParts[2];
  const arr = borderParts[3];
  const addBorder = borderParts[4];

  console.log(ship);
  ship.direction === "column"
    ? i === 0 && addBorder("borderTop", coord)
    : // 1. Add left to the top cell
      i === 0 && addBorder("borderLeft", coord);
  // 2. Add  bottom to the last cell
  ship.direction === "column"
    ? i === arr.length - 1 && addBorder("borderBottom", coord)
    : i === arr.length - 1 && addBorder("borderRight", coord);

  // 3. Right and left
  ship.direction === "column"
    ? addBorder("borderLeft", coord)
    : addBorder("borderTop", coord);

  ship.direction === "column"
    ? addBorder("borderRight", coord)
    : addBorder("borderBottom", coord);
};

export const getSeaOpacityBack = function () {
  [...document.querySelectorAll(".sea")].forEach((sea) => {
    sea.style.opacity = "1";
  });
};

export const closeNotificationWindow = function () {
  notificatonWindow.classList.add("hidden");

  // overlay.classList.add("hidden");
};
export const closeNotificationWindow2 = function () {
  notificatonWindow2.classList.add("hidden");
  // overlay.classList.add("hidden");
};

export const allowForbidClick = function (fleet, state) {
  fleet.style.pointerEvents = state;
};
