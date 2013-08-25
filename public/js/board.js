function Board(levelData){
  this.setupBoard(levelData)
  this.startPlay()
}

Board.prototype.setupBoard = function(levelData){
  this.level = new Level(levelData)
  this.screenUtil = new ScreenUtil(levelData['size'], false)
  this.screenUtil.colorGrid(this.packageLevel())
}

Board.prototype.startPlay = function(){
  var board = this
  this.keystrokes = ""
 
  $(document).keyup(function(e){
    if(e.keyCode == 65 || e.keyCode == 37){
      board.keystrokes += "0"
      board.movePieces('left')
      board.screenUtil.colorGrid(board.packageLevel())
    }
    if(e.keyCode == 87 || e.keyCode == 38){
      board.keystrokes += "1"
      board.movePieces('up')
      board.screenUtil.colorGrid(board.packageLevel())
    }
    if(e.keyCode == 68 || e.keyCode == 39){
      board.keystrokes += "2"
      board.movePieces('right')
      board.screenUtil.colorGrid(board.packageLevel())
    }
    if(e.keyCode == 83 || e.keyCode == 40){
      board.keystrokes += "3"
      board.movePieces('down')
      board.screenUtil.colorGrid(board.packageLevel())
    }
    board.isGameFinished()
  })

  $(document).swipe({
    swipe:function(event, direction){
      console.log(direction)
      board.movePieces(direction)
      switch(direction){
        case 'left': board.keystrokes += "0"; break;
        case 'up': board.keystrokes += "1"; break;
        case 'right': board.keystrokes += "2"; break;
        case 'down': board.keystrokes += "3"; break;
      }
      board.screenUtil.colorGrid(board.packageLevel())
      board.isGameFinished()
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
    if(pieces[i] instanceof Movable){
      if(aPiece === undefined){
        aPiece = pieces[i]
      }
      if(!this.onSameCoordinates(aPiece, pieces[i])){
        return false
      }
    }
  }
  $(document).unbind('keyup')
  $.post('/game/' + $('.level').data('level'), {keystrokes: this.keystrokes}, function(game_id){
    
    location.href = '/results/' + $('.level').data('level')
  })
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
