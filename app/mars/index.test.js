/**
 * Tests on the planet Mars
 *
 * Here will see the NASA tests simulates Mars planet into secret lab.
 */

const { Mars, MARS_DEFAULT_PROPS } = require("./index");

test("Mars properties default when not pass properties to constructor", () => {
  const mars = new Mars();
  expect(mars.properties).toBe(MARS_DEFAULT_PROPS);
});

test("Mars getting better plateau to landed the squad of rovers", () => {
  const mars = new Mars();
  expect(mars.getPlateauToLanded()).not.toBeNull();
});
