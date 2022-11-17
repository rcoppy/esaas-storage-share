Feature: CRUD messages

  As a renter I would like to be able to reach subletters.
  I would like to be able to read my messages.

  As a subletter I would like to be able to read and respond to messages
  from renters.

  Background:
    Given I am on "homepage" view
    When I click the "see chat" icon
    Then I should see the "conversations" view

  Scenario: create messages
    Given I am on the "conversations" view
    When I click on an existing conversation
    When I send a message
    Then I should see my sent message

  Scenario: Read messages
    Given I am on the "conversations" view
    When I click on an existing conversation
    Then I should see existing message there
