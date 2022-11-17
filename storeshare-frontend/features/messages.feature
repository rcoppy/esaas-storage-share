Feature: Messages

  Scenario: Log in 
    Given I am on the "homepage"
    When I fill in my email with "test@alex.com"
    When I fill in my password with "test@alex.com"
    When I click the "Login" button 
    Then I should see the "listing gallery" view.

  Scenario: View my messages
    Given I am on the "homepage"
    When I click the "see messages" icon
    Then I should see the "messages" view.