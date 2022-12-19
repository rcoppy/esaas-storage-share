Feature: Logout user

Scenario: 
    Given I am logged in 
    When I click the "account avatar" icon
    And I click the "Logout" link

    Then I should see "Let's store your stuff."