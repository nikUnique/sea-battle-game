import {
  mySideMyFleet,
  enemySideEnemyFleet,
  mySideEnemyFleet,
  enemySideMyFleet,
  enemySideMyShips,
  mySideEnemyShips,
  bothSideShips,
  createEnemyShips,
  createMyShips,
  newGameBtn2,
  newGameBtn,
  startGameBtn,
  startGameBtn2,
  notificatonWindow2,
  notificatonWindow,
  enemySideEnemyShips,
  mySideMyShips,
} from "./globalVars";
import { buildShipBorder, getSeaOpacityBack } from "./helpers";

import placeShipsManually from "./placeShipsManually";

let playing;
export { playing };
let firstTurn = "";
let bothFleetsReady = [];
let newGameAgreement = [];

const allowForbidClick = function (fleet, state) {
  fleet.style.pointerEvents = state;
};

// Goal is: start the game only when both buttons are pressed
// What to do after ships were wrongly placed?
// Don't let the game start

export const gameStartControl = function (fleet, fleetParts) {
  // allowForbidClick(mySideEnemyFleet, "none");
  // allowForbidClick(enemySideMyFleet, "none");
  // const startGameBtnMarkup = `<button class="start-game fleet-${
  //   fleet === enemySideMyFleet ? 1 : 2
  // }">Ready to start 😹</button>`;
  // (fleet === mySideEnemyFleet || fleet === enemySideMyFleet) &&
  //   document
  //     .querySelector("body")
  //     .insertAdjacentHTML("afterbegin", startGameBtnMarkup);

  playing = false;

  // fleet === enemySideMyFleet &&
  //   (startGameBtn = document.querySelector(`.fleet-1`));
  // fleet === mySideEnemyFleet &&
  //   (startGameBtn = document.querySelector(`.fleet-2`));

  // const checkFirstPlayer = function () {
  //   const username1 = document.querySelector(".username-1");
  //   console.log(fleetParts[1], "ships");

  //   if (username1.textContent.length < 2 /* && fleet === enemySideMyFleet */) {
  //     console.log(username1.textContent.length);
  //     console.log("Fill your username first");

  //     startGameBtn.removeAttribute("disabled", true);
  //     return false;
  //   }

  //   return true;
  // };
  // const checkSecondPlayer = function () {
  //   const username2 = document.querySelector(".username-2");
  //   console.log(fleetParts[1], "ships");

  //   if (username2.textContent.length < 2 /* && fleet === enemySideMyFleet */) {
  //     console.log(username2.textContent.length);
  //     console.log("Fill your username first");

  //     startGameBtn.removeAttribute("disabled", true);
  //     return false;
  //   }

  //   return true;
  // };

  const startPlaying = function (e) {
    newGameAgreement.splice(0);
    // [...document.querySelectorAll("td")].forEach((cell) => {
    //   cell.querySelector(".ship")?.remove();
    //   cell.removeAttribute("style");
    //   cell.querySelector(".cell").textContent = "";
    // });
    // const checkReadiness =
    //   fleet === enemySideMyFleet ? checkFirstPlayer() : checkSecondPlayer();
    // if (!checkReadiness) return;

    fleet === mySideEnemyFleet && (firstTurn = Math.random());
    (fleet === enemySideMyFleet ? startGameBtn : startGameBtn2).setAttribute(
      "disabled",
      true
    );
    // allowForbidClick(startGameBtn, "none");
    allowForbidClick(fleet, "none");
    console.log(fleet);
    const findCell = function (cell) {
      return `${
        (fleet === enemySideMyFleet
          ? mySideMyFleet
          : enemySideEnemyFleet
        ).querySelector(`.${cell}`)?.classList[0]
      }`;
    };

    let createFleetShips = [
      [[findCell("cell1")], [0].length],
      // [[findCell("cell2")], [0].length],
      // [[findCell("cell3")], [0].length],
      // [
      //   [findCell("cell4"), findCell("cell5"), findCell("cell6")],
      //   [0, 0, 0].length,
      // ],
      // [[findCell("cell7"), findCell("cell8")], [0, 0].length],
      [
        [findCell("cell2"), findCell("cell3"), findCell("cell4")],

        [0, 0, 0].length,
      ],
      // [[findCell("cell12"), findCell("cell14")], [0, 0].length],
      [[findCell("cell5"), findCell("cell6")], [0, 0].length],
      [
        [
          findCell("cell7"),
          findCell("cell8"),
          findCell("cell9"),
          findCell("cell10"),
        ],

        [0, 0, 0, 0].length,
      ],
      // [[findCell("cell19")], [0].length],
    ];

    let createMoreShips = [
      [[findCell("cell1")], [0].length],
      // [[findCell("cell2")], [0].length],
      // [[findCell("cell3")], [0].length],
      // [[findCell("cell4")], [0].length],
      [
        [
          findCell("cell5"),
          findCell("cell6"),
          findCell("cell7"),
          findCell("cell8"),
        ],

        [0, 0, 0, 0].length,
      ],
      [
        [findCell("cell2"), findCell("cell3"), findCell("cell4")],
        [0, 0, 0].length,
      ],
      // [[findCell("cell8"), findCell("cell9")], [0, 0].length],
      // [[findCell("cell10"), findCell("cell11")], [0, 0].length],

      // [
      //   [findCell("cell12"), findCell("cell13"), findCell("cell14")],

      //   [0, 0, 0].length,
      // ],

      [[findCell("cell9"), findCell("cell10")], [0, 0].length],
    ];

    const createManuallyPlacedShips = function (createSource, ships) {
      ships.splice(0);

      const checkShip = createSource.map((ship) => {
        const sortedLeters = ship[0]
          .map((coord) => {
            return coord.slice(0, 1);
          })
          .sort();

        const sortedNumbers = ship[0]
          .map((coord) => {
            return coord.slice(1);
          })
          .sort((a, b) => a - b);

        const sortedCoords = ship[0].map((coord, i) => {
          return sortedLeters[i] + sortedNumbers[i];
        });

        if (createShip(sortedCoords, ship[1], fleetParts) === false) {
          return false;
        }
      });
      return checkShip;
    };

    if (
      createManuallyPlacedShips(
        fleet === enemySideMyFleet ? createFleetShips : createMoreShips,
        fleet === enemySideMyFleet ? enemySideMyShips : mySideEnemyShips
      ).includes(false)
    ) {
      console.log("Place your ships in the right way, 🐒");
      console.log(fleetParts[1]);

      (fleet === enemySideMyFleet
        ? startGameBtn
        : startGameBtn2
      ).removeAttribute("disabled", true);

      [...fleet.querySelectorAll("td")].forEach((cell) => {
        cell.querySelector(".ship")?.remove();
        cell.removeAttribute("style");
        cell.querySelector(".cell").textContent = "";
      }),
        fleetParts[1].splice(0);
      // bothSideShips.splice(0);
      console.log(fleetParts[1]);
      console.log(bothSideShips);

      // bothSideShips.splice(0);

      // (fleet === enemySideMyFleet ? createMyShips : createEnemyShips).forEach(
      //   (ship) => {
      //     console.log(fleet);
      //     createShip(...ship, fleetParts);
      //   }
      // );

      return;
    }

    bothFleetsReady.push(true);
    allowForbidClick(
      fleet === enemySideMyFleet ? mySideMyFleet : enemySideEnemyFleet,
      "none"
    );

    [...document.querySelectorAll(".ship")].forEach((shipEl) => {
      bothFleetsReady.length === 2 && (shipEl.textContent = "");
    });

    const ships = fleetParts[1];
    // Condition defining whether both sides are ready to play or not

    bothSideShips.push(ships);

    const addBorder = function (borderSide, coord) {
      (fleet === enemySideMyFleet ? mySideMyFleet : enemySideEnemyFleet)
        .querySelector(`.${coord}`)
        .closest(".dropzone").style[borderSide] = "2px solid #15aabf";
    };

    bothFleetsReady.length === 1 &&
      (fleet === mySideEnemyFleet ? enemySideEnemyFleet : mySideMyFleet)
        .querySelectorAll(".ship")
        .forEach((ship) => {
          ship.classList.remove("ship-color");
          ship.textContent = "";
        });

    bothFleetsReady.length === 2 &&
      [mySideMyFleet, enemySideEnemyFleet].forEach((fleet) => {
        fleet.querySelectorAll(`.ship`).forEach((ship) => {
          ship.style.backgroundColor = "#e3fafc";
        });
      });

    console.log(ships);
    ships.map((ship, i) => {
      ship.coords.map((coord, i, arr) => {
        buildShipBorder([ship, coord, i, arr, addBorder]);
      });
    });

    if (fleet !== mySideEnemyFleet && fleet !== enemySideMyFleet) return;

    fleet === mySideEnemyFleet && bothSideShips.push("mySideEnemyFleet");
    fleet === enemySideMyFleet && bothSideShips.push("enemySideMyFleet");

    const flattenedBothSideShips = bothSideShips.flat(2);

    flattenedBothSideShips.length === createFleetShips.length * 2 + 2 &&
      flattenedBothSideShips.includes("mySideEnemyFleet") &&
      flattenedBothSideShips.includes("enemySideMyFleet") &&
      ((playing = true),
      console.log("Game started 🥰"),
      console.log(playing, "playing"),
      // Making sure that I will not destroy my own ship ;)
      allowForbidClick(mySideMyFleet, "none"),
      allowForbidClick(
        enemySideEnemyFleet,

        "none"
      ));

    console.log(firstTurn);
    console.log(firstTurn);
    console.log(firstTurn);

    if (playing) {
      mySideEnemyFleet &&
        (firstTurn < 0.5 &&
          (allowForbidClick(mySideEnemyFleet, "auto"),
          (enemySideMyFleet.closest(".sea").style.opacity = "0.7")),
        firstTurn >= 0.5 &&
          (allowForbidClick(enemySideMyFleet, "auto"),
          (mySideEnemyFleet.closest(".sea").style.opacity = "0.7")));
      [newGameBtn, newGameBtn2].forEach((btn) => {
        console.log("btn");
        btn.removeAttribute("disabled", true);
      });
    }

    fleet === enemySideMyFleet &&
      flattenedBothSideShips.length / 2 - 1 !== createFleetShips.length &&
      console.log("Place your ships in the right way, 🐒");
    // startGameBtn.removeAttribute("disabled", true);
  };

  fleet !== mySideMyFleet &&
    fleet !== enemySideEnemyFleet &&
    (fleet === enemySideMyFleet
      ? startGameBtn
      : startGameBtn2
    ).addEventListener("click", startPlaying);
  // document.addEventListener("keydown", function (e) {
  //   console.log(e.key);
  //   e.key === "CapsLock" && startPlaying();
  // });
};

export const startNewGame = function (fleet, fleetParts) {
  const ships = fleetParts[1];
  const newGameBtn = document.querySelector(".new-game-btn");

  const submitUsernames = function () {
    const submitBtn = document.querySelector(
      `.submit-username--fleet-${fleet === mySideMyFleet ? 1 : 2}`
    );
    const inputPlayer1Username = document.querySelector(
      ".fill-username--player-1"
    );
    const inputPlayer2Username = document.querySelector(
      ".fill-username--player-2"
    );
    console.log(inputPlayer1Username);
    inputPlayer1Username.value = "player-1";
    inputPlayer2Username.value = "player-2";

    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const username1Label = document.querySelector(".username-1");
      const username2Label = document.querySelector(".username-2");
      const player1Username =
        inputPlayer1Username.value.toLowerCase().slice(0, 1).toUpperCase() +
        inputPlayer1Username.value.slice(1);
      const player2Username =
        inputPlayer2Username.value.toLowerCase().slice(0, 1).toUpperCase() +
        inputPlayer2Username.value.slice(1);

      if (
        fleet === mySideMyFleet
          ? player1Username.length < 2
          : player2Username.length < 2
      ) {
        console.log("Your username should contains atleast 2 letters");
        return;
      }
      (fleet === mySideMyFleet ? username1Label : username2Label).textContent =
        "";
      const playerUsername =
        fleet === mySideMyFleet ? player1Username : player2Username;
      const usernameLabel =
        fleet === mySideMyFleet
          ? username1Label.insertAdjacentHTML("afterbegin", playerUsername)
          : username2Label.insertAdjacentHTML("afterbegin", playerUsername);

      fleet === mySideMyFleet
        ? (inputPlayer1Username.value = "")
        : (inputPlayer2Username.value = "");
      console.log(playerUsername);
    });
  };

  submitUsernames();
  console.log(fleet);

  // When opponent pushed a new game btn and then another opponent agreed, I need to find a way to call that function as if the first one pushed the button one more time.
  // Probably I can make it so that the second button will be pushed with the third one at once
  // There is a decision! The actual function will work only once but it will do the job for both of sides just making all actions twice

  (fleet === mySideMyFleet ? newGameBtn : newGameBtn2).addEventListener(
    "click",
    function (e) {
      fleet === mySideMyFleet &&
        !newGameAgreement.includes("mySideMyFleet") &&
        newGameAgreement.push("mySideMyFleet");
      fleet === enemySideEnemyFleet &&
        !newGameAgreement.includes("enemySideEnemyFleet") &&
        newGameAgreement.push("enemySideEnemyFleet");
      if (newGameAgreement.length !== 2) return;

      const superFunction = function () {
        const closeNotificationWindow = function () {
          notificatonWindow.classList.add("hidden");

          // overlay.classList.add("hidden");
        };
        const closeNotificationWindow2 = function () {
          notificatonWindow2.classList.add("hidden");
          // overlay.classList.add("hidden");
        };
        /*      fleet === mySideMyFleet */
        /*  ? */ closeNotificationWindow();
        /* : */ closeNotificationWindow2();
        /*        fleet === enemySideEnemyFleet
          ? closeNotificationWindow()
          : closeNotificationWindow2(); */
        (fleet === mySideMyFleet
          ? startGameBtn
          : startGameBtn2
        ).removeAttribute("disabled", true);
        getSeaOpacityBack();

        // allowForbidClick(startGameBtn, "auto");
        playing = false;
        [
          [mySideMyFleet, "auto"],
          [enemySideEnemyFleet, "auto"],
          [mySideEnemyFleet, "none"],
          [enemySideMyFleet, "none"],
        ].forEach((item) => allowForbidClick(...item));

        fleet === mySideMyFleet
          ? ([...document.querySelectorAll("td")].forEach((cell) => {
              cell.querySelector(".ship")?.remove();
              cell.querySelector(".miss")?.classList.remove("miss");
              cell.removeAttribute("style");

              cell
                .querySelector(".cell-around")
                ?.classList.remove("cell-around");
              cell.querySelector(".cell").textContent = "";
            }),
            ships.splice(0),
            enemySideEnemyShips.splice(0),
            createMyShips.forEach((ship) => {
              createShip(...ship, fleetParts);
            }),
            createEnemyShips.forEach((ship) => {
              createShip(...ship, [
                enemySideEnemyFleet,
                enemySideEnemyShips,
                createEnemyShips,
              ]);
            }),
            newGameBtn.setAttribute("disabled", true),
            newGameBtn2.setAttribute("disabled", true),
            startGameBtn.removeAttribute("disabled", true),
            startGameBtn2.removeAttribute("disabled", true),
            bothFleetsReady.splice(0))
          : /*   [...enemySideMyFleet.querySelectorAll("td")].forEach((cell) => {
              cell.querySelector(".ship")?.remove();
              cell.querySelector(".miss")?.classList.remove("miss");
              cell.removeAttribute("style");

              cell
                .querySelector(".cell-around")
                ?.classList.remove("cell-around");
              cell.querySelector(".cell").textContent = "";
            }),
            ships.splice(0),
            bothFleetsReady.splice(0) */ "";

        fleet === enemySideEnemyFleet &&
          ([...document.querySelectorAll("td")].forEach((cell) => {
            cell.querySelector(".ship")?.remove();
            cell.querySelector(".miss")?.classList.remove("miss");
            cell.removeAttribute("style");

            cell.querySelector(".cell-around")?.classList.remove("cell-around");
            cell.querySelector(".cell").textContent = "";
          }),
          ships.splice(0),
          mySideMyShips.splice(0),
          createEnemyShips.forEach((ship) => {
            createShip(...ship, fleetParts);
          }),
          createMyShips.forEach((ship) => {
            createShip(...ship, [mySideMyFleet, mySideMyShips, createMyShips]);
          }),
          newGameBtn2.setAttribute("disabled", true),
          newGameBtn.setAttribute("disabled", true),
          startGameBtn.removeAttribute("disabled", true),
          startGameBtn2.removeAttribute("disabled", true),
          bothFleetsReady.splice(0));
        /* [...mySideEnemyFleet.querySelectorAll("td")].forEach((cell) => {
            cell.querySelector(".ship")?.remove();
            cell.querySelector(".miss")?.classList.remove("miss");
            cell.removeAttribute("style");

            cell.querySelector(".cell-around")?.classList.remove("cell-around");
            cell.querySelector(".cell").textContent = "";
          }),
          ships.splice(0),
          bothFleetsReady.splice(0) */
        placeShipsManually(mySideMyFleet, [
          mySideMyFleet,
          mySideMyShips,
          createMyShips,
        ]);
        placeShipsManually(enemySideEnemyFleet, [
          enemySideEnemyFleet,
          enemySideEnemyShips,
          createEnemyShips,
        ]);

        bothSideShips.splice(0);
      };

      superFunction();
    }
  );
};

// When ships are wrongly placed and Ready button is pushed, it can't turn back, but I need to do it so that this will reset only the side on which this happened
// What do I need to reset it?
// Nice idea about making an wonderful aim for 10 seconds to find more ships
