const mySideMyFleet = document.querySelector(".my-side--my-float");
const mySideEnemyFleet = document.querySelector(".my-side--enemy-float");
const enemySideEnemyFleet = document.querySelector(".enemy-side--enemy-float");
const enemySideMyFleet = document.querySelector(".enemy-side--my-float");
const seas = document.querySelectorAll(".sea");
const notificatonWindow = document.querySelector(".notification-window");
const overlay = document.querySelector(".overlay");
const btnCloseNotificationWindow = document.querySelector(
  ".close-notification-window"
);
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const seaFleet = Array.from({ length: 10 }, (_, i) => i + 1);

let createMyShips = [
  [["e1"], ["e1"].length],
  [["j1"], ["e1"].length],
  [["a3"], ["e1"].length],
  [["h10"], ["e1"].length],
  [["i7", "j7"], ["e6", "e7"].length],
  [["a9", "a10"], ["e6", "e7"].length],
  [["a5", "a6", "a7"], ["J4", "I4", "h4"].length],

  [["c8", "d8", "e8"], ["J4", "I4", "h4"].length],
  [["c10", "d10", "e10", "f10"], ["J4", "I4", "h4", "e4"].length],
];
let createEnemyShips = [
  [["a1"], ["d10"].length],
  [["c1"], ["d10"].length],
  [["e1"], ["d10"].length],
  [["g1"], ["d10"].length],

  [["i5", "j5"], ["e6", "e7"].length],
  [["i7", "j7"], ["e6", "e7"].length],
  [["b4", "c4", "d4"], ["J4", "I4", "h4"].length],
  [["a8", "a9", "a10"], ["J4", "I4", "h4"].length],
  [["c10", "d10", "e10", "f10"], ["J4", "I4", "h4", "e4"].length],
];
let dragged;
let playing;
let bothSideShips = [];
let mySideMyShips = [];
let enemySideEnemyShips = [];
let mySideEnemyShips = [];
let enemySideMyShips = [];

/**************************/
/* CREATING SHIPS */
/**************************/

const markup = seaFleet
  .map(
    (item, i) => `
    <tr class="row-${i + 1}">
<th>${item}</th>
 ${letters
   .map(
     (letter) =>
       `<td class=" dropzone"><div class="${letter}${i + 1} cell" ></div></td>`
   )
   .join("")}
</tr>
`
  )
  .join("");

const markupSeaHead = ` ${seaFleet
  .map((_, i) => {
    return i > 0
      ? `<th>${letters[i]}</th>`
      : `<th></th> 
        <th>${letters[i]}</th>`;
  })
  .join("")}`;

[
  mySideMyFleet,
  mySideEnemyFleet,
  enemySideEnemyFleet,
  enemySideMyFleet,
].forEach((container) => container.insertAdjacentHTML("afterbegin", markup));

console.log(`${mySideMyFleet.querySelector(".F10").classList[0]}`, "bomba");

[...seas].forEach((sea) =>
  sea.querySelector("tr").insertAdjacentHTML("afterbegin", markupSeaHead)
);

const createFleet = function (fleetPart) {
  const fleet = fleetPart[0];
  const ships = [fleetPart[1]];
  const newShipsCoords = fleetPart[2];

  const createShip = function (coords, size) {
    const bigCoords = coords?.map((coord) => {
      return coord.toUpperCase();
    });

    if (bigCoords === undefined) return;
    const checkSpace = ships?.map((ship) => {
      return ship?.coords?.some((coord) => bigCoords.includes(coord));
    });

    if (checkSpace.includes(true)) {
      console.log(
        "In such a mood it wouldn't be surprising if you had stepped with you shoe on a dog's poop 🍭"
      );
      return;
    }

    const checkSpaceAround = ships.map((ship) => {
      return ship?.unavailabeCells?.some((cell) => {
        if (bigCoords.includes(cell))
          console.log(
            `You cannot place your ship on ${cell} because it's around another ship. Find a better place to drop an anchor 😂`
          );
        return bigCoords.includes(cell);
      });
    });

    console.log(checkSpaceAround, "checkSpaceAround");

    if (checkSpaceAround.includes(true)) return;

    // const sameLetter = coords.map((coord) => {
    //   return coord[0];
    // });

    // const sameNumber = coords.map((coord) => {
    //   return coord[1];
    // });
    // console.log(sameLetter, "sameLetter");
    // console.log(sameNumber, "sameNumber");

    // const columnShip = [...new Set(sameLetter)];
    // const rowShip = [...new Set(sameNumber)];

    // if (columnShip.length !== 1 && rowShip.length !== 1) {
    //   console.log("Place your ships in the right order, man 🕺");
    //   return;
    // }

    if (fleet !== mySideMyFleet && fleet !== enemySideEnemyFleet) {
      const checkWholesomness = coords.map((coord, i) => {
        const coordSlice01 = coord.slice(0, 1);
        const coordSlice1 = coord.slice(1);

        const letterAround = letters.indexOf(coordSlice01);

        console.log(letters[letterAround] + (coordSlice1 - 1));
        console.log(letters[letterAround] + (+coordSlice1 + 1));
        console.log(letters[letterAround - 1] + coordSlice1);
        console.log(letters[letterAround + 1] + coordSlice1);
        if (
          coords.length > 1 &&
          !coords.includes(letters[letterAround] + (coordSlice1 - 1)) &&
          !coords.includes(letters[letterAround] + (+coordSlice1 + 1)) &&
          !coords.includes(letters[letterAround - 1] + coordSlice1) &&
          !coords.includes(letters[letterAround + 1] + coordSlice1)
        ) {
          return true;
        }
      });

      console.log(checkWholesomness, "Whole", fleet);
      if (checkWholesomness.includes(true)) {
        console.log("Place your ships in the right order, man 🤸‍♂️");
        return;
      }
    }

    const cellsAround = bigCoords.reduce((acc, coord, i) => {
      // console.log(duplicateFleet);
      /* duplicateFleet
        ? duplicateFleet.querySelector(`.${coord}`).classList.add("ship")
        : */ fleet.querySelector(`.${coord}`).classList.add("ship");
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

      // if (
      //   // console.log(previousCell, nextCell, leftCell, rightCell, "ke") &&
      //   // console.log(coord, "k") &&
      //   // console.log(i, "ig") &&
      //   coords.length > 1 &&
      //   !fleet.querySelector(`.${nextCell}`)?.classList.contains("ship") &&
      //   !fleet.querySelector(`.${previousCell}`)?.classList.contains("ship") &&
      //   !fleet.querySelector(`.${leftCell}`)?.classList.contains("ship") &&
      //   !fleet.querySelector(`.${rightCell}`)?.classList.contains("ship")
      // ) {
      //   console.log("Kabachok");
      //   return;
      // }
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

    console.log(readyCellsAround);
    // console.log(duplicateFleet)

    bigCoords.forEach((pos) => {
      console.log(pos);
      /* duplicateFleet
        ? (duplicateFleet.querySelector(`.${pos}`).style.backgroundColor =
            "yellow")
        :  */ fleet.querySelector(`.${pos}`).classList.add("ship-color");
      fleet
        .querySelector(`.${pos}`)
        .insertAdjacentHTML("beforebegin", `<div class="${pos} cell"></div`);
    });
    const ship = {
      coords: bigCoords,
      size: size,
      unavailabeCells: readyCellsAround,
    };
    return ship;
    // ships.push(ship);
  };

  // [
  //   [["d4"], 1],
  //   [["e7", "e8"], 2],
  //   [["h6", "G6", "I6"], 3],
  //   [["D4"], 1],
  //   [["I2"], 1],
  //   [["J10"], 1],
  //   [["F10"], 1],
  //   [["A1", "A2", "A3", "A4"], 4],
  //   [["B4", "B5"], 2],
  //   [["J3", "I3"], 2],
  //   [["e1"], 1],
  //   [["e2"], 1],
  // ]
  fleet !== mySideEnemyFleet &&
    fleet !== enemySideMyFleet &&
    newShipsCoords.forEach((ship) => {
      ships.push(createShip(...ship));
    });
  console.log(fleet, "fleeet");
  const cleanShips = ships.slice().filter((ship) => ship !== undefined);

  /**************************/
  /* PLACING SHIPS MANUALLY */
  /**************************/

  const shipEls = fleet.querySelectorAll(".ship");

  shipEls.forEach((shipEl, i) => {
    shipEl.classList.add(`cell${i + 1}`);
  });

  const targets = [...fleet.querySelectorAll("td")].filter((ship) => {
    return !ship.classList.contains("ship");
  });

  targets.forEach((target) => {
    target.classList.add("dropzone");
  });

  shipEls.forEach((source) => {
    source.setAttribute("draggable", true);
  });

  shipEls.forEach((source) => {
    source.addEventListener("dragstart", function (e) {
      console.log("DRAGSTART");
      dragged = e.target;
    });
  });

  shipEls.forEach((source) => {
    source.addEventListener("dragend", function (e) {
      // e.preventDefault();
      console.log("DRAGEND", e.target);
      fleet.querySelector(
        `.${dragged.classList[dragged.classList.length - 1]}`
      );
      // .classList.replace(
      //   mySideMyFleet.querySelector(
      //     `.${dragged.classList[dragged.classList.length - 1]}`
      //   ).classList[0],
      //   e.target.querySelector(".cell").classList[0]
      // );
    });
  });

  ["dragover", "dragenter", "dragleave", "drop"].forEach((ev) => {
    targets.forEach((target) => {
      target.addEventListener(
        ev,
        function (e) {
          if (e.target.classList.contains("dropzone")) {
            console.log(ev);
            ev === "dragenter"
              ? e.target.classList.add("dragover")
              : e.target.classList.remove("dragover");
            if (ev === "drop") {
              e.preventDefault();
              e.target.appendChild(dragged);
            }
          }
          if (ev === "dragover") {
            e.preventDefault();
            if (e.target.classList.contains("ship")) return;
            e.target.classList.add("dragover");

            /* [0] =
              e.target.querySelector("div").classList[0]; */
          }

          if (ev === "dragleave") {
            console.log("--------DRAGLEAVE------");
            console.log(e.target);
            if (e.target.children) return;
            console.log(dragged.classList[0]);
            e.target
              .querySelector("td")
              .querySelector("div")
              .classList.add(`${dragged.classList[0]} cell`);
            // .insertAdjacentHTML(
            //   "afterbegin",
            //   `<div class="${dragged.classList[0]} cell"></div`
            // );
          }
        },
        ev === "dragover" && false
      );
    });
  });

  //  Create an arr with ships as cleanShips

  // How to create this arr?
  // 1) When a drop events happen, I need to take out a class of the cell and to put it into arr
  // let niceShipArr = [];

  console.log(cleanShips, "cleanShips");

  targets.forEach((target) => {
    target.addEventListener("drop", function (e) {
      e.preventDefault();
      console.log(e.target);
      console.log(e.target.querySelector("div").classList[0], " cell2");

      console.log(`${fleet.querySelector(".cell2").classList[0]}`, "cell2");

      console.log(e.target, "cell");
      console.log(e.target.querySelector("div").classList[0], "cell");

      /*  [...mySideMyFleet.querySelectorAll(".ship")] */ /* .forEach((ship) => { */ console.log(
        e.target.querySelector("div").classList[0],
        "DRAGEND drop"
      );

      fleet
        .querySelector(`.${dragged.classList[dragged.classList.length - 1]}`)
        .classList.replace(
          fleet.querySelector(
            `.${dragged.classList[dragged.classList.length - 1]}`
          ).classList[0],
          e.target.querySelector("div").classList[0]
        );

      /*  }); */
    });
  });

  /**************************/
  /* GAME START CONTROL */
  /**************************/
  let createFleetShips, createMoreShips;
  [...fleet.querySelectorAll(".ship")].forEach((ship, i) => {
    let color;
    i === 0 && (color = "#f03e3e");
    i > 0 && i < 4 && (color = "#94d82d");
    i > 0 && i > 3 && (color = "#be4bdb");
    ship.style.backgroundColor = color;
  });
  // if (fleet === enemySideEnemyFleet) return;
  if (fleet === mySideMyFleet) {
    const startGameBtnMarkup = `<button class="start-game">Start playing 😹</button>`;
    document
      .querySelector("body")
      .insertAdjacentHTML("afterbegin", startGameBtnMarkup);
  }
  /*  const contrarySideDuplicateFleet =
    fleet === mySideMyFleet ? enemySideMyFleet : mySideEnemyFleet; */
  playing = false;
  const startGameBtn = document.querySelector(".start-game");
  startGameBtn.addEventListener("click", function (e) {
    // [...document.querySelectorAll("td")].forEach((td) => {
    //   td.firstChild.style.opacity = "0.5";
    // });

    enemySideMyFleet.style.pointerEvents = "none";
    fleet.querySelectorAll(".ship");
    console.log(cleanShips);

    // const allShips = [...mySideMyFleet.querySelectorAll(".ship")];
    // const duplicateFleet = mySideMyFleet.cloneNode(true);
    // enemySideMyFleet.innerHTML = duplicateFleet.innerHTML;

    // const anotherDuplicateFleet = enemySideEnemyFleet.cloneNode(true);
    // mySideEnemyFleet.innerHTML = anotherDuplicateFleet.innerHTML;

    const findCell = function (cell) {
      let fleetSide;
      if (fleet === enemySideMyFleet) {
        fleetSide = mySideMyFleet;
      }
      if (fleet === mySideEnemyFleet) {
        fleetSide = enemySideEnemyFleet;
      }

      if (!fleetSide) return;
      console.log(cell);
      console.log(fleet);
      console.log(mySideMyFleet.querySelector(`.${cell}`));
      return `${fleetSide.querySelector(`.${cell}`)?.classList[0]}`;
    };

    createFleetShips = [
      [[findCell("cell1")], [findCell("cell1")].length],
      [[findCell("cell2")], [findCell("cell1")].length],
      [[findCell("cell3")], [findCell("cell1")].length],
      [
        [findCell("cell4"), findCell("cell5"), findCell("cell6")],
        ["B6", "B7", "b8"].length,
      ],
      [[findCell("cell7"), findCell("cell8")], ["B6", "B7"].length],
      [
        [findCell("cell9"), findCell("cell10"), findCell("cell11")],

        ["B6", "B7", "B8"].length,
      ],
      [[findCell("cell12"), findCell("cell13")], ["B6", "B7"].length],

      [
        [
          findCell("cell14"),
          findCell("cell15"),
          findCell("cell16"),
          findCell("cell17"),
        ],

        ["B6", "B7", "B8", "b9"].length,
      ],
      [[findCell("cell18")], [findCell("cell1")].length],

      // [["J10"], ["J10"].length],
      // [["F7"], ["F7"].length],
      // [["c1", "c2", "c3", "c4"], ["c1", "c2", "c3", "c4"].length],
    ];

    createMoreShips = [
      [[findCell("cell1")], [findCell("cell1")].length],
      [[findCell("cell2")], [findCell("cell1")].length],
      [[findCell("cell3")], [findCell("cell1")].length],
      [[findCell("cell4")], [findCell("cell1")].length],
      [
        [findCell("cell5"), findCell("cell6"), findCell("cell7")],
        ["B6", "B7", "b8"].length,
      ],
      [[findCell("cell8"), findCell("cell9")], ["B6", "B7"].length],
      [[findCell("cell10"), findCell("cell11")], ["B6", "B7"].length],

      [
        [findCell("cell12"), findCell("cell13"), findCell("cell14")],

        ["B6", "B7", "B8"].length,
      ],
      [
        [
          findCell("cell15"),
          findCell("cell16"),
          findCell("cell17"),
          findCell("cell18"),
        ],

        ["B6", "B7", "B8", "b9"].length,
      ],
    ];

    console.log(newShipsCoords);
    if (fleet === enemySideMyFleet) {
      createFleetShips.forEach((ship) => {
        ships.push(createShip(...ship));
      });

      console.log(createFleetShips, "createFleetShips");
    }

    if (fleet === mySideEnemyFleet) {
      createMoreShips.forEach((ship) => {
        ships.push(createShip(...ship));
      });
    }

    // let shipsAllRight = true;
    if (fleet === mySideEnemyFleet || fleet === enemySideMyFleet) {
      console.log(ships, "beg ships");
      bothSideShips.push(ships);
      fleet === mySideEnemyFleet && bothSideShips.push("mySideEnemyFleet");
      fleet === enemySideMyFleet && bothSideShips.push("enemySideMyFleet");
      console.log(bothSideShips);
      console.log(bothSideShips.flat(2), "beg");

      // shipsAllRight = bothSideShips.flat(2).every((ship) => {
      //   return ship !== undefined;
      // });
      // console.log(shipsAllRight, "each");
      if (
        !bothSideShips.flat(2).includes(undefined) &&
        bothSideShips.flat(2).includes("mySideEnemyFleet") &&
        bothSideShips.flat(2).includes("enemySideMyFleet")
      ) {
        console.log(bothSideShips.flat(2), "plu");
        console.log(ships, "ships");
        console.log(bothSideShips, "bothSide", fleet);
        console.log(bothSideShips);
        playing = true;
        console.log("Game started 🥰");
        console.log("shift");
      } else {
        console.log("Place your ships in the right way 😃");
        return;
      }
    }

    // console.log(ships, "shhhh");

    // Make sure that I will not destroy my own ship ;)
    if (playing) {
      console.log(playing, "playing");
      mySideMyFleet.style.pointerEvents = "none";
      enemySideEnemyFleet.style.pointerEvents = "none";
    }
  });

  // const e6 = mySideMyFleet.querySelector(".E6");
  // enemySideMyFleet.style.position = "relative";
  // const e7 = enemySideMyFleet.querySelector(".E7");
  // e7.closest("td").style.position = "relative";
  // e7.style.cssText = `
  // position: absolute;
  // height: 40%;
  // top: -50%;
  // left: -50%;
  // background-color: yellow;

  // `;

  // e7.closest("td").rowSpan = "2";
  // e7.closest("td").style.height = "100%";
  // const sh = `<div class="purple" style = height:50%;></div
  // <div class="blue" style = height:50%;></div`;

  // e7.closest("td").insertAdjacentHTML("afterbegin", sh);

  // const twoCellShip = `<div class="two-cell"></div>`;
  // mySideMyFleet
  //   .querySelector(".E6")
  //   .insertAdjacentHTML("afterbegin", twoCellShip);

  /**************************/
  /* GAME CONTROL */
  /**************************/
  // const defineFleet =
  //   fleet === mySideMyFleet ? enemySideMyFleet : mySideEnemyFleet;
  mySideMyFleet.classList.add("player0");
  playing === true && (enemySideMyFleet.style.pointerEvents = "none");
  [mySideEnemyFleet, enemySideMyFleet].forEach((fleet) => {
    fleet.addEventListener("click", function (e) {
      console.log("---------MEGA BRUMWELL------- 🐖");
      if (
        e.target.classList.contains("ship") ||
        e.target.textContent !== "" ||
        e.target.querySelector(".ship")?.classList.contains("ship")
      )
        return;
      console.log(fleet, "float");
      const turn =
        playing && fleet === enemySideMyFleet
          ? mySideEnemyFleet
          : enemySideMyFleet;
      playing && (turn.style.pointerEvents = "auto");
      playing && (fleet.style.pointerEvents = "none");
    });
  });

  /**************************/
  /* SHOOTING LOGIC */
  /**************************/

  console.log(playing);
  // console.log(
  //   fleet === mySideMyFleet ? enemySideMyFleet : mySideEnemyFleet,
  //   "goo"
  // );
  /*  (fleet === mySideMyFleet
    ? enemySideMyFleet
    : mySideEnemyFleet
  ) */ fleet.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(e.target, "lay");
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
      console.log(e.target, "target");
      console.log(fleet.querySelector(`.${e.target.classList[0]}`));
      console.log(e.target.children);
      if (e.target.classList[0] === "dropzone") {
        console.log(fleet, "bug");
        console.log("zone");

        return fleet.querySelector(
          `.${e.target.querySelector("div").classList[0]}`
        );
      } else {
        console.log(`------${fleet}----------`);
        console.log(e.target);
        console.log(e.target.classList[0]);
        console.log(fleet.querySelector(`.${e.target.classList[0]}`));
        console.log("none");
        return fleet.querySelector(`.${e.target.classList[0]}`);
      }
      // return fleet.querySelector(
      //   e.target.classList[0] === "dropzone"
      //     ? `.${e.target.querySelector("div").classList[0]}`
      //     : `.${e.target.classList[0]}`
      // );
    };
    if (!e.target.closest(".ship") && e.target.textContent === "") {
      e.target.querySelector("div").classList.add("miss");
      e.target.querySelector("div").insertAdjacentHTML("afterbegin", miss);

      if (
        e.target
          .closest(".enemy-side--my-float")
          ?.querySelector(`.${e.target.classList[0]}`)
      ) {
        addMarkToFleet(mySideMyFleet).classList.add("miss");

        addMarkToFleet(mySideMyFleet).insertAdjacentHTML("afterbegin", miss);
      } else {
        addMarkToFleet(enemySideEnemyFleet).classList.add("miss");

        addMarkToFleet(enemySideEnemyFleet).insertAdjacentHTML(
          "afterbegin",
          miss
        );
      }
    }

    if (e.target.closest(".ship")?.textContent === "") {
      console.log(ships, "duuper");
      const injuredShipPos = ships.findIndex((ship) => {
        console.log(ship.coords);
        return ship?.coords?.includes(e.target.classList[0]);
      });

      console.log(injuredShipPos, "pos");
      console.log(e.target);
      e.target.classList.add("injure");
      const injure = "&cross;";
      e.target.insertAdjacentHTML("afterbegin", injure);

      console.log(ships[injuredShipPos], "shipi");
      const destroyedShipCoords = ships[injuredShipPos].coords.map((_, i) => {
        console.log(
          fleet.querySelector(`.${ships[injuredShipPos]?.coords[i]}`)
            .nextElementSibling.classList,
          "bood"
        );
        return /* defineFleet */ fleet
          .querySelector(`.${ships[injuredShipPos]?.coords[i]}`)
          .nextElementSibling.classList.contains("injure");
      });
      console.log(destroyedShipCoords, "destr");
      console.log("how often this happens");

      if (
        e.target
          .closest(".enemy-side--my-float")
          ?.querySelector(`.${e.target.classList[0]}`)
      ) {
        console.log(addMarkToFleet(mySideMyFleet).nextElementSibling, "burn");
        addMarkToFleet(mySideMyFleet).nextElementSibling.insertAdjacentHTML(
          "afterbegin",
          injure
        );

        addMarkToFleet(mySideMyFleet).nextElementSibling.classList.add(
          "injure"
        );
      } else {
        addMarkToFleet(
          enemySideEnemyFleet
        ).nextElementSibling.insertAdjacentHTML("afterbegin", injure);

        addMarkToFleet(enemySideEnemyFleet).nextElementSibling.classList.add(
          "injure"
        );
      }

      if (!destroyedShipCoords.includes(false)) {
        console.log("beny");
        const destroyedShip = ships[injuredShipPos].coords.map((_, i) => {
          return /* defineFleet */ fleet.querySelector(
            `.${ships[injuredShipPos]?.coords[i]}`
          );
        });
        console.log(destroyedShip);

        const filledAreaAroundShip = ships[injuredShipPos].unavailabeCells
          .filter((cell) => {
            // Filtering out coords on which the ship inself is placed, because unavailableCells also included them
            return !ships[injuredShipPos].coords.includes(cell);
          })
          .map((cell, i) => {
            const cellAround = /* defineFleet */ fleet.querySelector(
              `.${cell}`
            );

            // There is also can be an imaginary 11th cell when it comes to side ships(because unavailableCells contains them, but only for conveniency reason), so there is a check whether that cell exists or not, because there is no 11th cell exists in the sea(Means that this could be misunderstood as if 11th cell exists but transparent)
            cellAround && (cellAround.style.fontSize = "3.9rem");
            console.log("Bormer");
            const surroundDestroyedShip = function (fleet, cellAround) {
              console.log(fleet, "before round");
              console.log(cellAround, "WHERE ARE YOU?");
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
              console.log(cellAroundContrarySide, "STUCK");
              surroundDestroyedShip(fleet, cellAroundContrarySide);
            };

            if (e.target.closest(".ship").closest(".enemy-side--my-float")) {
              markContraryFleet(mySideMyFleet);
            }

            if (e.target.closest(".ship").closest(".my-side--enemy-float")) {
              markContraryFleet(enemySideEnemyFleet);
            }

            // If the cell is empty then a new mark will be inserted, but if there is something inside then nothing will happen
            surroundDestroyedShip(/* defineFleet */ fleet, cellAround);
          });
      }
    }

    /**************************/
    /* CONTROLLING THE END OF THE GAME */
    /**************************/

    const allShips = [...fleet.querySelectorAll(".ship")];

    const injuredShips = allShips
      .map((ship) => {
        if (ship.classList.contains("injure")) return ship;
      })
      .filter((ship) => {
        if (ship) return ship;
      });

    const areAllShipsInjured = injuredShips.length === allShips.length;

    // Show notification window
    const openNotificationWindow = function () {
      const resultsMessage = document.querySelector(".results-message");
      const player0 = "Dendy";
      const player1 = "Many";

      const addNotification = function (player) {
        resultsMessage.insertAdjacentHTML(
          "afterbegin",
          `${player} won the game`
        );
      };

      if (/* defineFleet */ fleet === mySideEnemyFleet)
        addNotification(player0);

      if (/* defineFleet */ fleet !== mySideEnemyFleet)
        addNotification(player1);

      notificatonWindow.classList.remove("hidden");
      overlay.classList.remove("hidden");
      [mySideEnemyFleet, enemySideMyFleet].forEach(
        (fleet) => playing && (fleet.style.pointerEvents = "none")
      );
    };

    const closeNotificationWindow = function () {
      notificatonWindow.classList.add("hidden");
      overlay.classList.add("hidden");
    };

    if (areAllShipsInjured) openNotificationWindow();

    btnCloseNotificationWindow.addEventListener(
      "click",
      closeNotificationWindow
    );
    overlay.addEventListener("click", closeNotificationWindow);

    document.addEventListener("keydown", function (e) {
      // console.log(e.key);

      if (
        e.key === "Escape" &&
        !notificatonWindow.classList.contains("hidden")
      ) {
        closeNotificationWindow();
      }
    });
  });
};

[
  [mySideMyFleet, mySideMyShips, createMyShips],
  [mySideEnemyFleet, mySideEnemyShips, createEnemyShips],
  [enemySideEnemyFleet, enemySideEnemyShips, createEnemyShips],
  [enemySideMyFleet, enemySideMyShips, createMyShips],
].forEach((container, i) => createFleet(container));

// The situation about now: I created right spicing rules, so now I would not be able to put one ship on the next or previos cell of another ship, so all ships are at least one cell away from each other
// Now it's time to do some refactoring
// Refactoring finished, now it's time to think about shooting feature
// When I click on a cell I need to extract a class of it
// Next step: when I click on a ship a symbol of injured or destoryed ship should be shown
// Now it's visible whether the shoot hit the goal or not. Now it's time to surround a destroyed ship with dots
// When I injure a ship which is more than one cell I want to not fill space around with dots, but when the ship is completely destoryed I want to fill space around with dots
// Right now spaces which are empty but shot will be marked with one color, but spaces which weren't shot around the destroyed ship will be marked with another color, so, what was planned is completed
// Now it's time to refactor
// All 3 files are refactored nicely, now it's time to think about the next feature
// How am I going to control the end of the game? When all coords in all ships have class "injured" then I need to do some action, for example show some modal window with the results of the battle
// The logic of defining whether all ships damaged or not is defined, not it's time to show notification message
// Now notification window shows up when all ships are destroyed, what to do next? Now I should think about applying the same functionality to the enemy part
// Part of the funtionalit is already aplied, now it's time to somehow link 2 fleets together
// Now I need to make sure that when I shoot mySideEnemyFleet that only will change enemySideEnemyFleet
// The situaton for now: the last goal is completed, my enemy shoots only affect my side and my shoots only affect his side, now it's time of refactoring
// At this point everything is nice refactored, now it's time to think about the next feature: I need to create turns. This means that it can be my turn or my enemy's turn
// Turns are created and work like intended, let's figure out the winner of the game
// The winner is defined, now it's time to do something about ship placing
// Now ships are not longer the same on both sides, all planned goals untill now are completed, now it's time to think about another feature
// Now I can create some input form inputting coords for ships
// Now I don't need any input form or anything like that! Now the ships are draggable, so I can manually do this!
// All code is refactored and this time I should make a feature to first place ships and only then to play
// In the beginning I place my ships on my side and when I push the start button, then my ships will render on my opponent's side
// Right now after pushing start button duplicate fleet is rendered and it's playable, everything after duplicating the fleet is working, however, I still cannot  place ships manually, I can drag a ship and drop it somewhere, but it will not be duplicated to another side, so this is what should be fixed, but before let's refactor the code
// Now I can manually place ships where I want and they will be duplicated and I can play as in the real game, but to set everything properly I first need to place right parts of ships together and if they will not be connected in the right way, then there will be a mess, so I need to find a condition which will help me in this situation.
// Everything is working perfectly, there is no way you will start the game when you misplaced any of your ships, it will just not allow it! So, it's playable, but right now there is a big mess, so I need to clean it up and refactor the code :)
