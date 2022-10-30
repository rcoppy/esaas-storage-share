Feature: Messages

  Scenario: View my messages
    Given I am on the "homepage"
    When I click the "see messages" icon
    Then I should see the "messages" view.