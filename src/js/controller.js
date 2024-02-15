import {
  mySideMyFleet,
  mySideEnemyFleet,
  enemySideEnemyFleet,
  enemySideMyFleet,
  createMyShips,
  createEnemyShips,
  mySideMyShips,
  mySideEnemyShips,
  enemySideEnemyShips,
  enemySideMyShips,
} from "./globalVars";
import createShip from "./makeShips";
import "./fleetEnvironment";
import placeShipsManually from "./placeShipsManually";
import { gameStartControl } from "./gameStartControl";
import gameControl from "./gameControl";
import shootingLogic from "./shootingLogic";
import { startNewGame } from "./startNewGame";

/**************************/
/* CREATE FLEET */
/**************************/
const createFleet = function (fleetParts) {
  const fleet = fleetParts[0];
  const newShipsCoords = fleetParts[2];

  fleet !== mySideEnemyFleet &&
    fleet !== enemySideMyFleet &&
    newShipsCoords.forEach((ship) => {
      createShip(...ship, fleetParts);
    });

  let ships = fleetParts[1];
  console.log(fleetParts[1], "ships");
  console.log(fleet, "fleet");

  /**************************/
  /* PLACING SHIPS MANUALLY */
  /**************************/
  placeShipsManually(fleet, fleetParts);

  /**************************/
  /* GAME START CONTROL */
  /**************************/
  gameStartControl(fleet, fleetParts);

  /**************************/
  /* GAME CONTROL */
  /**************************/
  gameControl(fleet);

  /**************************/
  /* START NEW GAME */
  /**************************/
  (fleet === mySideMyFleet || fleet === enemySideEnemyFleet) &&
    startNewGame(fleet, fleetParts);

  /**************************/
  /* SHOOTING LOGIC */
  /**************************/
  shootingLogic(fleet, ships);
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
// Current situation: all code in the controller and css is refactored, now the controller file contains about 670 lines of code, now it's time to divide it up to different files
// Now I will make "New game" button which will reset everything to the initial state
// While trying to make new game functionality I run into problems connected with the code architecture so, I decided to refactor it again and it worked! Now the controller has only 75 lines of code and also 8 different files of js nicely splitted up and connected successfully. So now it can be the right time finally make the new game button work as intended
// After long hours(actually quick) of work the new game button works perfectly, it's refactor time
// Now all code is refactored and from all files there is only 1 if statement which isn't a guard clause because it contains guard clause itself
// It would be a nice idea if the first player was choosed randomly, let's implement this
// The first player will be chosen randomly and also some borders were added to the sea and nice animation effect was added to cells around a destroyed ship
// Now I need the ships on all sides to look the same while playing
// Try to refactor all big logical operators with helper function
// All big groupings with logical operator are replaced with helper functions(which contain statements) and ternary operators
// All imported variables are imported directly and not as an object which makes it more convenient to work with
// Now the fleet which is waiting for the opponent is partly transparent which shows that it's your opponent turn
// There can be added a feature of writing opponent names which will may be a nice touch to the game
// Now opponents name can written or if not then a default name will be used instead. Right now players can offer start a new game and if both agreed then the new game will start, this work both as in the game and also after the game finished. There are also 2 button of ready to start action when you built your fleet and waiting when your opponent will be ready to play. Right now there is a big mess, so let's refactor it another time
// All code is refactored, a lot of things are tested, and probably somewhere something isn't right, but when I start to test it again and again and then I change one thing which can be a reason and after that I cannot find that bug
// Binoculars feature implemented, the secret bug from previous writing is found and fixed, gameplay with arrow keys was done but then removed(too much control of another opponent with just a keyboard)
// Improved sea-container, now it's time to implement timer feature in which every player will be given 30 sec to make a shot
// Where should the timer implementation be? Probably game control
// When it should start and stop?
// When game starts, the timer starts, when move is done the timer restarts, when timer finished the game is lost
// Where should I put the timer?
// The timer feature is working quite well, now it's time of refactoring
// Unexpected bug with 4-sized ship is fixed, the code is refactored, now it's time think about the next step
// Design is improved and probably will stay the same, now it's time to write some instructions about the game rules
// All instructions are written and look good, now it's time to place buttons and inputs to the right places
