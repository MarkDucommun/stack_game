class User < ActiveRecord::Base
  has_many :games
  has_many :levels, through: :games
  has_many :created_levels, class_name: 'Level' 

  def get_client
    client = Twitter::REST::Client.new do |config|
      config.consumer_key = ENV['TWITTER_KEY']
      config.consumer_secret = ENV['TWITTER_SECRET']
      config.access_token = self.oauth_token
      config.access_token_secret = self.oauth_secret
    end
    client
  end
end
