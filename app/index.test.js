/**
 * NASA rover application tests.
 */

const {
  RoverApplication,
  RoverAppInvalidLengthCommandsError,
} = require("./index");

test("Rover app start with invalid null letters", () => {
  const roverApp = new RoverApplication();

  expect(() => roverApp.start(null)).toThrow(
    new RoverAppInvalidLengthCommandsError(0)
  );
});

test("Rover app start with invalid length letters only 2 commands", () => {
  const roverApp = new RoverApplication();

  expect(() => roverApp.start("5 5\n1 2 N")).toThrow("Invalid Length");
});

test("Rover app start with invalid letters commands", () => {
  const roverApp = new RoverApplication();
  const letters = "5 5\n0 0 N\nXXMM\n";

  expect(() => roverApp.start(letters)).toThrow("Invalid Syntax");
});

test("Rover app start with correct letters commands", () => {
  const roverApp = new RoverApplication();
  const letters = "5 5\n0 0 N\nRMM\n";
  const output = roverApp.start(letters);

  expect(output).toEqual("2 0 E");
});

test("Rover app start with - FoxBit Test", () => {
  const roverApp = new RoverApplication();
  const letters = "5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM";
  const output = roverApp.start(letters);

  expect(output).toEqual("1 3 N\n5 1 E");
});
