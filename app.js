'use strict';

var Environment = require('./lib/Environment').Environment,
    marvin = null,
    mars = null,
    handleInput = new Environment(marvin, mars, console.log);


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
