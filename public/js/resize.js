var dynamic_resize = function(){
  $(window).resize(function(){
    resize_scroll()
    resize_board()
    resize_push_grid_button()
    resize_squares()
  })
}

var resize_board = function(){
  var board_dimension
  
  if(screen_width() < screen_height()){
    board_dimension = screen_width() * 0.9
  }
  else{
    board_dimension = screen_height() * 0.9
  }
  
  var left_margin = (screen_width() - board_dimension) / 2
  var top_margin = (screen_height() - board_dimension) / 4
  
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

var resize_push_grid_button = function(){
  var button_dimension = board_dimension() * 0.2
  var fontsize = button_dimension * 0.2
  
  if(screen_width() < screen_height()){
    var top = (screen_height() - board_dimension()) / 3 + board_dimension()
    var left = (screen_width() - button_dimension) / 2
  }
  else{
    var top = (screen_height() - button_dimension) / 2
    var left = ((screen_width() - board_dimension()) / 2 - button_dimension) / 2
  }

  $('#push_grid')
    .css('height', button_dimension + 'px')
    .css('width', button_dimension + 'px')
    .css('top', top + 'px')
    .css('left', left + 'px')
    .css('font-size', fontsize + 'px')
}

var resize_scroll = function(){
  var ul_width = screen_width() * 0.6
  var ul_height = screen_height() * 0.8
  var left = (screen_width() - ul_width) / 2
  var top = (screen_height() - ul_height) / 2
  $('.scrollbox')
    .css('width', ul_width + 'px')
    .css('height', ul_height + 'px')
    .css('left', left + 'px')
    .css('top', top + 'px')
}

var getPositionX = function(id, dimension){
  return id % dimension
}

var getPositionY = function(id, dimension){
  return Math.floor( id / dimension)
}

var screen_width = function(){
  return window.innerWidth
}

var screen_height = function(){
  return window.innerHeight
}

var board_dimension = function(){
  return parseInt($('.board').css('height'), 10)
}

var button_dimension = function(){
  return parseInt($('#push_grid').css('height'), 10)
}

var pushGridExists = function(){
  return $('#push_grid').length
}

var buttonUnderGrid = function(){
  return sideMargin() < button_dimension()
}

var sideMargin = function(){
  return (screen_width() - board_dimension()) / 2
}