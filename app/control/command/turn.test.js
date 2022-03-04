/**
 * NASA rover control command turn 90 degrees tests.
 */

const { Rover } = require("../../rover");

const turn = require("./turn");

test("Rover control turn", () => {
  const rover = new Rover();
  const newRover = turn(rover);

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(rover.y);
  expect(newRover.orientation).toEqual("E");
});
