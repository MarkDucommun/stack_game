var resize_board = function(){
  $(window).resize(function(){
  var height = $('.level').css('height')
  var board_height = parseInt(height, 10) * 0.7 + 'px'
 
  $('.board')
    .css('height', board_height)
    .css('width', '80%')
  $('.square')
    .css('height')
    .css('width')
  })
}

var resize_board = function(){
  var screen_width = parseInt($('.board').parent().css('width'), 10)
  var screen_height = parseInt($('.board').parent().css('height'), 10)
  var board_dimension
  
  if(screen_width < screen_height){
    console.log("WIDTH NARROWER")
    board_dimension = screen_width * 0.8
  }
  else{
    console.log("HEIGHT NARROWER")
    board_dimension = screen_height * 0.8
  }
  
  var left_margin = (screen_width - board_dimension) / 2
  var top_margin = (screen_height - board_dimension) / 5
  
  $('.board')
    .css('height', board_dimension + 'px')
    .css('width', board_dimension + 'px')
    .css('left', left_margin + 'px')
    .css('top', top_margin + 'px')
}

var resize_squares = function(){
  $('.square')
}