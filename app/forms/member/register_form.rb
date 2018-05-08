class Member::RegisterForm < ApplicationForm
  property :token, virtual: true
  property :code, virtual: true

  property :name
  property :about
  property :phone

  collection :photos,
    populator: ->(fragment:, **) {
      item = photos.find { |photo| photo.id == fragment['id'].to_i }
      item ? item : photos.append(Photo.find_by(id: fragment['id']))
    } do
    property :id
  end

  validation do
    configure do
      config.messages = :i18n
      option :form
      def correct_code? value
        SmsConfirmation.exists?(code: value, token: form.token)
      end
    end

    required(:token).filled
    required(:code).filled(:correct_code?)

    required(:name).filled
    required(:about).filled

    required(:photos).each do
      schema do
        required(:id).filled
      end
    end
  end
end
