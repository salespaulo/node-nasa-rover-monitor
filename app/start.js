/**
 * Starts rover application with visual ascii art.
 */

const fs = require("fs");
const { RoverApplication } = require("./index");

const CHAR_HORIZONTAL = "=";
const CHAR_VERTICAL = "|";
const CHAR_SPACE = " ";

const log = "NASA Rover App:";

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

  const xx = sy.map((v, i) => {
    if (i === Math.abs(upperRight.y - y)) {
      return v + emptySlots1 + orientation + emptySlots2;
    }

    return v + emptySlots;
  });

  console.log(xx.join("\n"));
  console.log(" " + sx.join(""));
};

const roverApp = new RoverApplication();

roverApp.eventEmitter.on("on-plateau-monitor", (plateau) => {
  const { bottomLeft, upperRight } = plateau;

  console.log(`${log} Mars Plateau Bottom Left:`, bottomLeft);
  console.log(`${log} Mars Plateau Upper Right:`, upperRight);
});

roverApp.eventEmitter.on("on-info-rovers", (infoRovers) => {
  infoRovers.forEach((info) => {
    const { control } = info;
    const { rover, plateau } = control;

    console.log(`${log} Rover landed on plateau:`, rover);
    print(plateau, rover);
  });
});

roverApp.eventEmitter.on("on-rover-apply-command", (command) => {
  const { cmd, control } = command;
  const { rover } = control;

  console.log(`${log} Rover command ${cmd} on plateau:`, rover);
});

roverApp.eventEmitter.on("on-rover-complete-command", (control) => {
  const { rover, plateau } = control;

  console.log(`${log} Rover complete commands on plateau:`, rover);
  print(plateau, rover);
});

if (process.argv.length < 3) {
  console.error(`Uses: node ${__filename} [fileTxtToImport]`);
  process.exit(1);
}

const filename = process.argv[2];
const buffer = fs.readFileSync(filename);
const output = roverApp.start(buffer.toString());

console.log(`${log} Output rover monitor:`);
console.log(output);
