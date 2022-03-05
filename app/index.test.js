/**
 * NASA rover application tests.
 */

const { MarsPlateau, CartesianPoint } = require("./mars");
const { Rover } = require("./rover");
const { RoverMonitor } = require("./monitor");

const { RoverApplication } = require("./index");

test("Rover app parse letters to plateau instance", () => {
  const roverApp = new RoverApplication();
  const letters = "5 5";
  const output = roverApp.parseToPlateau(letters);
  const expected = new MarsPlateau(new CartesianPoint(5, 5));

  expect(output).toStrictEqual(expected);
});

test("Rover app parse invalid letters to plateau instance", () => {
  const roverApp = new RoverApplication();
  const letters = "5 5 N";

  expect(() => roverApp.parseToPlateau(letters)).toThrow("Invalid Length");
});

test("Rover app parse letters to rover instance", () => {
  const roverApp = new RoverApplication();
  const letters = "1 2 N";
  const output = roverApp.parseToRover(letters);
  const expected = new Rover(1, 2, "N");

  expect(output).toStrictEqual(expected);
});

test("Rover app parse invalid letters to rover instance", () => {
  const roverApp = new RoverApplication();
  const letters = "5 5 N N";

  expect(() => roverApp.parseToRover(letters)).toThrow("invalid rover info");
});

test("Rover app create rover infos", () => {
  const roverApp = new RoverApplication();
  const roverMonitor = new RoverMonitor();
  const commands = "1 2 N\nRMMLMRM".split("\n");

  const infoRovers = roverApp.createInfoRovers(roverMonitor, commands);
  expect(infoRovers.length).toEqual(1);

  const output = infoRovers[0];

  expect(output.control).not.toBeNull();
  expect(output.control.rover).toStrictEqual(new Rover(1, 2, "N"));

  expect(output.commands).not.toBeNull();
  expect(output.commands.length).toEqual(7);
});

test("Rover app create rover infos", () => {
  const roverApp = new RoverApplication();
  const roverMonitor = new RoverMonitor();
  const commands = "1 2 N\nRMMLMRM".split("\n");

  const infoRovers = roverApp.createInfoRovers(roverMonitor, commands);
  const outputRovers = roverApp.createOutputRovers(infoRovers);

  expect(outputRovers).not.toBeNull();
  expect(outputRovers.length).toBeGreaterThan(0);
  expect(outputRovers).toEqual("4 3 E");
});

test("Rover app start with invalid null letters", () => {
  const roverApp = new RoverApplication();

  expect(() => roverApp.start(null)).toThrow("Has 0");
});

test("Rover app start with invalid length letters only 2 commands", () => {
  const roverApp = new RoverApplication();

  expect(() => roverApp.start("5 5\n1 2 N")).toThrow("Has 2");
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

test("Rover app start with already rover in position", () => {
  const roverApp = new RoverApplication();

  const letters = "5 5\n1 2 N\nLMLMLMLMM\n1 2 E\nMMRMMRMRRM";

  expect(() => roverApp.start(letters)).toThrow("Rover already exists");
});
