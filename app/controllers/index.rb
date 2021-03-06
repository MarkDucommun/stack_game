get '/' do
  @user = session[:user_id] if session[:user_id]
  @levels = Level.all.sample(10) if Level.all
  erb :index
end

get '/level/:id' do
  @level_id = params[:id]
  erb :level
end

get '/level_data/:id' do
  return Level.get_level_data(params[:id])
end

get '/results/:level_id' do
  puts params
  @level_id = params[:level_id]
  @games = Level.find(params[:level_id]).games.order(:score)
  erb :results
end

post '/game/:level_id' do
  game = nil
  level = Level.find(params[:level_id])
  if session[:user_id]
    game = User.find(session[:user_id]).games.create(level: level, keystrokes: params[:keystrokes]) 
  else
    game = User.find(1).games.create(level: level, keystrokes: params[:keystrokes])
  end
  return game.id.to_s
end

get '/create' do
  erb :create
end

post '/create' do
  user_id = 1
  user_id = session[:user_id] if session[:user_id]
  level = Level.create_from_level_data(params, user_id)
  return level.id.to_s
end

get '/sign_in' do
  redirect request_token.authorize_url
end

get '/sign_out' do
  session.delete(:user_id)
  redirect ('/')
end

get '/auth' do
  access_token = request_token.get_access_token(:oauth_verifier => params[:oauth_verifier])
  session.delete(:request_token)
  user = User.find_or_create_by_username(
    username: access_token.params[:screen_name],
    oauth_token: access_token.token,
    oauth_secret: access_token.secret) 
  session[:user_id] = user.id
  redirect '/'
end

get '/session_user' do
  if session[:user_id]
    return session[:user_id]
  end
end
