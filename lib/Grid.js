'use strict';


/**
 * Grid - A Grid that allows things to leave scents if they die
 *
 * @param  {Number} width  Width of the Grid
 * @param  {Number} height Height of the Grid
 * @return {Grid} 
 */
function Grid(width, height) {


  /**
   * Dimensions is in the form [x1,y1,x2,y2]
   */
  this.dimensions = [0,0,0,0];


  /**
   * Scents holds any deceased robot scents
   */
  this.scents = [];


  /**
   * hasPoint - Whether a given coordinate pair is valid for this Grid
   *
   * @param  {Number} x
   * @param  {Number} y
   * @return {Boolean}
   */
  this.hasPoint = function (x,y) {
    return (x >= this.dimensions[0] &&
            x <= this.dimensions[2] &&
            y >= this.dimensions[1] &&
            y <= this.dimensions[3]);
  };


  /**
   * hasScent - Whether a given coordinate pair has a deceased robot scent.
   *
   * @param  {Number} x
   * @param  {Number} y
   * @return {Boolean}
   */
  this.hasScent = function (x,y) {
    return this.scents.filter(function (scent) {
      return (scent[0] === x && scent[1] === y);
    }).length > 0;
  };


  /**
   * leaveScent - Leaves a scent at a given coordinate pair
   *
   * @param  {Number} x
   * @param  {Number} y
   * @return {undefined}
   */
  this.leaveScent = function (x,y) {
    this.scents.push([x,y]);
  };


  /**
   * setGrid - Sets the bounds of the Grid
   *
   * @param  {Number} width  The Grid's top right x-coordinate
   * @param  {type} height The Grid's top right y-coordinate
   * @return {undefined}
   */
  this.setGrid = function (width,height) {
    this.dimensions = [0, 0, width, height];
  };

  // Constructor Setup
  this.setGrid(width, height);
}

module.exports = Grid;
