$(document).ready(function() {
  
  buttons()
  
  // if(location.href === '/level/'){
    var id = $('.level').data('level')
    $.get('/level_data/' + id, function(levelData){
      $('div').append('<div class="board"></div>')
      resize_board()
      board = new Board(levelData)
    }, 'json')
  // }

  dynamic_resize()

  $('#create_grid').click(function(event){
    event.preventDefault()
   
    $(this).parent('form').hide()
   
    $('.create').append('<div class="board"></div>')
    
    resize_board()

    var size = {}
    size['x'] = $('input[name="d"]').val()
    size['y'] = $('input[name="d"]').val()
    name = $('input[name="name"]').val()

    var util = new ScreenUtil(size, true)
    
    var pieces = []

    var box_height = parseInt($('.board').css('height'), 10)
    var screen_width = parseInt($('.create').css('width'), 10)    
    
    var button = $('<button id="push_grid">Create Grid</button>')
      .css('left', button_left)
      .click(function(event){
        $.each($('.square'), function(i, div){
          piece = piecify(div)
          if(piece['piece'] !== 'none'){
            pieces.push(piece)
          }
        })
        $.post('/create', {size: size, pieces: pieces, name: name}, function(level_id){
          location.href = '/level/' + level_id
        })
      })

    $('.create').append(button)

    function piecify(div){
      var piece = {}
      piece['piece'] = $(div).data('piece')
      if(piece['piece'] !== 'none'){
        piece['x'] = getPositionX( parseInt( $(div).attr('id').slice(2), 10))
        piece['y'] = getPositionY( parseInt( $(div).attr('id').slice(2), 10))
      }
      return piece
    }

    function getPositionX(id){
      return id % size['x']
    }

    function getPositionY(id){
      return Math.floor( id / size['y'])
    }
  })
});
