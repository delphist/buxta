class Api::Members < Grape::API
  namespace :members do
    desc 'Register a new member'
    params do
      requires :token, type: String
      requires :code, type: String
      requires :name, type: String
      requires :phone, type: String
      requires :about, type: String
      requires :photos, type: Array do
        requires :id, type: Integer
      end
    end
    post do
      @form = Member::RegisterForm.new Member.new
      if @form.validate params
        present Member::RegisterService.new(@form).perform
      else
        error!({ error: @form.errors.messages }, 400)
      end
    end
  end

  rescue_from Grape::Exceptions::ValidationErrors do |e|
    error!({ error: e.map { |key, error| { key.first => error } }.reduce(:merge) }, 400)
  end
end
