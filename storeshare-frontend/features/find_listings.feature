Feature: see all listings advertised on the site
    As a renter
    So that I can find a storage space to rent
    I want to see all listings advertised on the site

Background: listings in database

    Given the following listings exist:
    | description | price | address           | city     | state | zip_code | square_feet |
    | My garage   | 100   | 123 Main St       | New York | NY    | 10027    | 500         |
    | My shed     | 50    | 70 Morningside Dr | New York | NY    | 10025    | 750         |
    | My loft     | 200   | W116 and Broadway | New York | NY    | 10012    | 1000        |
    
    And I wait for 3 seconds
    Given I am logged in
    And I am on the "homepage"

Scenario: see all listings
    Then I should see "My garage"
    And I should see "My shed"
    And I should see "My loft"
