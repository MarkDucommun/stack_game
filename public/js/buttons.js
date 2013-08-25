function PushGridButton(name, size){
  var button = $('<button id="push_grid">Create</button>')
    .click(function(){
      var pieces = collectPieces()
      postGrid(name, size, pieces)
    })
  return button
}

function collectPieces(){
  var pieces = []
  $.each($('.square'), function(i, div){
    piece = piecify(i, div)
    if(piece['piece'] !== 'none'){
      pieces.push(piece)
    }
  })
  return pieces
}

function piecify(i, div){
  var piece = {}
  piece['piece'] = $(div).data('piece')
  if(piece['piece'] !== 'none'){
    piece['x'] = getPositionX(i)
    piece['y'] = getPositionY(i)
  }
  return piece
}

function postGrid(name, size, pieces){
  $.post('/create', {size: size, pieces: pieces, name: name}, function(level_id){
    location.href = '/level/' + level_id
  })
}

function getPositionX(id, dimension){
  return id % size['x']
}

function getPositionY(id, dimension){
  return Math.floor( id / size['y'])
}