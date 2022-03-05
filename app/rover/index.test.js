const { Rover } = require("./index");

test("Rover have default instance to exists", () => {
  const defaultRover = new Rover();
  expect(defaultRover).not.toBeNull();
});

test("Rover have default orientation and position to be located", () => {
  const defaultRover = new Rover();

  expect(defaultRover.x).not.toBeNull();
  expect(defaultRover.y).not.toBeNull();
  expect(defaultRover.orientation).not.toBeNull();
});

test("Rover getting default orientation and position to be located", () => {
  const defaultRover = new Rover();

  expect(defaultRover.x).toEqual(0);
  expect(defaultRover.y).toEqual(0);
  expect(defaultRover.orientation).toEqual("N");
});

test("Rover getting custom orientation and position to be located", () => {
  const defaultRover = new Rover(10, 10, "S");

  expect(defaultRover.x).toEqual(10);
  expect(defaultRover.y).toEqual(10);
  expect(defaultRover.orientation).toEqual("S");
});

test("Rover getting invalid custom position and orientation to be located", () => {
  const defaultRover = new Rover(-10, -10, "X");

  expect(defaultRover.x).toEqual(0);
  expect(defaultRover.y).toEqual(0);
  expect(defaultRover.orientation).toEqual("N");
});

test("Rover getting invalid position x to be located", () => {
  const defaultRover = new Rover(-10, 10, "N");

  expect(defaultRover.x).toEqual(0);
  expect(defaultRover.y).toEqual(10);
  expect(defaultRover.orientation).toEqual("N");
});

test("Rover getting invalid position y to be located", () => {
  const defaultRover = new Rover(10, -10, "N");

  expect(defaultRover.x).toEqual(10);
  expect(defaultRover.y).toEqual(0);
  expect(defaultRover.orientation).toEqual("N");
});
