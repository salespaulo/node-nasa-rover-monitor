/**
 * Rover control management.
 */

const { MarsPlateau } = require("../mars");
const { Rover } = require("../rover");

const { turn, move } = require("./command");

/**
 * Rover commands is:
 *   - "L": Turn 90 degrees on left.
 *   - "R": Turn 90 degrees on right.
 *   - "M": Move forward.
 * @type {string[]}
 */
const COMMANDS = ["L", "R", "M"];

class RoverControl {
  /**
   * Rover that landed on a plateau in planet Mars.
   * @param {Rover} rover Rover orientation and position.
   * @param {MarsPlateau} plateau Mars plateau where rover was landed.
   */
  constructor(rover, plateau) {
    this.rover = rover;
    this.plateau = plateau;
  }

  execute(command) {
    const rover = this.rover;
    const plateau = this.plateau;
    const validCommand = COMMANDS.indexOf(command) >= 0 ? command : "I";

    if (validCommand === "I") {
      return this.rover;
    }

    if (validCommand === "R") {
      return turn(rover);
    }

    if (validCommand === "L") {
      return turn(rover, true);
    }

    return move(rover, plateau);
  }
}

module.exports = {
  RoverControl,
};
