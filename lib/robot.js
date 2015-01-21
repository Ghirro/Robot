'use strict';

function Robot(x, y, grid, initialOrientationSymbol) {

  this.active = true;
  this.grid = grid;
  this.position = [];
  this.respond = null;
  this.orientation = 0;

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

  this.commandMappings = {
    'F' : 'moveForward',
    'L' : 'turnLeft',
    'R' : 'turnRight'
  };

  this.attach = function (grid) {
    this.grid = grid;
  };

  this.setPosition = function (x, y) {
    if (!this.grid) {
      throw new Error('No Grid Attached');
    } else if ( this.grid.hasScent(x,y) ) {
      return false;
    } else if (!this.active) {
      return false;
    }

    if (!this.grid.hasPoint(x,y)) {
      this.grid.leaveScent(x,y);
      this.terminate(true);
    } else {
      this.position = [x,y];
    }
  };

  this.terminate = function (killed) {
    var response = this.position.join(' ') + ' ' + this.getCurrentOrientationMapping().symbol;
    if ( killed ) {
      this.active = false;
      response = response + ' LOST';
    }
    this.respond(response);
  };

  this.handleCommand = function (commandKey) {
    var functionName = this.commandMappings[commandKey];
    if (!functionName) {
      throw Error('No Command Key ' + commandKey + 'on Robot');
    } else {
      this[functionName]();
    }
  };

  this.turnLeft = function() {
    if (this.orientation <= 0) {
      this.orientation = 270;
    } else {
      this.orientation -= 90;
    }
  };

  this.turnRight = function() {
    if (this.orientation >= 270) {
      this.orientation = 0;
    } else {
      this.orientation += 90;
    }
  };

  this.moveForward = function() {
    var newCoords = this.getCurrentOrientationMapping().move(this.position[0], this.position[1]);
    this.setPosition(newCoords[0], newCoords[1]);
  };

  // Initial Setup
  this.setPosition(x,y); // Position
  this.orientation = this.orientationMappings.filter(function (mapping) {
    return mapping.symbol === initialOrientationSymbol;
  }).pop().degree;
}

module.exports = Robot;
