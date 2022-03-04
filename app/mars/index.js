/**
 * Represents the planet Mars where rovers, landed by NASA, arrived at a plateau on the planet.
 * The plateau is a rectangular place with coordinates x and y.
 */

/**
 * Default properties to planet Mars.
 * @type {{limits: {bottomLeft: {min: number, max: number}, upperRight: {min: number, max: number}}}}
 */
const MARS_DEFAULT_PROPS = {
  limits: {
    upperRight: { min: 5, max: 100 },
    bottomLeft: { min: 0, max: 0 },
  },
};

/**
 * Cartesian point represented by coordinates x and y.
 */
class CartesianPoint {
  /**
   * Cartesian coordinates x and y.
   *
   * @param x The horizontal 2D grid.
   * @param y The vertical 2D grid.
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class MarsPlateau {
  constructor(
    upperRight = new CartesianPoint(5, 5),
    bottomLeft = new CartesianPoint(0, 0)
  ) {
    this.upperRight = upperRight;
    this.bottomLeft = bottomLeft;
  }
}

/**
 * Planet Mars and your plateaus to land the rovers.
 *
 * This planet already have default properties that
 * represents values inner conditions of planet.
 *
 * We can construct one planet Mars with customized
 * properties passing away into constructor.
 */
class Mars {
  constructor(properties = MARS_DEFAULT_PROPS) {
    this.properties = properties;
  }

  getPlateauToLanded() {
    return new MarsPlateau();
  }
}

module.exports = {
  CartesianPoint,
  MARS_DEFAULT_PROPS,
  MarsPlateau,
  Mars,
};
