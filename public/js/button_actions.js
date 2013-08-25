var buttons = function(){ 
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
    
    resize_board()

    var size = {}
    size['x'] = $('input[name="d"]').val()
    size['y'] = $('input[name="d"]').val()
    name = $('input[name="name"]').val()

    var util = new ScreenUtil(size, true)
    
    $('.create').append(new PushGridButton(name, size))
    resize_push_grid_button()
  })
}