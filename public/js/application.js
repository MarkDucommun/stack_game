$(document).ready(function() {
 
  // $(window).resize(function(){
  //   var height = $('.level').css('height')
  //   var board_height = parseInt(height, 10) * 0.7 + 'px'
  //   console.log(board_height)
  //   $('.board')
  //     .css('height', board_height)
  //     .css('weight', '80%')
  //   $('.square')
  //     .css('height', height / # of elements x)
  //     .css('width')
  // })

  // if(location.href === '/level/'){
    var id = $('.level').data('level')
    $.get('/level_data/' + id, function(levelData){
      $('.board').css('width', $('.board').css('height'))
      board = new Board(levelData)
    }, 'json')
  // }

  $('#sign_in').click(function(){
    location.href = '/sign_in'
  })

  $('#sign_out').click(function(){
    location.href = '/sign_out'
  })

  $('#create').click(function(event){
    event.preventDefault()
    location.href = '/create'
  })

  $('#retry').click(function(){

  })

  $('#create_grid').click(function(event){
    event.preventDefault()
    $(this).parent('form').hide()
    $('.create').append('<div class="board"></div>')
    var size = {}
    size['x'] = $('input[name="d"]').val()
    size['y'] = $('input[name="d"]').val()
    name = $('input[name="name"]').val()

    var box_height = parseInt($('.board').css('height'), 10)
    var screen_width = parseInt($('.create').css('width'), 10)
    var left_margin = (screen_width - box_height) / 2
    var button_left = (screen_width / 2) - 50
    $('.board')
      .css('width', box_height + 'px')
      .css('margin-left', left_margin + 'px')

    var util = new ScreenUtil(size, true)
    
    var pieces = []
    
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
