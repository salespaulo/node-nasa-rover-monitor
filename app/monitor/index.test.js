/**
 * NASA rover monitor tests.
 */
const { RoverMonitor } = require("./index");
const { Rover } = require("../rover");

test("Rover monitor instance", () => {
  const roverMonitor = new RoverMonitor();

  expect(roverMonitor.plateau).not.toBeNull();
});

test("Rover monitor add default rover", () => {
  const roverMonitor = new RoverMonitor();
  const rover = new Rover();

  const roverControl = roverMonitor.addRover(rover);

  expect(roverControl).not.toBeNull();
  expect(roverControl.rover).toStrictEqual(rover);
  expect(roverControl.plateau).toStrictEqual(roverMonitor.plateau);
});

test("Rover monitor execute default rover", () => {
  const roverMonitor = new RoverMonitor();
  const rover = new Rover();

  const roverControl = roverMonitor.addRover(rover);

  expect(roverControl).not.toBeNull();
  expect(roverControl.rover).toStrictEqual(rover);
  expect(roverControl.plateau).toStrictEqual(roverMonitor.plateau);
});
