/**
 * NASA rover monitor tests.
 */
const { RoverMonitor } = require("./index");

test("Rover monitor instance", () => {
  const roverMonitor = new RoverMonitor();
  expect(roverMonitor.plateau).not.toBeNull();
});
