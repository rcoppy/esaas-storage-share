Feature: create a new listing

    As a subletter
    So that I can advertise my storage space
    I want to create a new listing


Scenario: create a new listing

    Given I am logged in
    Given I am on the "homepage"
    When I click the "account avatar" icon
    And I click the "Manage listings" link
    And I try to click the "Create a new listing" button
    And I fill in the "street address" field with "321 Opening View Dr"
    And I fill in the "state name" field with "CT"
    And I fill in the "city name" field with "Derby"
    And I fill in the "zipcode" field with "06342"
    And I click the "Next" button
    And I fill in the "square feet" field with "100"
    And I fill in the "ceiling height" field with "10"
    And I click the "Next" button
    And I fill in the "square foot cost" field with "7"
    And I click the "Next" button 
    And I fill in the "description text" field with "A cozy storage unit"
    And I click the "Next" button
    Then I should see "100 square feet ($700 per month)"
    And I should see "321 Opening View DrDerby, CT 06342"
    And I should see "A cozy storage unit"

    When I click the "Create listing" button
    And I wait for 1 seconds

    Then I should see "My existing listings"
    And I should see "A cozy storage unit"
