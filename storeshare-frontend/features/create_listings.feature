Feature: create a new listing

    As a subletter
    So that I can advertise my storage space
    I want to create a new listing

Scenario: create a new listing

    Given I am on the home page
    When I click on "Create a new listing"
    And I fill in "Name" with "My storage space"
    And I fill in "Description" with "A great place to store your stuff"
    And I fill in "Price" with "100"
    And I fill in "Address" with "1 My Street"
    And I fill in "Postcode" with "10027"
    And I fill in "City" with "New York"
    And I fill in "Square feet" with "100"

    
    And I click on "Create Listing"
    Then I should be on the listings page
    And I should see "Listing was successfully created."
    And I should see "My storage space"
