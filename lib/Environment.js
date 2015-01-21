'use strict';

var Grid = require('./Grid'),
    Robot = require('./Robot');

function setupGrid(commandArray) {
  var x = parseInt(commandArray[1], 10),
      y = parseInt(commandArray[2], 10),
      gridInstance = new Grid(x, y);

  return gridInstance;
}

function setupRobot(respondFunction, grid, commandArray) {
  var x = parseInt(commandArray[1], 10),
      y = parseInt(commandArray[2], 10),
      orientation = commandArray[3],
      roboInstance = new Robot(x,y,grid,orientation);

  roboInstance.respond = respondFunction;
  return roboInstance;
}

function commandRobot(roboInstance, commandArray) {
  return commandArray.map(function (commandKey) {
    if (!commandKey) {
      return false;
    } else {
      return roboInstance.handleCommand(commandKey);
    }
  });
}

function Environment(roboInstance, gridInstance, respondFunction) {
  this.firstResponder = function (data) {
    var gridSetupMatch = data.match(/(\d)\s*(\d)/),
        robotSetupMatch = data.match(/(\d)\s*(\d)\s*(\w)/),
        robotCommandMatch = data.match(/\w+/);

    if (!gridInstance) {
      if (!gridSetupMatch) {
        throw new Error('Unexpected initial pattern: ', data);
      }
      gridInstance = setupGrid(gridSetupMatch);
      return gridInstance;
    } else if (robotSetupMatch) {
      roboInstance = setupRobot(respondFunction, gridInstance, robotSetupMatch);
      return roboInstance;
    } else if (robotCommandMatch) {
      if (!roboInstance) {
        throw new Error('Received command without active Robot');
      }

      commandRobot(roboInstance, data.replace(/\n/, '').split(''));

      if (roboInstance.active) {
        return roboInstance.terminate();
      } else {
        return false;
      }
    }

    throw new Error('Unrecognisable Pattern');
  };
  return this.firstResponder;
}

module.exports = {
  Environment: Environment
};
