Feature: CRUD conversations

  As a renter I would like to be able to reach subletters.
  I would like to be able to go to my conversations.

  As a subletter I would like to be able to do the same.

  Background:
    Given I am on "homepage" view
    When I click the "see chat" icon
    Then I should see the "conversations" view

  Scenario: create conversations
    Given I am on the "conversations" view
    When I click the new conversation" icon
    Then I am on "new conversation" view


  Scenario: Read conversations
    Given I am on the "messages" view
    Then I should see the conversations I had

