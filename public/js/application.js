$(document).ready(function() {
  
  buttons()
  
  if($('.level').length){
    var id = $('.level').data('level')
    $.get('/level_data/' + id, function(levelData){
      $('div').append('<div class="board"></div>')
      resize_board()
      board = new Board(levelData)
    }, 'json')
  }

  dynamic_resize()
});
