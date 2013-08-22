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

ScreenUtil.prototype.colorGrid = function(levelData){
  levelData.forEach(this.colorDiv, this)
}

ScreenUtil.prototype.colorDiv = function(pieceData, index, array){
  console.log(pieceData)
  divID = this.getID(pieceData['x'], pieceData['y'])
  color = pieceData['color']
  console.log('#sq' + divID)
  console.log(color)
  $('#sq' + divID).css('background', color)
}

ScreenUtil.prototype.createDiv = function(id){
  var width = this.getSquareWidth()
  var height = this.getSquareHeight()
  var xPos = this.getPositionX(id) 
  var yPos = this.getPositionY(id)
  var square = $('<div class="square" id="sq' + id + '"></div>')
    .css('width', width)
    .css('height', height)
    .css('left', (width + 4) * xPos)
    .css('bottom', (height + 4) * yPos)
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
  var totalWidth = parseInt($('.board').css('width'), 10)
  this.squareWidth = totalWidth / this.getDimensionX() - 4
}

ScreenUtil.prototype.getSquareHeight = function(){
  return this.squareHeight
}

ScreenUtil.prototype.getSquareWidth = function(){
  return this.squareWidth
}

ScreenUtil.prototype.getPositionX = function(id){
  return id % this.getDimensionX()
}

ScreenUtil.prototype.getPositionY = function(id){
  return Math.floor( id / this.getDimensionY())
}

ScreenUtil.prototype.getID = function(x, y){
  return y * this.getDimensionY() + x
}
