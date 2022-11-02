Feature: New profile

  Scenario: Name a new profile
    When I make a new profile with the name "Alex"
    Then the profile name should be "Alex"