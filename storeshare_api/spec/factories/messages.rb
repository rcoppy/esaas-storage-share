FactoryBot.define do
  factory :message do
    body { Faker::Lorem.sentence }
    read { 'f' }
    conversation
    user
    # association :user
    # association :conversation
  end

end
