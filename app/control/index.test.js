const { Rover } = require("../rover");

test("Rover control instance of default rover", () => {
  const defaultRover = new Rover();

  expect(defaultRover.control).not.toBeNull();
});
