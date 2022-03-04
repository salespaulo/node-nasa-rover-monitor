/**
 * NASA rover control command move tests.
 */

const { Mars } = require("../../mars");
const { Rover } = require("../../rover");

const move = require("./move");

test("Rover control move from North limits", () => {
  const mars = new Mars();
  const rover = new Rover(5, 5, "N");
  const plateau = mars.getPlateau();

  const newRover = move(rover, plateau);

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(0);
  expect(newRover.orientation).toEqual(rover.orientation);
});

test("Rover control move from North", () => {
  const mars = new Mars();
  const rover = new Rover();
  const plateau = mars.getPlateau();

  const newRover = move(rover, plateau);

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(rover.y + 1);
  expect(newRover.orientation).toEqual(rover.orientation);
});

test("Rover control move from South limits", () => {
  const mars = new Mars();
  const rover = new Rover(5, 0, "S");
  const plateau = mars.getPlateau();

  const newRover = move(rover, plateau);

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(5);
  expect(newRover.orientation).toEqual(rover.orientation);
});

test("Rover control move from South", () => {
  const mars = new Mars();
  const rover = new Rover(5, 5, "S");
  const plateau = mars.getPlateau();

  const newRover = move(rover, plateau);

  expect(newRover.x).toEqual(rover.x);
  expect(newRover.y).toEqual(rover.y - 1);
  expect(newRover.orientation).toEqual(rover.orientation);
});

test("Rover control move from East limits", () => {
  const mars = new Mars();
  const rover = new Rover(5, 5, "E");
  const plateau = mars.getPlateau();

  const newRover = move(rover, plateau);

  expect(newRover.x).toEqual(0);
  expect(newRover.y).toEqual(rover.y);
  expect(newRover.orientation).toEqual(rover.orientation);
});

test("Rover control move from East", () => {
  const mars = new Mars();
  const rover = new Rover(0, 0, "E");
  const plateau = mars.getPlateau();

  const newRover = move(rover, plateau);

  expect(newRover.x).toEqual(rover.x + 1);
  expect(newRover.y).toEqual(rover.y);
  expect(newRover.orientation).toEqual(rover.orientation);
});

test("Rover control move from West limits", () => {
  const mars = new Mars();
  const rover = new Rover(0, 0, "W");
  const plateau = mars.getPlateau();

  const newRover = move(rover, plateau);

  expect(newRover.x).toEqual(5);
  expect(newRover.y).toEqual(rover.y);
  expect(newRover.orientation).toEqual(rover.orientation);
});

test("Rover control move from West", () => {
  const mars = new Mars();
  const rover = new Rover(2, 2, "W");
  const plateau = mars.getPlateau();

  const newRover = move(rover, plateau);

  expect(newRover.x).toEqual(rover.x - 1);
  expect(newRover.y).toEqual(rover.y);
  expect(newRover.orientation).toEqual(rover.orientation);
});
