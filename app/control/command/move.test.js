/**
 * NASA rover control command move tests.
 */

const { Mars } = require("../../mars");
const { Rover } = require("../../rover");

const move = require("./move");

test("Rover control move", () => {
  const mars = new Mars();
  const rover = new Rover();
  const plateau = mars.getPlateau();

  const newRover = move(rover, plateau);

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(rover.y + 1);
  expect(newRover.orientation).toEqual(rover.orientation);
});
