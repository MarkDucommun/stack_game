$(document).ready(function() {
  var levelDimensions = {'x': 4, 'y': 4}
  one = new ScreenUtil(levelDimensions)
});

function ScreenUtil(levelDimensions){
  this.setGridCharacteristics(levelDimensions)
  this.appendGrid()
}

ScreenUtil.prototype.setGridCharacteristics = function(levelDimensions){
  this.setDimensionX(levelDimensions['x'])
  this.setDimensionY(levelDimensions['y'])
  this.setNumDivs(levelDimensions)
  this.setSquareWidth()
  this.setSquareHeight()
}

ScreenUtil.prototype.appendGrid = function(){
  for(var i = 0; i < this.getNumDivs(); i++){
    $('.board').append(this.createDiv(i))
  }
}

ScreenUtil.prototype.createDiv = function(id){
  var width = this.getSquareWidth()
  console.log(width)
  var height = this.getSquareHeight()
  // console.log(height)
  var xPos = this.getPositionX(id) 
  // console.log(xPos)
  var yPos = this.getPositionY(id)
  // console.log(yPos)
  var square = $('<div class="square" id="sq' + id + '"></div>')
    .css('width', width)
    .css('height', height)
    .css('left', width * xPos)
    .css('bottom', height * yPos)
  return square
}

ScreenUtil.prototype.setNumDivs = function(levelDimensions){
  this.numDivs = levelDimensions['x'] * levelDimensions['y']
}

ScreenUtil.prototype.setDimensionX = function(x){
  this.dimensionX = x
}

ScreenUtil.prototype.setDimensionY = function(y){
  this.dimensionY = y
}

ScreenUtil.prototype.getDimensionX = function(){
  return this.dimensionX
}

ScreenUtil.prototype.getDimensionY = function(){
  return this.dimensionY
}

ScreenUtil.prototype.getNumDivs = function(){
  return this.numDivs
}

ScreenUtil.prototype.setSquareHeight = function(){
  var totalHeight = parseInt($('.board').css('height'), 10)
  this.squareHeight = totalHeight / this.getDimensionY() - 4
}

ScreenUtil.prototype.setSquareWidth = function(){
  var totalWidth = parseInt($('board').css('width'), 10)
  console.log(totalWidth)
  this.squareWidth = totalWidth / this.getDimensionX() - 4
}

ScreenUtil.prototype.getSquareWidth = function(){
  return this.squareWidth
}

ScreenUtil.prototype.getSquareHeight = function(){
  return this.squareHeight
}

ScreenUtil.prototype.getPositionX = function(id){
  return id % this.getSquareHeight()
}

ScreenUtil.prototype.getPositionY = function(id){
  return Math.floor( id / this.getSquareWidth())
}
