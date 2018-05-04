server 'buxta.su',
  roles: %w[app db web],
  ssh_options: {
    user: fetch(:user),
    forward_agent: false,
    auth_methods: %w[publickey]
  }

set :rails_env, 'production'
set :deploy_to, "/home/#{fetch(:user)}/applications/#{fetch(:application)}"

set :nginx_server_name, 'buxta.su'
set :nginx_sites_available_path, "/etc/nginx/sites-available"
set :nginx_sites_enabled_path, "/etc/nginx/conf.d"

set :puma_workers, 0
set :puma_threads, [4, 16]
set :puma_init_active_record, true
set :puma_preload_app, true
set :puma_worker_timeout, nil
set :puma_bind,       "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.sock"
set :puma_state,      "#{shared_path}/tmp/pids/puma.state"
set :puma_pid,        "#{shared_path}/tmp/pids/puma.pid"
set :puma_access_log, "#{release_path}/log/puma.error.log"
set :puma_error_log,  "#{release_path}/log/puma.access.log"
