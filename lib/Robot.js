'use strict';


/**
 * Robot - The Robot Function, Moves around a Grid.
 *
 * @param  {Number} x                        The initial x-coordinate of the Robot
 * @param  {Number} y                        The initial y-coordinate of the Robot
 * @param  {Grid} grid                     The Grid the Robot will operate on
 * @param  {String} initialOrientationSymbol The Initial Orientation of the Robot on the Grid
 * @return {Robot}
 */
function Robot(x, y, grid, initialOrientationSymbol) {


  /**
   * Active is whether or not the Robot is alive and accepting commands
   */
  this.active = true;


  /**
   * The grid the robot is operating within
   */
  this.grid = grid;


  /**
   * The current grid coords [x,y] of the robot.
   */
  this.position = [];


  /**
   * Respond is a function that the robot uses to output information
   */
  this.respond = null;


  /**
   * Orientation is a 0-359 integer representing the robots current orientation
   */
  this.orientation = 0;


  /**
   * This maps a degree orientation to it's human symbol and how to move there.
   * degree: Integer. The compass point that represents this orientation.
   * symbol: String. Human readable version of this orientation (used in input/output).
   * move: Function. Given current [x,y] coords what will moving forward in this orientation do.
   */
  this.orientationMappings = [
    {
      degree: 0,
      symbol: 'N',
      move: function (x,y) {
        return [x,y+1];
      }
    },
    {
      degree: 90,
      symbol: 'E',
      move: function (x,y) {
        return [x+1,y];
      }
    },
    {
      degree: 180,
      symbol: 'S',
      move: function (x,y) {
        return [x, y-1];
      }
    },
    {
      degree: 270,
      symbol: 'W',
      move: function (x,y) {
        return [x-1, y];
      }
    }
  ];


  /**
   * CommandMappings maps input commands to internal methods that perform the
   * relevant operations.
   * key => functionName
   */
  this.commandMappings = {
    'F' : 'moveForward',
    'L' : 'turnLeft',
    'R' : 'turnRight'
  };


  /**
   * getCurrentOrientationMapping - Returns the orientationMapping for the current degree orientation
   *
   * @return {orientationMapping}
   */
  this.getCurrentOrientationMapping = function () {
    var self = this,
    mapping;

    mapping = this.orientationMappings.filter(function (set) {
      return self.orientation === set.degree;
    }).pop();

    if (!mapping) {
      throw new Error('Unable to find orientation mapping for orientation ', this.orientation);
    }

    return mapping;
  };


  /**
   * attach - Attaches a grid
   *
   * @param  {Grid} The Grid the robot should operate within
   * @return {undefined}
   */
  this.attach = function (grid) {
    this.grid = grid;
  };


  /**
   * setPosition - Sets the robots position within the grid
   *
   * @param  {Number} x The x-coordinate
   * @param  {Number} y The y-coordinate
   * @return {undefined}
   */
  this.setPosition = function (x, y) {
    if (!this.grid) {
      throw new Error('No Grid Attached');
    } else if ( this.grid.hasScent(this.position[0],this.position[1]) && !this.grid.hasPoint(x,y) ) {
      return false;
    } else if (!this.active) {
      return false;
    }

    if (!this.grid.hasPoint(x,y)) {
      this.grid.leaveScent(this.position[0],this.position[1]);
      this.terminate(true);
    } else {
      this.position = [x,y];
    }
  };


  /**
   * terminate - Ends the robot's activity cycle and responds appropriately
   *
   * @param  {Boolean} killed Whether or not the robot fell off the edge of the grid
   * @return {undefined}
   */
  this.terminate = function (killed) {
    var response = this.position.join(' ') + ' ' + this.getCurrentOrientationMapping().symbol;
    if ( killed ) {
      this.active = false;
      response = response + ' LOST';
    }
    this.respond(response);
  };


  /**
   * handleCommand - Handles commands
   *
   * @param  {String} commandKey The command to execute in commandMapping key format
   * @return {undefined}
   */
  this.handleCommand = function (commandKey) {
    var functionName = this.commandMappings[commandKey];
    if (!functionName) {
      throw Error('No Command Key ' + commandKey + 'on Robot');
    } else {
      this[functionName]();
    }
  };



  /**
   * turnLeft - Reorients the robot -90 degrees
   * @return {undefined}
   */
  this.turnLeft = function() {
    if (this.orientation <= 0) {
      this.orientation = 270;
    } else {
      this.orientation -= 90;
    }
  };


  /**
   * turnRight - Reorients the robot +90 degrees
   * @return {undefined}
   */
  this.turnRight = function() {
    if (this.orientation >= 270) {
      this.orientation = 0;
    } else {
      this.orientation += 90;
    }
  };


  /**
   * moveForward - Moves the robot forward according to it's current orientation
   * @return {undefined}
   */
  this.moveForward = function() {
    var newCoords = this.getCurrentOrientationMapping().move(this.position[0], this.position[1]);
    this.setPosition(newCoords[0], newCoords[1]);
  };


  // Constructor Setup
  this.setPosition(x,y);
  this.orientation = this.orientationMappings.filter(function (mapping) {
    return mapping.symbol === initialOrientationSymbol;
  }).pop().degree;
}

module.exports = Robot;
