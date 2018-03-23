Feature: Register a user

  I want to register a free user

  Scenario: Registering free user
    Given I open boardprospects
    When I click on register
    When I press join on standard
    Then I fill the form
    When I finish registration
    Then I should be redirected on login 

     Scenario: Registering Paid user
    Given I open boardprospects
    When I click on register
    When I press join on premium
    Then I fill the form
    Then I login on paypal
    Then I confirm payment
    When I finish registration
    Then I should be redirected on login 