$(document).ready(function() {
 
  // if(location.href === '/level/'){
    var id = $('.level').data('level')
    $.get('/level_data/' + id, function(levelData){
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
    size['x'] = $('input[name="x"]').val()
    size['y'] = $('input[name="y"]').val()
    name = $('input[name="name"]').val()
   
    var util = new ScreenUtil(size, true)
    
    var pieces = []
    
    var button = $('<button id="push_grid">Create Grid</button>').click(function(event){
      $.each($('.square'), function(i, div){
        piece = piecify(div)
        if(piece['piece'] !== 'none'){
          pieces.push(piece)
        }
      })
      $.post('/create', {size: size, pieces: pieces, name: name}, function(level_id){
        console.log(level_id)
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
