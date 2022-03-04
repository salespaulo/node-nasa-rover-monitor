/**
 * Tests on the planet Mars
 *
 * Here will see the NASA tests simulates Mars planet into secret lab.
 */

const {
  Mars,
  MarsPlateau,
  MARS_DEFAULT_PROPS,
  CartesianPoint,
} = require("./index");

test("Mars properties default when not pass properties to constructor", () => {
  const mars = new Mars();
  expect(mars.properties).toBe(MARS_DEFAULT_PROPS);
});

test("Mars getting better plateau to landed the squad of rovers", () => {
  const mars = new Mars();
  const defaultPlateau = mars.getPlateauToLanded();

  expect(defaultPlateau).not.toBeNull();
  expect(defaultPlateau).toStrictEqual(new MarsPlateau());
  expect(defaultPlateau.upperRight).toEqual(new CartesianPoint(5, 5));
  expect(defaultPlateau.bottomLeft).toEqual(new CartesianPoint(0, 0));
});
