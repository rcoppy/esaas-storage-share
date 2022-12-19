FactoryBot.define do
  factory :conversation do
    # renter
    # subletter
    association :renter
    association :subletter
  end
end
