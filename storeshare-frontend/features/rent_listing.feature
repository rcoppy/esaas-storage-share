Feature: rent an existing listing

    As a renter
    So that I can find storage for my possessions
    I want to rent an existing listing

Scenario: rent an existing listing

    Given I am logged in
    Given a specific listing described as "test listing" exists
    Given I am on the "homepage"

    When I click on the listing described as "test listing"
    And I click the "Reserve now" button 
    And I set the lease start date to January 1st of next year
    And I set the lease length to 4 months
    And I click the "Next" button

    And I set the rental size to 20 square feet
    Then I should see "Cost: $800 for 4 months"

    When I click the "Next" button 
    And I click the "Next" button 

    Then I should see "Does everything look right?"
    And I should see "20 square feet"

    When I click the "Reserve space" button 
    And I wait for 1 seconds

    When I click the "account avatar" icon
    And I click the "My storage" link
    And I wait for 1 seconds
    Then I should see "Testtown, CT, 12345"
