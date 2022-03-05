/**
 * Tests on the planet Mars
 *
 * Here will see the NASA tests simulates Mars planet into secret lab.
 */

const { Mars } = require("./index");

test("Mars getting default plateau", () => {
  const mars = new Mars();
  const defaultPlateau = mars.getPlateau();

  expect(defaultPlateau).not.toBeNull();
  expect(defaultPlateau.upperRight).not.toBeNull();
  expect(defaultPlateau.bottomLeft).not.toBeNull();
});

test("Mars getting default plateau coordinates", () => {
  const mars = new Mars();
  const defaultPlateau = mars.getPlateau();

  expect(defaultPlateau.upperRight.x).toBe(
    mars.properties.limits.upperRight.min
  );
  expect(defaultPlateau.upperRight.y).toBe(
    mars.properties.limits.upperRight.min
  );
  expect(defaultPlateau.bottomLeft.x).toEqual(0);
  expect(defaultPlateau.bottomLeft.y).toEqual(0);
});

test("Mars getting random plateau coordinates", () => {
  const mars = new Mars();
  const randomPlateau = mars.randomPlateau();

  expect(randomPlateau.upperRight.x >= mars.properties.limits.upperRight.min);
  expect(randomPlateau.upperRight.y >= mars.properties.limits.upperRight.min);
  expect(randomPlateau.upperRight.x <= mars.properties.limits.upperRight.max);
  expect(randomPlateau.upperRight.y <= mars.properties.limits.upperRight.max);

  expect(randomPlateau.bottomLeft.x).toEqual(0);
  expect(randomPlateau.bottomLeft.y).toEqual(0);
});

test("Mars getting custom plateau coordinates", () => {
  const mars = new Mars();
  const customPlateau = mars.getPlateau(10, 5);

  expect(customPlateau.upperRight.x).toEqual(10);
  expect(customPlateau.upperRight.y).toEqual(5);
  expect(customPlateau.bottomLeft.x).toEqual(0);
  expect(customPlateau.bottomLeft.y).toEqual(0);
});

test("Mars getting custom exceed max limits plateau coordinates", () => {
  const mars = new Mars();
  const customPlateau = mars.getPlateau(10000, 10000);

  expect(customPlateau.upperRight.x).toEqual(100);
  expect(customPlateau.upperRight.y).toEqual(100);
  expect(customPlateau.bottomLeft.x).toEqual(0);
  expect(customPlateau.bottomLeft.y).toEqual(0);
});

test("Mars getting custom exceed min limits plateau coordinates", () => {
  const mars = new Mars();
  const customPlateau = mars.getPlateau(1, 1);

  expect(customPlateau.upperRight.x).toEqual(5);
  expect(customPlateau.upperRight.y).toEqual(5);
  expect(customPlateau.bottomLeft.x).toEqual(0);
  expect(customPlateau.bottomLeft.y).toEqual(0);
});
