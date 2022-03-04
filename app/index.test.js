/**
 * NASA rover application tests.
 */

const { RoverApplication, RoverAppInvalidCommandsError } = require("./index");

test("Rover app instance", () => {
  const roverApp = new RoverApplication();
  expect(roverApp.roverMonitor).not.toBeNull();
});

test("Rover app start with letters null", () => {
  const roverApp = new RoverApplication();

  expect(() => roverApp.start(null)).toThrow(
    new RoverAppInvalidCommandsError(0)
  );
});

test("Rover app start with letters 5 5", () => {
  const roverApp = new RoverApplication();

  expect(() => roverApp.start("5 5")).toThrow(
    new RoverAppInvalidCommandsError(1)
  );
});
