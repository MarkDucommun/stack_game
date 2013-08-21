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

Level.prototype.createPieces = function(piecesData){
  var pieces = []
  for(i in piecesData){
    pieces.push(this.createPiece(piecesData[i]))
  }
  this.pieces = pieces
}

Level.prototype.createPiece = function(pieceData){
  var e = eval
  var piece = e('new ' + pieceData['type'] 
      + '(' + pieceData['coordinates'] + ')')
}

Level.prototype.getDimensionX = function(){
  return this.xDimension
}

Level.prototype.getDimensionY = function(){
  return this.yDimension
}

Level.prototype.getPieces = function(){
  return this.pieces
}