/* eslint-disable no-unused-vars */
import {
  mySideMyFleet,
  enemySideEnemyFleet,
  enemySideMyFleet,
  mySideEnemyFleet,
  lowerLetters,
  duration,
  lottieSplash,
} from "./globalVars";

import {
  generateSurroundingFields,
  randomNumberFromRange,
} from "./shipMakeHelpers";

import showEndResults from "./showEndResults";

import { playingCheck, whoseTurn } from "./gameStartControl";

import { buildShipBorder, sleep, startTimer, timerClock } from "./helpers";

import { APPEAR_TIME, TIME_LENGTHS } from "./config";
import { gameControlHandler } from "./gameControl";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import Lottie from "lottie-web";

// The last damaged ship cell
let lastDamagingShot;
// Surrounding coords of the damaged ship cell
let surroundingCoords;
// All damaged ships parts of one ship
let lastInjuredShip = [];
// const LAUNCH_X = 90;
let LAUNCH_Y = window.innerHeight * 0.78;

let waterSplashLottie;

let splash;

let loadedImage;

// Bomb flight duration time
console.log("Just to push");

function filterOutNonEmptyCells(array) {
  return array
    .filter((el) => !el.querySelector(".miss"))
    .filter((el) => !el.querySelector(".injure"))
    .filter((el) => !el.querySelector(".cell-around"));
}

function finishOffDamagedShip(ships, direction) {
  let allMyShips = filterOutNonEmptyCells(ships);

  const areAllCellsTaken = filterOutNonEmptyCells(allMyShips).length === 0;

  if (areAllCellsTaken) {
    const lastShotTopBottomCells = generateSurroundingFields({
      lowerLetters,
      coord: lastDamagingShot.classList[0].toLowerCase(),
      ...(direction === "vertical" && { top: "top" }),
      ...(direction === "vertical" && { bottom: "bottom" }),
      ...(direction === "horizontal" && { left: "left" }),
      ...(direction === "horizontal" && { right: "right" }),
    });

    allMyShips = lastShotTopBottomCells
      .filter((coord) => typeof coord === "string")
      .map((coord) =>
        enemySideMyFleet
          .querySelector(`.${coord.toUpperCase()}`)
          .closest(".dropzone")
      );
    allMyShips = filterOutNonEmptyCells(allMyShips);

    if (allMyShips.length === 0) {
      const otherCoord = lastInjuredShip.find((el) => {
        const topBottomCells = generateSurroundingFields({
          lowerLetters,
          coord: el.classList[0].toLowerCase(),
          ...(direction === "vertical" && { top: "top" }),
          ...(direction === "vertical" && { bottom: "bottom" }),
          ...(direction === "horizontal" && { left: "left" }),
          ...(direction === "horizontal" && { right: "right" }),
        })
          .filter((coord) => typeof coord === "string")
          .map((coord) =>
            enemySideMyFleet
              .querySelector(`.${coord.toUpperCase()}`)
              .closest(".dropzone")
          );

        return filterOutNonEmptyCells(topBottomCells).length;
      });

      if (otherCoord) {
        allMyShips = generateSurroundingFields({
          lowerLetters,
          coord: otherCoord.classList[0].toLowerCase(),
          ...(direction === "vertical" && { top: "top" }),
          ...(direction === "vertical" && { bottom: "bottom" }),
          ...(direction === "horizontal" && { left: "left" }),
          ...(direction === "horizontal" && { right: "right" }),
        })
          .filter((coord) => typeof coord === "string")
          .map((coord) =>
            enemySideMyFleet
              .querySelector(`.${coord.toUpperCase()}`)
              .closest(".dropzone")
          );

        allMyShips = filterOutNonEmptyCells(allMyShips);
      }
    }
  }
  return allMyShips;
}

function launchBombTo(targetX, targetY, fleet, target) {
  const LAUNCH_X = fleet === mySideEnemyFleet ? 90 : window.innerWidth - 90;
  // 1. Create bomb
  const bomb = document.createElement("div");
  bomb.className = "bomb";
  bomb.style.left = LAUNCH_X + "px";
  bomb.style.top = LAUNCH_Y + "px";
  document.body.appendChild(bomb);

  // 2. Physics: parabolic trajectory
  const dx = targetX - LAUNCH_X;
  const dy = targetY - LAUNCH_Y;
  const distance = Math.hypot(dx, dy);
  const gravity = 400; // arc strength
  duration.duration = distance / 1500 + 0.5; // flight time (seconds)
  console.log("duration", duration);

  let startTime = null;

  function animateBomb(time) {
    if (!startTime) startTime = time;
    const progress = Math.min(
      (time - startTime) / (duration.duration * 1000),
      1
    );

    // Easing: smooth acceleration
    const eased = 1 - Math.pow(1 - progress, 3);

    // Parabolic path: x = linear, y = quadratic
    const x = LAUNCH_X + dx * progress;
    const y =
      LAUNCH_Y +
      window.scrollY +
      dy * progress -
      Math.sin(progress * Math.PI) * (distance * 0.3);

    bomb.style.left = x + "px";
    bomb.style.top = y + "px";

    if (progress < 1) {
      requestAnimationFrame(animateBomb);
    } else {
      // 3. Explode
      !target.classList.contains("dropzone") && createExplosion(x, y);
      bomb.remove();

      if (
        target.classList.contains("dropzone") &&
        !target.classList.contains("miss") &&
        !target.classList.contains("cell-around")
      ) {
        // createWaterSplash(x, y);
        createWaterSplashGif(x, y);
        // createVSplash(x, y);
        // createPlungeSplash(x, y, fleet, target);
      }
    }
  }
  requestAnimationFrame(animateBomb);
}

// Explosion function
function createExplosion(x, y) {
  console.log("x, y", x, y);

  const boom = document.createElement("div");
  boom.className = "explosion";
  boom.style.left = x + "px";
  boom.style.top = y + "px";
  document.body.appendChild(boom);

  setTimeout(function () {
    boom.classList.add("smoke");
  }, 350);
  setTimeout(() => {
    boom.remove();
  }, 2000);

  // Resize handler
  window.addEventListener("resize", function () {
    LAUNCH_Y = window.innerHeight;
  });
}

function createPlungeSplash(x, y) {
  const splash = document.createElement("div");
  const fallTime = 720;
  splash.className = "plunge";
  splash.style.left = x + "px";
  splash.style.top = y + "px";
  document.body.appendChild(splash);

  // Jet + Crown
  splash.innerHTML = `<div class="jet"></div><div class="crown"</div>`;

  // Chunky water chunks

  for (let i = 0; i < 22; i++) {
    setTimeout(function () {
      const c = document.createElement("div");
      c.className = "chunk";
      const size = Math.random() * 12 + 8;
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 40 + 20;
      c.style.width = c.style.height = size + "px";
      c.style.left = Math.cos(angle) * dist + "px";
      c.style.top = "-80px";
      c.style.animationDelay = Math.random() * 0.2 + "s";
      splash.appendChild(c);
    }, i * 45);
  }

  // Three shockwaves
  [0, 200, 400].forEach((delay, i) => {
    setTimeout(() => {
      const s = document.createElement("div");
      s.className = "shockwave";
      s.style.borderWidth = 6 - i * 1.5 + "px";
      splash.appendChild(s);
    }, delay);
  });

  setTimeout(function () {
    splash.remove();
  }, fallTime);
}

function createVSplash(x, y) {
  const splash = document.createElement("div");
  const fallTime = 720;
  splash.classList = "vsplash";
  splash.style.left = x + "px";
  splash.style.top = y + "px";
  document.body.appendChild(splash);

  setTimeout(function () {
    splash.remove();
  }, fallTime);
}

function createWaterSplash(x, y) {
  const fallTime = 1200;
  const localSplash = splash;
  // splash = document.createElement("canvas");
  // splash.id = "dotlottie-canvas";
  // splash.className = "lottie-water-splash";
  splash.style.left = x + "px";
  splash.style.top = y + "px";
  // document.body.appendChild(splash);

  if (lottieSplash.waterSplash) {
    console.log("The animation should play 😠", +new Date());

    lottieSplash.waterSplash.play();
  }

  setTimeout(function () {
    console.log("splash", splash);
    console.log("removed", +new Date());
    localSplash.remove();
  }, fallTime);
}

function playWaterSplashLottie(x, y) {
  const waterSplashLottie = document.querySelector("#dotlottie-canvas");

  if (waterSplashLottie) {
    waterSplashLottie.style.left = x + "px";
    waterSplashLottie.style.top = y + "px";

    waterSplashLottie?.play();
  }
}

async function loadImage(src) {
  try {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  } catch (error) {
    console.error("error in loadImage", error);
  }
}

async function createWaterSplashGif(x, y) {
  try {
    const fallTime = 1200;

    // const splash = document.querySelector("#water-splash-gif");
    const splash = await loadImage("../../animations/water-splash.gif");

    // splash.src = "../img/sea-icon-sm.jpg";
    // splash.alt = "Water splash animation";
    // splash.className = "lottie-water-splash";
    // console.log("Image starts loading");

    // console.log("Image finished loading");
    // splash.src = "../../animations/water-splash.gif";

    // await loadImage("../img/sea-icon.png");

    console.log("splash", splash);

    splash.alt = "Water splash animation";

    splash.className = "lottie-water-splash";
    splash.style.left = x + "px";
    splash.style.top = y + "px";
    splash.style.display = "";
    // const clonedSplash = splash.cloneNode(true);
    // splash.parentNode.replaceChild(clonedSplash, splash);
    // clonedSplash.src = "";
    // clonedSplash.src = splash.src;
    // const splashSrc = splash.src;
    // splash.src = "";
    // splash.src = splashSrc;

    // document.body.appendChild(splash);
    setTimeout(function () {
      // clonedSplash.style.display = "none";
      splash.remove();
    }, fallTime);
  } catch (error) {
    console.error("error happend", error);
  }
}

export default function (fleet, ships) {
  const shootingLogic = function (e) {
    e.preventDefault();

    // Here are possible 2 options: first is that this variable will be a truthy value because it will successfully select desired element, but second options is that this value will be undefined. So, both of this values make it enough to select the right cell. For example if my opponent shot in a cell of enemySideMyFleet which is his side then that spot will be selected because it happened on his side, but if I shot a cell of mySideEnemyFleet then it will be undefined because closest method will not find enemySideMyFleet in mySideEnemyFleet, so, which means that this is the second option and a cell of mySideEnemyFleet will be chosen when this variable will be used
    const selectChosenCell = e.target
      .closest(".enemy-side--my-fleet")
      ?.querySelector(`.${e.target.classList[0]}`);

    // e.target.addEventListener("click", () => {

    // });

    // console.log(e.target, "target");

    const addMarkToFleet = function (fleet) {
      // If the first condition is true this means that the shot missed and reached dropzone containing empty cell
      if (e.target.classList[0] === "dropzone") {
        const audio = document.getElementById("water-splash");
        audio.currentTime = 0;
        audio.play();
        return fleet.querySelector(
          `.${e.target.querySelector("div").classList[0]}`
        );
      }

      // If this is true then this means that the shot damaged a ship
      if (e.target.classList[0] !== "dropzone") {
        const audio = document.getElementById("fun-explosion");
        audio.currentTime = 0;
        audio.play();
        console.log(
          "fleet.querySelector(`.${e.target.classList[0]}`",
          fleet.querySelector(`.${e.target.classList[0]}`)
        );

        return fleet.querySelector(`.${e.target.classList[0]}`);
      }
    };

    const containsShip =
      !playingCheck.playing ||
      e.target.querySelector(".ship")?.classList.contains("ship");

    // If I made a shot in dropzone containing ship instead of ship itself then this will not count and you can shoot again. This is done this way to make it simplier to select empty cell inside of dropzone which doesn't contain a ship
    if (containsShip) {
      console.log("dropzone");
      return;
    }

    const miss = "&#x1F30A;";

    const whoseFleet =
      fleet === mySideEnemyFleet ? enemySideEnemyFleet : mySideMyFleet;

    // Removing visual indicators to last missed field in all 4 sea containers
    if (fleet === mySideEnemyFleet && e.target.textContent === "") {
      mySideEnemyFleet
        .querySelector(".last-shot")
        ?.classList.remove("last-shot");
      enemySideEnemyFleet
        .querySelector(".last-shot")
        ?.classList.remove("last-shot");
    }
    if (fleet === enemySideMyFleet && e.target.textContent === "") {
      mySideMyFleet.querySelector(".last-shot")?.classList.remove("last-shot");
      enemySideMyFleet
        .querySelector(".last-shot")
        ?.classList.remove("last-shot");
    }

    // Adding visual indicators to last missed field in all 4 sea containers

    // For missed fields
    if (
      e.target.classList.contains("dropzone") &&
      e.target.textContent === ""
    ) {
      e.target.querySelector(".cell").classList.add("last-shot");
      whoseFleet
        .querySelector(`.${e.target.querySelector("div").classList[0]}`)
        .classList.add("last-shot");
    }

    // For shipped fields
    if (e.target.classList[0] !== "dropzone" && e.target.textContent === "") {
      e.target.classList.add("last-shot");

      whoseFleet
        .querySelector(`.${e.target.classList[0]}`)
        .nextElementSibling?.classList.add("last-shot");
    }

    const addMissMark = function () {
      if (e.target.textContent !== "") {
        return;
      }

      // This and a piece of code below add a class and insert textContent in the fleet which was clicked
      e.target.querySelector("div").classList.add("miss");

      e.target.querySelector("div").insertAdjacentHTML("afterbegin", miss);

      // These 2 if-statements basically do the same thing as above but duplicating this to the second sea part
      if (selectChosenCell) {
        addMarkToFleet(mySideMyFleet).classList.add("miss");

        addMarkToFleet(mySideMyFleet).insertAdjacentHTML("afterbegin", miss);
      }

      if (!selectChosenCell) {
        addMarkToFleet(enemySideEnemyFleet).classList.add("miss");

        addMarkToFleet(enemySideEnemyFleet).insertAdjacentHTML(
          "afterbegin",
          miss
        );
      }
    };

    // Calls the function when player misses ship
    !e.target.closest(".ship") && addMissMark();

    // If cell in which you shot is already marked then code execution will stop here because the code below marks damaged ships which is already done at this point if target is a marked ship part and if not then the cell was already marked as missed which means that textContent of the target is already not empty in these cases
    if (e.target.textContent !== "") {
      console.log(e.target);
      console.log("You already shot that cell or you missed");
      return;
    }

    const injuredShipPartPos = ships.findIndex((ship) => {
      // Find ship index in the ships arr which was damaged
      return ship?.coords?.includes(e.target.classList[0]);
    });

    console.log(ships);

    e.target.classList.add("injure");

    const injure = "&cross;";

    // e.target.insertAdjacentHTML("afterbegin", injure);

    // A nice neat trick when you don't need empty string but you also don't need it to be filled with something visible, so you just add empty space
    e.target.textContent = " ";

    // Checks whether ship is only damaged or destroyed completely
    const destroyedShipCoords = ships[injuredShipPartPos].coords.map((_, i) => {
      return fleet
        .querySelector(`.${ships[injuredShipPartPos]?.coords[i]}`)
        .nextElementSibling.classList.contains("injure");
    });

    // Duplicate damage mark on the second sea part
    if (selectChosenCell) {
      addMarkToFleet(mySideMyFleet).nextElementSibling.classList.add("injure");

      // When a ship is damaged or destroyed then timer refreshes
      startTimer(fleet);
    }

    if (!selectChosenCell) {
      addMarkToFleet(enemySideEnemyFleet).nextElementSibling.classList.add(
        "injure"
      );

      startTimer(fleet);
    }

    if (destroyedShipCoords.includes(false)) {
      console.log("");
    } else {
      const explosion = document.getElementById("explosion");
      explosion.currentTime = 0;
      explosion.play();

      // audio.currentTime = 0;
      // audio.play();
    }
    // If ships is destroyed completely it's time to add border to it, but if not then execution stops here
    if (destroyedShipCoords.includes(false)) return;

    const addBorder = function (borderSide, coord, color = "#FA5252") {
      const selectTd = function (fleetSide) {
        fleetSide.querySelector(`.${coord}`).closest(".dropzone").style[
          borderSide
        ] = `2px solid ${color} `;
      };

      selectTd(fleet);

      // Select tds for adding border to ships of the second sea part
      selectTd(
        fleet === enemySideMyFleet ? mySideMyFleet : enemySideEnemyFleet
      );
    };

    ships[injuredShipPartPos].coords.map((coord, i, arr) => {
      buildShipBorder([ships[injuredShipPartPos], coord, i, arr, addBorder]);

      // Code below if-statement will be executed only for 1-cell ships
      if (ships[injuredShipPartPos].coords.length !== 1) {
        return;
      }

      // Check whether 1-cell ship contains reward class or not
      // const rewardShip = fleet
      //   .querySelector(`.${coord}`)
      //   .nextElementSibling.classList.contains("reward");

      // if (!rewardShip) {
      //   return;
      // }
      // Adds special class which is necessary for reward feature
      // fleet.classList.add("binoculars");

      // const labelBinocularsReward = fleet
      //   .closest(".sea-container")
      //   .querySelector(".binoculars-reward-label");

      // const labelTimer = fleet
      //   .closest(".sea-container")
      //   .querySelector(".timer");

      // labelBinocularsReward.style.opacity = "100";

      // const tick = function () {
      //   timerClock(time, labelTimer);

      //   if (time === 0) {
      //     clearInterval(timer);

      //     labelBinocularsReward.style.opacity = "0";

      //     fleet.classList.remove("binoculars");

      //     console.log("Magic video camera removed");
      //   }

      //   time--;
      // };

      // let time = TIME_LENGTHS.bonusTime;
      // tick();

      // This will make timer
      // const timer = setInterval(tick, 1000);
    });

    const filledAreaAroundShip = ships[injuredShipPartPos].unavailabeCells
      .filter((cell) => {
        // Filtering out coords on which the ship inself is placed, because unavailableCells also included them
        return !ships[injuredShipPartPos].coords.includes(cell);
      })
      .filter((cell) => {
        return fleet.querySelector(`.${cell}`)?.textContent === "";
      })
      .map((cell, i) => {
        const cellAround = fleet.querySelector(`.${cell}`);

        // console.log(cellAround, "cellAround");

        // There is also can be an imaginary 11th cell when it comes to bottom ships(because unavailableCells contains them, but only for conveniency reason), so there is a check whether that cell exists or not, because there is no 11th cell exists in the sea(Means that this could be misunderstood as if 11th cell exists but transparent)
        // cellAround && (cellAround.style.fontSize = "3.2rem");

        const surroundDestroyedShip = function (fleet, cellAround) {
          const surroundSign = "&#x1F4A7";
          cellAround?.textContent === "" &&
            fleet
              .querySelector(`.${cell}`)
              ?.insertAdjacentHTML("afterbegin", surroundSign);
          /*   fleet
              .querySelector(`.${cell}`)
              ?.insertAdjacentHTML("afterbegin", miss); */

          !cellAround?.classList.contains("miss") &&
            cellAround?.classList.add("cell-around");

          // cellAround && (cellAround.style.fontSize = "3.2rem");

          cellAround.style.visibility = "hidden";

          // This is done for nice animation effect
          setTimeout(function () {
            cellAround.style.visibility = "visible";
          }, i * APPEAR_TIME);
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
  };

  fleet.addEventListener("click", function (e) {
    if (
      e.target.textContent === "" &&
      !e.target.classList.contains("miss") &&
      !e.target.classList.contains("cell-around")
    ) {
      const audio = document.getElementById("cannon");
      audio.currentTime = 0;
      audio.play();
    }

    let rect = e.target.getBoundingClientRect();

    // loadImage("../img/sea-icon-heavy.jpg");

    // if (e.target.classList.contains("dropzone")) {
    //   console.log("New animation is being loaded", new Date().getSeconds());

    //   splash = document.createElement("canvas");
    //   splash.id = "dotlottie-canvas";
    //   splash.className = "lottie-water-splash";
    //   document.body.appendChild(splash);
    //   lottieSplash.waterSplash = new DotLottie({
    //     canvas: document.querySelector("#dotlottie-canvas"),
    //     src: "https://lottie.host/b2c16b47-ffa0-49df-ad07-bd4e918a6254/jzIHDnTf5u.lottie",
    //     loop: false,
    //     autoplay: false,
    //   });
    // }

    if (fleet === enemySideMyFleet) {
      if (e.target.classList[0] === "dropzone") {
        rect = mySideMyFleet
          .querySelector(`.${e.target.querySelector(".cell")?.classList[0]}`)
          .getBoundingClientRect();
      }

      if (e.target.classList.contains("ship")) {
        console.log("e.target", e.target);

        rect = mySideMyFleet
          .querySelector(`.${e.target?.classList[0]}`)
          .closest(".dropzone")
          .getBoundingClientRect();
      }
    }

    console.log("rect", rect);

    // launchBombTo(e.clientX, e.clientY);
    if (
      e.target.textContent === "" &&
      !e.target.classList.contains("miss") &&
      !e.target.classList.contains("cell-around")
    ) {
      launchBombTo(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        fleet,
        e.target
      );
    }

    setTimeout(function () {
      // if (fleet === mySideEnemyFleet || fleet === enemySideMyFleet)
      gameControlHandler(e, fleet);

      shootingLogic(e);

      computerShotHandler();
    }, duration.duration * 1000);
  });
}

export function computerShotHandler() {
  try {
    if (!playingCheck.playing) {
      console.log("The game is over 💯");
      return;
    }

    if (whoseTurn.turn === enemySideMyFleet) {
      let allMyShips = [...enemySideMyFleet.querySelectorAll("td")];
      allMyShips = filterOutNonEmptyCells(allMyShips);

      // Backup to use
      let oldShips = allMyShips;

      if (lastDamagingShot) {
        // injured parts is just an array of coordinates of damanged ship parts
        let injuredShipParts = lastInjuredShip.map(
          // Here I just take the first coord to make further decisions about finishing off the damaged ship
          (coord) => coord.classList[0]
        );

        const IsThisVertical =
          injuredShipParts.length > 1 &&
          injuredShipParts[0]?.slice(0, 1) === injuredShipParts[1]?.slice(0, 1);

        allMyShips = filterOutNonEmptyCells(surroundingCoords);

        if (injuredShipParts.length > 1) {
          if (IsThisVertical) {
            // I filter surrounding coords because there is a possibility that from one side there is a damaged part and from another side there is unchecked cell, it finds that cells to shot next
            allMyShips = surroundingCoords.filter((coord) => {
              return (
                injuredShipParts[0].slice(0, 1) ===
                coord.querySelector(".cell").classList[0].slice(0, 1)
              );
            });

            allMyShips = finishOffDamagedShip(allMyShips, "vertical");
          }

          if (!IsThisVertical) {
            allMyShips = surroundingCoords.filter((coord) => {
              return (
                injuredShipParts[0].slice(1) ===
                coord.querySelector(".cell").classList[0].slice(1)
              );
            });

            allMyShips = finishOffDamagedShip(allMyShips, "horizontal");
          }
        }

        const allSurroundingsFromFullShip = [
          ...lastInjuredShip.map((coord) => {
            const dubl = generateSurroundingFields({
              lowerLetters,
              coord: coord?.classList[0].toLowerCase(),
              top: "top",
              bottom: "bottom",
              right: "right",
              left: "left",
            });
            return dubl;
          }),
        ]
          .flatMap((el) => el)
          .filter((coord) => typeof coord === "string");

        // Deciding whether the current ship is destroyed or not
        if (
          allSurroundingsFromFullShip.length &&
          allSurroundingsFromFullShip.filter(
            (coord) =>
              enemySideMyFleet
                .querySelector(`.${coord.toUpperCase()}`)
                .classList.contains("miss") ||
              enemySideMyFleet
                .querySelector(`.${coord.toUpperCase()}`)
                .classList.contains("cell-around") ||
              enemySideMyFleet
                .querySelector(`.${coord.toUpperCase()}`)
                .nextElementSibling?.classList.contains("injure")
          ).length === allSurroundingsFromFullShip.length
        ) {
          allMyShips = oldShips;
          lastInjuredShip = [];
          lastDamagingShot = "";
        }
      }

      const timeout = randomNumberFromRange(1, 5);
      console.log("timeout", timeout);

      if (allMyShips.length === 0) return;
      const randomIndex = Math.floor(Math.random() * allMyShips.length);
      const randomElement = allMyShips[randomIndex];

      if (
        !randomElement.querySelector(".ship") &&
        !randomElement.querySelector(".miss") &&
        !randomElement.querySelector(".cell-around")
      ) {
        setTimeout(function () {
          randomElement.click();
        }, 1 * 1000);
      }
      if (
        !randomElement.querySelector(".injure") &&
        !randomElement.querySelector(".miss") &&
        !randomElement.querySelector(".cell-around") &&
        randomElement.querySelector(".ship")
      ) {
        lastDamagingShot = randomElement.querySelector(".ship");
        lastInjuredShip = [
          ...lastInjuredShip,
          randomElement.querySelector(".ship"),
        ];

        console.log("lastDamagingShot is real now", lastDamagingShot);

        if (lastInjuredShip.length === 1) {
          surroundingCoords = generateSurroundingFields({
            lowerLetters,
            coord: randomElement
              .querySelector(".cell")
              ?.classList[0].toLowerCase(),
            top: "top",
            bottom: "bottom",
            right: "right",
            left: "left",
          })
            .filter((coord) => typeof coord === "string")
            .map((coord) =>
              enemySideMyFleet
                .querySelector(`.${coord.toUpperCase()}`)
                .closest(".dropzone")
            );
        }

        setTimeout(function () {
          randomElement.querySelector(".ship")?.click();
        }, 1 * 1000);
      }
      console.log("Clicked:", randomElement.children[0]);
    }
  } catch (error) {
    console.error(error, "Error happend ⁉️");
  }
}
