'use strict';

var Environment = require('./lib/Environment').Environment,
    marvin = null,
    mars = null,
    sugaredConsole = function (output) {
      console.log('Robot Response: ' + output);
    },
    handleInput = new Environment(marvin, mars, sugaredConsole);


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
