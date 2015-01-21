'use strict';

function Grid(width, height) {

  // Dimensions are x1,y1,x2,y2 based coords.
  this.dimensions = [0,0,0,0];
  this.scents = [];

  this.hasPoint = function (x,y) {
    return (x >= this.dimensions[0] &&
            x <= this.dimensions[2] &&
            y >= this.dimensions[1] &&
            y <= this.dimensions[3]);
  };

  this.hasScent = function (x,y) {
    return this.scents.filter(function (scent) {
      return (scent[0] === x && scent[1] === y);
    }).length > 0;
  };

  this.leaveScent = function (x,y) {
    this.scents.push([x,y]);
  };

  this.setGrid = function (width,height) {
    this.dimensions = [0, 0, width, height];
  };

  this.setGrid(width, height);
}

module.exports = Grid;
