function Piece(x, y){
  this.setX(x)
  this.setY(y)
}

Piece.prototype.setCoordinates = function(coordinates){
  this.setX(coordinates['x'])
  this.setY(coordinates['y'])
}

Piece.prototype.setX = function(x){
  this.x = x
}

Piece.prototype.setY = function(y){
  this.y = y
}

Piece.prototype.getX = function(){
  return this.x
}

Piece.prototype.getY = function(){
  return this.y
}

function Movable(x, y){
  Piece.call(this, x, y)
}

Movable.prototype = Object.create(Piece.prototype)
Movable.prototype.constructor = Piece

function Fixed(x, y){
  Piece.call(this, x, y)
}

Fixed.prototype = Object.create(Piece.prototype)
Fixed.prototype.constructor = Piece
