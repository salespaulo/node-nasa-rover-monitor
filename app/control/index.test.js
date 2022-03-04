/**
 * NASA tests to the control of rovers.
 */

const { Mars } = require("../mars");
const { Rover } = require("../rover");

const { RoverControl } = require("./index");

test("Rover control instance", () => {
  const mars = new Mars();
  const rover = new Rover();
  const plateau = mars.getPlateau();

  const roverControl = new RoverControl(rover, plateau);
  expect(roverControl.rover).not.toBeNull();
  expect(roverControl.plateau).not.toBeNull();
});

test("Rover control apply left command", () => {
  const mars = new Mars();
  const rover = new Rover();
  const plateau = mars.getPlateau();

  const roverControl = new RoverControl(rover, plateau);

  const newRover = roverControl.apply("L");

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(rover.y);
  expect(newRover.orientation).toEqual("W");
});

test("Rover control apply right command", () => {
  const mars = new Mars();
  const plateau = mars.getPlateau();
  const rover = new Rover();

  const roverControl = new RoverControl(rover, plateau);
  const newRover = roverControl.apply("R");

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(rover.y);
  expect(newRover.orientation).toEqual("E");
});

test("Rover control apply move command", () => {
  const mars = new Mars();
  const plateau = mars.getPlateau();
  const rover = new Rover();

  const roverControl = new RoverControl(rover, plateau);
  const newRover = roverControl.apply("M");

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(rover.y + 1);
  expect(newRover.orientation).toEqual("N");
});

test("Rover control apply invalid command", () => {
  const mars = new Mars();
  const plateau = mars.getPlateau();
  const rover = new Rover();

  const roverControl = new RoverControl(rover, plateau);
  const newRover = roverControl.apply("Invalid Command");

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(rover.y);
  expect(newRover.orientation).toEqual(rover.orientation);
});
