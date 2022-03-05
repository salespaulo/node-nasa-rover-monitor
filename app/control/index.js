/**
 * Rover control management.
 */

const { MarsPlateau } = require("../mars");
const { Rover } = require("../rover");

const { turn, move, COMMANDS } = require("./command");

/**
 * Rover commands is:
 *   - "L": Turn 90 degrees on left.
 *   - "R": Turn 90 degrees on right.
 *   - "M": Move forward.
 * @type {string[]}
 */
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
    const { rover, plateau } = this;
    const validCommand = COMMANDS.indexOf(command) >= 0 ? command : "I";

    if (validCommand === "I") {
      this.rover = this.rover;
      return this;
    }

    if (validCommand === "R") {
      this.rover = turn(rover);
      return this;
    }

    if (validCommand === "L") {
      this.rover = turn(rover, true);
      return this;
    }

    this.rover = move(rover, plateau);
    return this;
  }
}

module.exports = {
  RoverControl,
};
