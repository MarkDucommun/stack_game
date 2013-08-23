get '/' do
  # @user =
  # @levels =  
  erb :index
end

get '/level/:id' do
  @level_id = params[:id]
  erb :level
end

get '/level_data/:id' do
  return Level.get_level_data(params[:id])
end

post '/game' do
  
end
