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
const events = require("events");

const { MarsPlateau, CartesianPoint } = require("./mars");
const { Rover } = require("./rover");
const { RoverMonitor } = require("./monitor");

const { COMMANDS } = require("./control/command");

const CMD_SEPARATOR = " ";
const CMD_END = "\n";

class RoverAppAlreadyExistsError extends Error {
  constructor(rover) {
    super(
      `NASA Rover Application: Rover already exists in position x=${rover.x} and y=${rover.y}`
    );
  }
}
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

class RoverApplicationInfo {
  /**
   * Creates rover app information.
   *
   * @param {RoverControl} control The rover control instance.
   * @param {string[]} commands The rover array commands.
   */
  constructor(control, commands) {
    this.control = control;
    this.commands = commands;
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
    this.eventEmitter = new events.EventEmitter();
  }
  /**
   * Start application with letters command to apply in rovers on a plateau in planet Mars.
   *
   * @param {string} letters Letters command, separated by spaces and end by enter char.
   */
  start(letters) {
    if (!letters) {
      throw new RoverAppInvalidLengthCommandsError(0);
    }

    const commands = letters.split(CMD_END);

    if (commands.length < 3) {
      throw new RoverAppInvalidLengthCommandsError(commands.length);
    }

    const plateauCmd = commands.shift();
    const plateau = this.parseToPlateau(plateauCmd);

    const monitor = new RoverMonitor(plateau);
    this.eventEmitter.emit("on-plateau-monitor", plateau);

    const infoRovers = this.createInfoRovers(monitor, commands);

    return this.createOutputRovers(infoRovers);
  }

  /**
   * Creates output from rovers app information.
   *
   * @param {RoverApplicationInfo[]} infoRovers Rovers app information.
   * @returns {string} The output rover position and orientation.
   */
  createOutputRovers(infoRovers) {
    const outputRovers = infoRovers.map((info) => {
      const { control, commands } = info;

      commands.forEach((cmd) => {
        control.execute(cmd);
        this.eventEmitter.emit("on-rover-apply-command", { cmd, control });
      });

      const { rover } = control;
      const { x, y, orientation } = rover;

      this.eventEmitter.emit("on-rover-complete-command", control);
      return `${x} ${y} ${orientation}`;
    });

    return outputRovers.join("\n");
  }

  /**
   * Creates rovers app information.
   *
   * @param {RoverMonitor} roverMonitor Rover monitor instance.
   * @param {string[]} commands Array of commands to rover.
   */
  createInfoRovers(roverMonitor, commands) {
    const infoRovers = [];

    for (let i = 0; i < commands.length; i = i + 2) {
      if (commands[i] === "") {
        continue;
      }

      const stringRoverCommands = commands[i + 1];
      const isNotRoverCommands =
        !stringRoverCommands.startsWith(COMMANDS[0]) &&
        !stringRoverCommands.startsWith(COMMANDS[1]) &&
        !stringRoverCommands.startsWith(COMMANDS[2]);

      if (isNotRoverCommands) {
        throw new RoverAppSyntaxCommandsError(`Is invalid rover commands`);
      }

      const rover = this.parseToRover(commands[i]);
      const alreadyHasRover = infoRovers.find((info) => {
        const { control } = info;
        const { x, y } = control.rover;

        return rover.x === x && rover.y === y;
      });

      if (alreadyHasRover) {
        throw new RoverAppAlreadyExistsError(rover);
      }

      const roverControl = roverMonitor.addRover(rover);
      const roverCommands = stringRoverCommands.split("");
      const roverAppInfo = new RoverApplicationInfo(
        roverControl,
        roverCommands
      );

      infoRovers.push(roverAppInfo);
    }

    this.eventEmitter.emit("on-info-rovers", infoRovers);
    return infoRovers;
  }

  /**
   * Parse letters command to plateau instance.
   *
   * @param {string} letters Letters command to plateau upper right coordinates.
   * @returns {MarsPlateau} Returns plateau in planet Mars.
   */
  parseToPlateau(letters) {
    const infoPlateau = letters.split(CMD_SEPARATOR);
    const isNotValidPlateau = infoPlateau.length !== 2;

    if (isNotValidPlateau) {
      throw new RoverAppInvalidLengthCommandsError(infoPlateau.length);
    }

    const plateauUpperRightX = Number(infoPlateau[0]);
    const plateauUpperRightY = Number(infoPlateau[1]);
    const plateauUpperRight = new CartesianPoint(
      plateauUpperRightX,
      plateauUpperRightY
    );

    return new MarsPlateau(plateauUpperRight);
  }

  /**
   * Parse letters command to rover instance with position and orientation.
   *
   * @param {string} command
   * @returns {Rover} The rover instance from letters commands.
   */
  parseToRover(command) {
    const roverInfo = command.split(CMD_SEPARATOR);
    const isNotRoverInfo = roverInfo.length !== 3;

    if (isNotRoverInfo) {
      throw new RoverAppSyntaxCommandsError(`Is invalid rover infos`);
    }

    const roverX = Number(roverInfo[0]);
    const roverY = Number(roverInfo[1]);
    const roverOrientation = roverInfo[2];

    return new Rover(roverX, roverY, roverOrientation);
  }
}

module.exports = {
  RoverApplication,
  RoverApplicationInfo,
  RoverAppSyntaxCommandsError,
  RoverAppInvalidLengthCommandsError,
};
