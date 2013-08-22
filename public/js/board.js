function Board(levelData){
  this.setupBoard(levelData)
  this.startPlay()
}

Board.prototype.setupBoard = function(levelData){
  this.level = new Level(levelData)
  this.screenUtil = new ScreenUtil(levelData['size'])
  this.screenUtil.colorGrid(this.packageLevel())
}

Board.prototype.startPlay = function(){
  var board = this
  var keystrokes = []
  $(document).on('keyup', function(e){
    
    keystrokes.push(e.keyCode)
    console.log(keystrokes.length)
    if(e.keyCode == 65){
      board.movePieces('left')
      // board.isGameFinished()
      board.screenUtil.colorGrid(board.packageLevel())
    }
    if(e.keyCode == 87){
      board.movePieces('up')
      // board.isGameFinished()
      board.screenUtil.colorGrid(board.packageLevel())
    }
    if(e.keyCode == 68){
      board.movePieces('right')
      // board.isGameFinished()
      board.screenUtil.colorGrid(board.packageLevel())
    }
    if(e.keyCode == 83){
      board.movePieces('down')
      // board.isGameFinished()
      board.screenUtil.colorGrid(board.packageLevel())
    }
  })  
}

Board.prototype.movePieces = function(direction){
  var pieces = this.level.getPieces()
  for(i in pieces){
    var piece = pieces[i]
    if(piece instanceof Movable){
      this.movePiece(piece, direction)      
    }
  } 
}

Board.prototype.movePiece = function(piece, direction){
  var potentialMove = this.calculateMove(piece, direction)
  if(this.noConflicts(potentialMove, this.level.getPieces())){
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
      coord['x'] = piece.getX() - 1
      coord['y'] = piece.getY()
      break;
    case 'up':
      coord['x'] = piece.getX()
      coord['y'] = piece.getY() + 1
      break;

    case 'right':
      coord['x'] = piece.getX() + 1
      coord['y'] = piece.getY()
      break;

    case 'down':
      coord['x'] = piece.getX()
      coord['y'] = piece.getY() - 1
      break;
  }
  return coord
}

Board.prototype.isGameFinished = function(){
  var aPiece = undefined
  var pieces = this.level.getPieces()
  for(var i = 0; i < pieces.length; i++){
    if(piece instanceof Movable){
      aPiece |= pieces[i]
      // if(!this.onSameCoordinates(aPiece))
    }
  }
}

Board.prototype.onSameCoordinates = function(pieceA, pieceB){
  if(pieceA.getX() === pieceB.getX() 
    && pieceA.getY() === pieceB.getY()){
    return true
  }
  return false
}

Board.prototype.packageLevel = function(){
  var levelData = []
  this.level.getPieces().forEach(function(piece, index, array){
    levelData.push(this.packagePiece(piece))
  }, this)
  return levelData
}

Board.prototype.packagePiece = function(piece){
  var pieceData = {}
  pieceData['x'] = piece.getX()
  pieceData['y'] = piece.getY()
  if(piece instanceof Movable){
    pieceData['color'] = 'red'
  }
  else{
    pieceData['color'] = 'black'
  }
  return pieceData
}
