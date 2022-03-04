const { Rover } = require("./index");

test("Rover have orientation and position to be located", () => {
  const defaultRover = new Rover();
  expect(defaultRover).not.toBeNull();
});
