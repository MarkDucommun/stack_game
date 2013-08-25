function PushGridButton(name, size){
  var button = $('<button id="push_grid">Create</button>')
    .click(function(){
      var pieces = collectPieces(size['x'])
      postGrid(name, size, pieces)
    })
  return button
}

function collectPieces(size){
  var pieces = []
  $.each($('.square'), function(i, div){
    piece = piecify(i, div, size)
    if(piece['piece'] !== 'none'){
      pieces.push(piece)
    }
  })
  return pieces
}

function piecify(i, div, size){
  var piece = {}
  piece['piece'] = $(div).data('piece')
  if(piece['piece'] !== 'none'){
    piece['x'] = getPositionX(i, size)
    piece['y'] = getPositionY(i, size)
  }
  return piece
}

function postGrid(name, size, pieces){
  $.post('/create', {size: size, pieces: pieces, name: name}, function(level_id){
    location.href = '/level/' + level_id
  })
}

function getPositionX(id, dimension){
  return id % dimension
}

function getPositionY(id, dimension){
  return Math.floor( id / dimension)
}