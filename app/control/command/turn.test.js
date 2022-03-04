/**
 * NASA rover control command turn 90 degrees tests.
 */

const { Rover } = require("../../rover");

const turn = require("./turn");

test("Rover control turn right", () => {
  const rover = new Rover();
  const newRover = turn(rover);

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(rover.y);
  expect(newRover.orientation).toEqual("E");
});

test("Rover control turn left", () => {
  const rover = new Rover();
  const newRover = turn(rover, true);

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(rover.y);
  expect(newRover.orientation).toEqual("W");
});

test("Rover control turn right by south", () => {
  const rover = new Rover(0, 0, "S");
  const newRover = turn(rover);

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(rover.y);
  expect(newRover.orientation).toEqual("W");
});

test("Rover control turn left by south", () => {
  const rover = new Rover(0, 0, "S");
  const newRover = turn(rover, true);

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(rover.y);
  expect(newRover.orientation).toEqual("E");
});

test("Rover control turn right by east", () => {
  const rover = new Rover(0, 0, "E");
  const newRover = turn(rover);

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(rover.y);
  expect(newRover.orientation).toEqual("S");
});

test("Rover control turn left by east", () => {
  const rover = new Rover(0, 0, "E");
  const newRover = turn(rover, true);

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(rover.y);
  expect(newRover.orientation).toEqual("N");
});

test("Rover control turn right by west", () => {
  const rover = new Rover(0, 0, "W");
  const newRover = turn(rover);

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(rover.y);
  expect(newRover.orientation).toEqual("N");
});

test("Rover control turn left by west", () => {
  const rover = new Rover(0, 0, "W");
  const newRover = turn(rover, true);

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(rover.y);
  expect(newRover.orientation).toEqual("S");
});
