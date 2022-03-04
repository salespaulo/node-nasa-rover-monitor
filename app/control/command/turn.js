/**
 * Command rover turn 90 degrees to turn.
 */

const { Rover } = require("../../rover");

/**
 * Function to turn 90 degrees to rover.
 *
 * @param {Rover} rover Rover instance.
 * @param {boolean} left Turn to left or default is right.
 * @returns {Rover} New rover instance orientation.
 */
const turn = (rover, left = false) => {
  const { x, y, orientation } = rover;

  switch (orientation) {
    case "N":
      return new Rover(x, y, left ? "W" : "E");
    case "S":
      return new Rover(x, y, left ? "E" : "W");
    case "E":
      return new Rover(x, y, left ? "N" : "S");
    case "W":
      return new Rover(x, y, left ? "S" : "N");
  }
};

module.exports = turn;
