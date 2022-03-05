/**
 * Represents the squad of robotic rovers landed by NASA.
 *
 * A rover's position and location is represented by a combination of x
 * and y co-ordinates and a letter representing one of the four cardinal
 * compass points.
 */

/**
 * Rover orientation values:
 *  - "N": North
 *  - "S": South
 *  - "E": East
 *  - "W": West
 */
const ORIENTATION = ["N", "S", "E", "W"];

/**
 * Rover that landed by NASA.
 */
class Rover {
  /**
   * Creates new rover with orientation and position.
   *
   * @param x The horizontal 2D coordinate.
   * @param y The vertical 2D coordinate.
   * @param orientation The rover orientation, North, South, East or West.
   * @see ORIENTATION
   */
  constructor(x = 0, y = 0, orientation = "N") {
    this.x = x >= 0 ? x : 0;
    this.y = y >= 0 ? y : 0;
    this.orientation = this._orientation(orientation);
  }

  _orientation(orientation) {
    return ORIENTATION.indexOf(orientation) > 0 ? orientation : "N";
  }
}

module.exports = {
  Rover,
};
