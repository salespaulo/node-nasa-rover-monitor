/**
 * Utilities to start from import text file to rover application.
 */
const { RoverApplication } = require("./index");

const CHAR_HORIZONTAL = "=";
const CHAR_VERTICAL = "|";
const CHAR_SPACE = " ";

/**
 * Prints chars representing the plateau on Mars with rover current state.
 * @param plateau Plateau on Mars.
 * @param rover Rover instance state.
 */
const print = (plateau, rover = null) => {
  const { upperRight } = plateau;

  const sx = [];
  const sy = [];

  for (let x = 0; x <= upperRight.x; x++) {
    sx.push(CHAR_HORIZONTAL);
  }
  for (let y = 0; y <= upperRight.y; y++) {
    sy.push(CHAR_VERTICAL);
  }

  console.log(CHAR_SPACE + sx.join(""));

  const emptySlots = CHAR_SPACE.repeat(upperRight.x + 1) + CHAR_VERTICAL;

  if (!rover) {
    console.log(sy.join(emptySlots + "\n") + emptySlots);
    console.log(CHAR_SPACE + sx.join(""));
    return;
  }

  const { x, y, orientation } = rover;
  const emptySlots1 = CHAR_SPACE.repeat(x);
  const emptySlots2 = CHAR_SPACE.repeat(upperRight.x - x) + CHAR_VERTICAL;

  const verticalChars = sy.map((v, i) => {
    if (i === Math.abs(upperRight.y - y)) {
      return v + emptySlots1 + orientation + emptySlots2;
    }

    return v + emptySlots;
  });

  console.log(verticalChars.join("\n"));
  console.log(" " + sx.join(""));
};

/**
 * Utility function to create and configure {RoverApplication}.
 *
 * @param filename The filename call this function, e.g., `start.js`.
 * @return {{fileToImport: string, roverApp: RoverApplication, log: string, printIt: boolean, debugIt: boolean}}
 */
const createAndConfigApp = (filename) => {
  if (process.argv.length < 3) {
    console.error(
      `Uses: node ${filename} [fileTxtToImport] (--print) (--debug)`
    );
    process.exit(1);
  }

  const log = "NASA Rover App:";
  const fileToImport = process.argv[2];
  const printIt = process.argv[3] === "--print";
  const debugIt = process.argv[4] === "--debug";

  const roverApp = new RoverApplication();

  roverApp.eventEmitter.on("on-plateau-monitor", (plateau) => {
    const { bottomLeft, upperRight } = plateau;

    console.log(`${log} Mars plateau bottom left:`, bottomLeft);
    console.log(`${log} Mars plateau upper right:`, upperRight);
  });

  roverApp.eventEmitter.on("on-info-rovers", (infoRovers) => {
    infoRovers.forEach((info) => {
      const { control } = info;
      const { rover, plateau } = control;

      console.log(`${log} Rover landed on plateau:`, rover);

      if (printIt) {
        print(plateau, rover);
      }
    });
  });

  roverApp.eventEmitter.on("on-rover-apply-command", (command) => {
    const { cmd, control } = command;
    const { rover } = control;

    if (debugIt) {
      console.log(`${log} Rover command ${cmd} on plateau:`, rover);
    }
  });

  roverApp.eventEmitter.on("on-rover-complete-command", (control) => {
    const { rover, plateau } = control;

    if (printIt || debugIt) {
      console.log(`${log} Rover complete commands on plateau:`, rover);
    }

    if (printIt) {
      print(plateau, rover);
    }
  });

  return { log, roverApp, fileToImport, printIt, debugIt };
};

module.exports = {
  print,
  createAndConfigApp,
};
