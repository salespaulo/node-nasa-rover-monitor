/**
 * NASA Rover monitor and control squad of rovers in plateau on Mars.
 */
const { Mars, MarsPlateau, CartesianPoint } = require("../mars");
const { Rover } = require("../rover");
const { RoverControl } = require("../control");

const PLATEAU_DEFAULT = new MarsPlateau(new CartesianPoint(5, 5));

/**
 * The monitor to control the squad of rovers landed by NASA in plateau on Mars.
 */
class RoverMonitor {
  /**
   * Creates rover monitor to the plateau in Mars.
   *
   * @param {MarsPlateau} plateau Plateau instance in Mars.
   * @param {Mars} mars Instance of planet Mars.
   */
  constructor(plateau = PLATEAU_DEFAULT, mars = new Mars()) {
    this.mars = mars;

    /* Getting the security plateau on Mars */
    this.plateau = mars.getPlateau(plateau.upperRight, plateau.bottomLeft);
  }

  /**
   * Adds rover to plateau on Mars.
   *
   * @param {Rover} rover Rover instance to add into rover monitor into plateau on Mars.
   */
  addRover(rover) {
    return new RoverControl(rover, this.plateau);
  }
}

module.exports = {
  RoverMonitor,
};
