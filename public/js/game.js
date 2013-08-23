$(document).ready(function() {

  var id = $('.level').data('level')
  $.get('/level_data/' + id, function(levelData){
    new Board(levelData)
  }, 'json')
});
