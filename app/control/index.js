/**
 * Rover control management.
 */

const { Rover } = require("../rover");
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
   *
   * @param {Rover} rover
   */
  constructor(rover) {
    this.rover = rover;
  }

  execute(command) {
    return null;
  }
}

module.exports = {
  RoverControl,
};
