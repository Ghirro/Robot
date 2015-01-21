'use strict';

/* global describe, it, before */
var Environment = require('../lib/Environment').Environment,
    lastResponse = '',
    acceptResponse = function (output) {
      lastResponse = output;
    },
    handleInput = new Environment(null, null, acceptResponse),
    assert = require('chai').assert;

// Initial setup of the grid
before(function () {
  handleInput('5 3');
});

describe('robot', function () {
  it('should be in the correct position after first input', function () {
    handleInput('1 1 E');
    handleInput('RFRFRFRF');
    assert.equal(
      lastResponse,
      '1 1 E'
    );
  });
  it('should be in the correct position after second input', function () {
    handleInput('3 2 N');
    handleInput('FRRFLLFFRRFLL');
    assert.equal(
      lastResponse,
      '3 3 N LOST'
    );
  });
  it('should be in the correct position after third input', function () {
    handleInput('0 3 W');
    handleInput('LLFFFLFLFL');
    assert.equal(
      lastResponse,
      '2 3 S'
    );
  });
});
