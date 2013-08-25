$(document).ready(function() {
  
  document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, false);
 
  window.onresize = function() {
    $(document.body).width(window.innerWidth).height(window.innerHeight);
  }

  $(function() {
    window.onresize();
  });


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
