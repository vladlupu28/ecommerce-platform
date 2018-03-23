Feature: Login on BordProspects

  I want to login a free user

  Scenario: Login free user
    Given I open boardprospects
    When I click on login
    Then I fill the email&pass
    Then I should see user's name
  
  Scenario: Failing scenario
    Given I open boardprospects
    When I click on login
    Then I fill wrong email&pass
    Then I should see warning