/**
 * Represents the planet Mars where rovers, landed by NASA, arrived at a plateau on the planet.
 * The plateau is a rectangular place with coordinates x and y.
 */

/**
 * Default properties to planet Mars.
 * @type {{limits: {upperRight: {min: number, max: number}}}}
 */
const MARS_DEFAULT_PROPS = {
  limits: {
    upperRight: { min: 5, max: 100 },
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

/**
 * The plateau on Mars with bottom left corner and upper right corner
 * coordinates.
 */
class MarsPlateau {
  /**
   * The security plateau on Mars and your limit corners.
   *
   * @param {CartesianPoint} upperRight Coordinates to upper right corner limit.
   * @param {CartesianPoint} bottomLeft Coordinates to bottom left corner limit.
   */
  constructor(upperRight, bottomLeft = new CartesianPoint(0, 0)) {
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
  /**
   * Construct planet Mars with default properties or custom ones.
   *
   * @param properties Planet inner properties.
   */
  constructor(properties = MARS_DEFAULT_PROPS) {
    this.properties = properties;
  }

  /**
   * Gets random plateau on Mars with random coordinates to upper right corner.
   *
   * @returns {MarsPlateau} The instance of random plateau.
   */
  randomPlateau() {
    const randomNumberX = this._randomUpperRightCoordinate();
    const randomNumberY = this._randomUpperRightCoordinate();

    return this.getPlateau(randomNumberX, randomNumberY);
  }

  /**
   * Gets the security plateau on Mars with coordinates of upper right corner.
   *
   * The bottom left corner is assumes always x = 0 and y = 0.
   *
   * @param upperRightX The horizontal 2D coordinates, default is min upper right.
   * @param upperRightY The vertical 2D coordinates, default is max upper right.
   * @returns {MarsPlateau} The instance of security plateau on Mars.
   */
  getPlateau(
    upperRightX = this.properties.limits.upperRight.min,
    upperRightY = this.properties.limits.upperRight.min
  ) {
    if (upperRightX < this.properties.limits.upperRight.min) {
      upperRightX = this.properties.limits.upperRight.min;
    }

    if (upperRightY < this.properties.limits.upperRight.min) {
      upperRightY = this.properties.limits.upperRight.min;
    }

    if (upperRightX > this.properties.limits.upperRight.max) {
      upperRightX = this.properties.limits.upperRight.max;
    }

    if (upperRightY > this.properties.limits.upperRight.max) {
      upperRightY = this.properties.limits.upperRight.max;
    }

    const upperRightPoint = new CartesianPoint(upperRightX, upperRightY);
    return new MarsPlateau(upperRightPoint);
  }

  _randomUpperRightCoordinate() {
    return Math.round(Math.random() * this.properties.limits.upperRight.max);
  }
}

module.exports = {
  Mars,
  MarsPlateau,
  CartesianPoint,
};
