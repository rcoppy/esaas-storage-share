Feature: Messages

  Scenario: Log in 
    Given I am on the "homepage"
    When I fill in my email with "renter@alex.com"
    When I fill in my password with "alexander"
    When I click the "Login" button 
    When I wait for 5 seconds
    Then I should see the "listing gallery" view.

  Scenario: View my messages
    Given I am on the "homepage"
    When I click the "see messages" icon
    Then I should see the "messages" view.