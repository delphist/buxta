# == Schema Information
#
# Table name: members
#
#  id         :integer          not null, primary key
#  name       :string
#  phone      :string
#  license    :string
#  state      :string
#  about      :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Member < ApplicationRecord
  include AASM

  has_many :photos
  has_many :sms_histories
  phony_normalize :phone, country_code: 'RU'

  validates :name, :phone, :about, presence: true

  aasm column: 'state' do
    state :created, initial: true
    state :approved, :rejected

    event :approve do
      transitions from: [:created, :rejected], to: :approved
    end

    event :reject do
      transitions from: [:created, :approved], to: :rejected
    end
  end
end
