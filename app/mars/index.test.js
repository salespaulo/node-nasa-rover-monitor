/**
 * Tests on the planet Mars
 *
 * Here will see the NASA tests simulates Mars planet into secret lab.
 */

const MarsModule = require("./index");
const { Mars, MARS_DEFAULT_PROPS } = MarsModule;

test("Mars properties default when not pass properties to constructor", () => {
  const mars = new Mars();
  expect(mars.properties).toBe(MARS_DEFAULT_PROPS);
});
