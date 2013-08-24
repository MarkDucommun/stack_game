var dynamic_resize = function(){
  $(window).resize(function(){
    resize_board()
    resize_squares()
  })
}

var resize_board = function(){
  var screen_width = parseInt($('.board').parent().css('width'), 10)
  var screen_height = parseInt($('.board').parent().css('height'), 10)
  var board_dimension
  
  if(screen_width < screen_height){
    board_dimension = screen_width * 0.9
  }
  else{
    board_dimension = screen_height * 0.9
  }
  
  var left_margin = (screen_width - board_dimension) / 2
  var top_margin = (screen_height - board_dimension) / 4
  
  $('.board')
    .css('height', board_dimension + 'px')
    .css('width', board_dimension + 'px')
    .css('left', left_margin + 'px')
    .css('top', top_margin + 'px')
}

var resize_squares = function(){
  var board_dimension = parseInt($('.board').css('height'), 10)
  var num_squares = $('.board').data('dimension')
  var border = $('.board').data('border')
  var square_dimension = board_dimension / num_squares - border
  
  $.each($('.square'), function(i, div){
    var xPos = getPositionX(i, num_squares)
    var yPos = getPositionY(i, num_squares)
    var left = (square_dimension + border) * xPos
    var bottom = (square_dimension + border) * yPos
    $(div)
      .css('height', square_dimension + 'px')
      .css('width', square_dimension + 'px')
      .css('left', left + 'px')
      .css('bottom', bottom + 'px')
  })
}

var getPositionX = function(id, dimension){
  return id % dimension
}

var getPositionY = function(id, dimension){
  return Math.floor( id / dimension)
}