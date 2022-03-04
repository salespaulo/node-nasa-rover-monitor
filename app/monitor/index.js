/**
 * NASA Rover monitor and control squad of rovers in plateau on Mars.
 */
const { Mars } = require("../mars");
const { Rover } = require("../rover");
const { RoverControl } = require("../control");

/**
 * The monitor to control the squad of rovers landed by NASA in plateau on Mars.
 */
class RoverMonitor {
  constructor() {
    /* Creates the default planet Mars */
    this.mars = new Mars();
    /* Getting the default plateau on Mars */
    this.plateau = this.mars.getPlateau();
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
