/*
 * Represents the squad of robotic rovers landed by NASA.
 *
 * A rover's position and location is represented by a combination of x
 * and y co-ordinates and a letter representing one of the four cardinal
 * compass points.
 */

class Rover {
  constructor(x = 0, y = 0, orientation = "N") {
    this.x = this._coordinate(x);
    this.y = this._coordinate(y);
    this.orientation = this._orientation(orientation);
  }

  _coordinate(coordinate) {
    return coordinate >= 0 ? coordinate : 0;
  }

  _orientation(orientation) {
    return ["N", "S", "E", "W"].indexOf(orientation) > 0 ? orientation : "N";
  }
}

module.exports = {
  Rover,
};
