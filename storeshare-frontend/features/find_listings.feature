Feature: see all listings advertised on the site
    As a renter
    So that I can find a storage space to rent
    I want to see all listings advertised on the site

Background: listings in database

    Given I am logged in
    Given the following listings exist:
    | name      | description | price | description | address           | city     | postcode | square_feet | user_id |
    | My garage | My garage   | 100   | My garage   | 123 Main St       | New York | 10027    | 500         | 1       |
    | My shed   | My shed     | 50    | My shed     | 70 Morningside Dr | New York | 10025    | 750         | 2       |
    | My loft   | My loft     | 200   | My loft     | W116 and Broadway | New York | 10012    | 1000        | 3       |
    
    And I am on the homepage

Scenario: see all listings
    When I follow "All listings"
    Then I should see "My garage"
    And I should see "My shed"
    And I should see "My loft"
