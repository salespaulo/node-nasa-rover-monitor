/**
 * Command rover turn 90 degrees to turn.
 */

const { Rover } = require("../../rover");

/**
 * Function to move rover.
 *
 * @param {Rover} rover Rover instance.
 * @param {MarsPlateau} plateau Mars plateau to move rover.
 * @returns {Rover} New rover instance position.
 */
const move = (rover, plateau) => {
  const { x, y, orientation } = rover;
  const { upperRight } = plateau;

  switch (orientation) {
    case "N":
      return y + 1 > upperRight.y
        ? new Rover(x, 0, orientation)
        : new Rover(x, y + 1, orientation);
      break;
    case "S":
      return y - 1
        ? new Rover(x, upperRight.y, orientation)
        : new Rover(x, y - 1, orientation);
      break;
    case "E":
      return x + 1 > upperRight.x
        ? new Rover(0, y, orientation)
        : new Rover(x + 1, y, orientation);
      break;
    case "W":
      return x - 1 < 0
        ? new Rover(upperRight.x, y, orientation)
        : new Rover(x - 1, y, orientation);
      break;
  }
};

module.exports = move;
