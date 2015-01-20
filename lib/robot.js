'use strict';

function Robot(x, y, grid, initialOrientationSymbol) {

  this.active = true;
  this.grid = grid;
  this.position = [];
  this.responseStream = null;
  this.orientation = 0;

  this.orientationMappings = [
    {
      degree: 360,
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
    // To get the correct direction (N,E,S,W) that we're facing
    // we take the current orientation and see which "artificial" direction we are heading in
    if ( this.orientation === 0 ) {
      return this.orientationMappings[0];
    }
    var self = this;
    var mapping = this.orientationMappings.filter(function (set) {
      return Math.abs( self.orientation % set.degree ) === 0;
    }).sort(function (a,b) {
      return a.degree - b.degree;
    });

    if (mapping.length === 0) {
      throw new Error('Unable to find orientation mapping for orientation ', this.orientation);
    }
    return mapping.pop();
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
    }

    this.position = [x,y];
    if (!this.grid.hasPoint(x,y)) {
      this.grid.leaveScent(x,y);
      this.terminate(true);
    }
  };

  this.terminate = function (killed) {
    this.responseStream.send(this.position.join(' '), this.getCurrentOrientationMapping().symbol);
    if ( killed ) {
      this.active = false;
      this.responseStream.send('LOST');
    }
  };

  this.handleCommand = function (commandKey) {
    var functionName = this.commandMappings[commandKey];
    if (!functionName) {
      throw Error('No Command Key ' + commandKey + 'on Robot');
    } else {
      return this[functionName]();
    }
  };

  this.turnLeft = function() {
    this.orientation -= 90;
  };

  this.turnRight = function() {
    this.orientation += 90;
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
