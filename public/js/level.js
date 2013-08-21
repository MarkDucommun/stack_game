function Level(levelData){
  this.setDimensionX(levelData['xDimension'])
  this.setDimensionY(levelData['yDimension'])
  this.createPieces(levelData['pieces'])
}

Level.prototype.setDimensionX = function(xDimension){
  this.xDimension = xDimension
}

Level.prototype.setDimensionY = function(yDimension){
  this.yDimension = yDimension
}

Level.prototype.createPieces = function(){
  
}
