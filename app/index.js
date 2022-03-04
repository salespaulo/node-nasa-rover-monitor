/**
 * NASA Rover Monitor Application
 *
 * To control squad of rovers NASA sends a simple string of letters.
 *
 * The possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the
 * rover spin 90 degrees left or right respectively, without moving from
 * its current spot. 'M' means move forward one grid point, and maintain
 * the same heading.
 */
const { RoverMonitor } = require("./monitor");

const CMD_SEPARATOR = " ";
const CMD_END = "\n";

class RoverAppInvalidCommandsError extends Error {
  /**
   * Rover app invalid commands error, less than 3 commands.
   *
   * @param {number} lengthCommands
   */
  constructor(lengthCommands) {
    super(
      `NASA Rover Application: Invalid Commands: Commands length: ${lengthCommands} should be equal or more then 3!`
    );
  }
}

/**
 * Rover application to test the rover monitor and control on a plateau in planet Mars.
 *
 * This application start with a string representing the commands which will execute to get output.
 * The commands should be separated by spaces and the finish command is enter char `\n`
 *
 * Example:
 *
 * ```
 * 5 5
 * 1 2 N
 * LMLMLMLMM
 * 3 3 E
 * MMRMMRMRRM
 * ```
 */
class RoverApplication {
  constructor() {
    this.roverMonitor = new RoverMonitor();
  }

  /**
   * Start application with raw commands.
   *
   * @param {string} letters Raw commands, separated by spaces and end by enter char.
   */
  start(letters) {
    if (!letters) {
      throw new RoverAppInvalidCommandsError(0);
    }

    const commands = letters.split(CMD_END);

    if (commands.length < 3) {
      throw new RoverAppInvalidCommandsError(commands.length);
    }

    const infoCommands = commands.map((command) =>
      command.split(CMD_SEPARATOR)
    );
    return "";
  }
}

module.exports = {
  RoverApplication,
  RoverAppInvalidCommandsError,
};
