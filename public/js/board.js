function Board(levelData){
  this.setupBoard(levelData)
  this.beginPlay()
}

Board.prototype.setupBoard = function(levelData){
  this.level = new Level(levelData)
  //give a representation of the level to ui
}

Board.prototype.startPlay = function(){
  $(document).on('keyup', function(e){
    if(e.keyCode == 65){
      this.movePieces('left')
      this.isGameFinished()
      this.ui.paint(this.level)
    }
    if(e.keyCode == 87){
      this.movePieces('up')
      this.isGameFinished()
    }
    if(e.keyCode == 68){
      this.movePieces('right')
      this.isGameFinished()
    }
    if(e.keyCode == 83){
      this.movePieces('down')
      this.isGameFinished()
    }
  })  
}

Board.prototype.movePieces = function(direction){
  var pieces = this.level.getPieces() // returns array of pieces
  // target the location each movable piece will potentially move to
  for(i in pieces){
    var piece = pieces[i]
    if(piece instanceof Movable){
      this.movePiece(piece)      
    }
  } 
}

Board.prototype.movePiece = function(){
  var potentialMove = this.calculateMove(piece, direction)
  if(this.noConflicts(potentialMove, pieces)){
    piece.setCoordinates(potentialMove)
  }
}

Board.prototype.noConflicts = function(potentialMove){
  if(this.isOnBoard(potentialMove) 
    && this.isNotOnObstacle(potentialMove)){
    return true
  }
  return false
}

Board.prototype.isOnBoard = function(potentialMove){
  if(potentialMove['x'] >= 0
    && potentialMove['x'] < this.level.getDimensionX()
    && potentialMove['y'] >= 0
    && potentialMove['y'] < this.level.getDimensionY()){
    return true
  }
  return false
}

Board.prototype.isNotOnObstacle = function(potentialMove){
  pieces = this.level.getPieces()
  for(i in pieces){
    var piece = pieces[i]
    if(piece instanceof Fixed
      && piece.getX() === potentialMove['x']
      && piece.getY() === potentialMove['y']){
      return false
    }
  }
  return true
}

Board.prototype.calculateMove = function(piece, direction){
  var coord = {}
  switch(direction){
    case 'left':
      coord['x'] = piece.getX - 1
      coord['y'] = piece.getY
      break;
    case 'up':
      coord['x'] = piece.getX
      coord['y'] = piece.getY + 1
      break;

    case 'right':
      coord['x'] = piece.getX + 1
      coord['y'] = piece.getY
      break;

    case 'down':
      coord['x'] = piece.getX
      coord['y'] = piece.getY - 1
      break;
  }
  return coord
}
