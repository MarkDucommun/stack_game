get '/' do
  # @user =
  @levels = Level.all.sample(10) 
  erb :index
end

get '/level/:id' do
  @level_id = params[:id]
  erb :level
end

get '/level_data/:id' do
  return Level.get_level_data(params[:id])
end

get '/results/:id' do
  @games = Level.find(params[:id]).games
  erb :level
end

post '/game/:level_id' do
  game = nil
  level = Level.find(params[:level_id])
  if session[:user_id]
    game = User.find(session[:user_id]).games.create(level: level, keystrokes: params[:keystrokes]) 
  else
    game = Game.create(level: level, keystrokes: params[:keystrokes])
  end
  return game.id.to_s
end

get '/create' do
  erb :create
end

post '/create' do
  level = Level.create_from_level_data(params)
  return level.id.to_s
end
