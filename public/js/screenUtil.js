function ScreenUtil(levelDimensions, create){
  this.setGridCharacteristics(levelDimensions)
  this.appendGrid(create)
}

var borders = 10

ScreenUtil.prototype.setGridCharacteristics = function(levelDimensions){
  this.setDimensionX(levelDimensions['x'])
  this.setDimensionY(levelDimensions['y'])
  this.setNumDivs(levelDimensions)
  this.setSquareWidth()
  this.setSquareHeight()
}

ScreenUtil.prototype.appendGrid = function(create){
  for(var i = 0; i < this.getNumDivs(); i++){
    $('.board').append(this.createDiv(i, create))
  }
}

ScreenUtil.prototype.colorGrid = function(levelData){
  $('.square').css('background', 'none')
  levelData.forEach(this.colorDiv, this)
}

ScreenUtil.prototype.colorDiv = function(pieceData, index, array){
  divID = this.getID(pieceData['x'], pieceData['y'])
  color = pieceData['color']
  $('#sq' + divID).css('background', color)
}

ScreenUtil.prototype.createDiv = function(id, create){
  var width = this.getSquareWidth()
  var height = this.getSquareHeight()
  var xPos = this.getPositionX(id) 
  var yPos = this.getPositionY(id)
 
  var square = $('<div class="square" id="sq' + id + '"></div>')
    .css('width', width)
    .css('height', height)
    .css('left', (width + borders) * xPos)
    .css('bottom', (height + borders) * yPos)
   
  if(create){
    square.data('piece', 'none')
    square.click(function(){
      var piece = square.data('piece')
      if (piece === 'none'){
        $(this).css('background', 'red')
        $(this).data('piece', 'Movable')
      }
      else if(piece === 'Movable'){
        $(this).css('background', 'black')
        $(this).data('piece', 'Fixed')
      }
      else{
        $(this).css('background', 'none')
        $(this).data('piece', 'none')
      }
    })
  }

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
  this.squareHeight = totalHeight / this.getDimensionY() - borders
}

ScreenUtil.prototype.setSquareWidth = function(){
  var totalWidth = parseInt($('.board').css('width'), 10)
  this.squareWidth = totalWidth / this.getDimensionX() - borders
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
