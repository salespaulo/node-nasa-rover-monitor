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
const { Rover } = require("./rover");
const { MarsPlateau, CartesianPoint } = require("./mars");
const { COMMANDS } = require("./control/command");

const CMD_SEPARATOR = " ";
const CMD_END = "\n";

class RoverAppSyntaxCommandsError extends Error {
  /**
   * Rover app invalid commands error.
   *
   * @param {string} msg Message of error.
   */
  constructor(msg) {
    super(`NASA Rover Application: Invalid Syntax Commands: ${msg}!`);
  }
}

class RoverAppInvalidLengthCommandsError extends Error {
  /**
   * Rover app invalid commands error, less than 3 commands.
   *
   * @param {number} lengthCommands
   */
  constructor(lengthCommands) {
    super(
      `NASA Rover Application: Invalid Length Commands: Has ${lengthCommands} commands but it should be equal or more than 3 commands!`
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
  /**
   * Start application with raw commands.
   *
   * @param {string} letters Raw commands, separated by spaces and end by enter char.
   */
  start(letters) {
    if (!letters) {
      throw new RoverAppInvalidLengthCommandsError(0);
    }

    const commands = letters.split(CMD_END);

    if (commands.length < 3) {
      throw new RoverAppInvalidLengthCommandsError(commands.length);
    }

    const infoPlateau = commands.shift().split(CMD_SEPARATOR);
    const plateauUpperRightX = Number(infoPlateau[0]);
    const plateauUpperRightY = Number(infoPlateau[1]);
    const plateauUpperRight = new CartesianPoint(
      plateauUpperRightX,
      plateauUpperRightY
    );

    const plateau = new MarsPlateau(plateauUpperRight);
    const roverMonitor = new RoverMonitor(plateau);
    const infoRovers = [];

    for (let i = 0; i < commands.length; i = i + 2) {
      if (commands[i] === "") {
        continue;
      }

      const roverInfo = commands[i].split(CMD_SEPARATOR);
      const roverCommands = commands[i + 1];
      const isNotRoverInfo = roverInfo.length !== 3;
      const isNotRoverCommands =
        !roverCommands.startsWith(COMMANDS[0]) &&
        !roverCommands.startsWith(COMMANDS[1]) &&
        !roverCommands.startsWith(COMMANDS[2]);

      if (isNotRoverInfo || isNotRoverCommands) {
        throw new RoverAppSyntaxCommandsError(
          `Is invalid rover infos or not rover commands`
        );
      }

      const roverX = Number(roverInfo[0]);
      const roverY = Number(roverInfo[1]);
      const roverOrientation = roverInfo[2];

      const rover = new Rover(roverX, roverY, roverOrientation);
      const roverControl = roverMonitor.addRover(rover);

      infoRovers.push({
        control: roverControl,
        commands: roverCommands.split(""),
      });
    }

    const outputRovers = infoRovers.map((info) => {
      const { control, commands } = info;

      commands.forEach((cmd) => control.execute(cmd));

      const { rover } = control;
      return `${rover.x} ${rover.y} ${rover.orientation}`;
    });

    return outputRovers.join("\n");
  }
}

module.exports = {
  RoverApplication,
  RoverAppSyntaxCommandsError,
  RoverAppInvalidLengthCommandsError,
};
