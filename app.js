'use strict';

var Grid = require('./lib/Grid'),
    Robot = require('./lib/Robot'),
    Mars = null,
    Marvin = null;

function handleInput(data) {
  if (!Mars) {
    var coords = data.match(/(\d)\s*(\d)/);
    if (!coords) {
      throw new Error('Unexpected initial pattern: ', data);
    }
    Mars = new Grid(parseInt(coords[1], 10), parseInt(coords[2], 10));
    return Mars;
  }

  var robotSetupMatch = data.match(/(\d)\s*(\d)\s*(\w)/),
      robotCommandMatch = data.match(/.+/);

  if (robotSetupMatch) {
    Marvin = new Robot(parseInt(robotSetupMatch[1], 10), parseInt(robotSetupMatch[2], 10), Mars, robotSetupMatch[3]);
    Marvin.responseStream = {
      send: console.log
    };
    return Marvin;
  }

  if (robotCommandMatch) {
    if (!Marvin) {
      throw new Error('Received command without active Robot');
    }
    data.split('').map(function (commandKey) {
      Marvin.handleCommand(commandKey);
    });
    if (Marvin.active) {
      return Marvin.terminate();
    } else {
      return false;
    }
  }

  throw new Error('Unrecognisable Pattern');
}

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    try {
      handleInput(chunk);
    } catch (e) {
      console.log(e.message);
    }
  }
});

process.stdin.on('end', function() {
  process.stdout.write('end');
});
