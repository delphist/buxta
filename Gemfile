source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

# Common
gem 'rails', '~> 5.1.1'
gem 'pg'
gem 'puma', '~> 3.7'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'
gem 'coffee-rails', '~> 4.2'
gem 'figaro'
gem 'rails-i18n', '~> 5.0.0'
gem 'draper', '~> 3.0.0'
gem 'slim'

# Admin
gem 'devise'
gem 'activeadmin'
gem 'activeadmin_addons'
gem 'active_material', github: 'vigetlabs/active_material'

# Misc
gem 'aasm'
gem 'httparty'
gem 'phony_rails'
gem 'paranoia', '~> 2.2'
gem 'pundit'

# Forms
gem 'reform-rails'
gem 'dry-validation'

# Images
gem 'carrierwave'
gem 'rmagick', require: false

# API
gem 'grape'
gem 'grape-entity'
gem 'grape-swagger'
gem 'grape-swagger-entity'
gem 'hashie-forbidden_attributes'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
end

group :development do
  gem 'annotate'
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  # Deploy
  gem 'capistrano-rails', require: false
  # gem 'capistrano-rvm', require: false
  gem 'capistrano-rbenv', require: false
  gem 'capistrano-bundler', require: false
  gem 'capistrano3-puma', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
