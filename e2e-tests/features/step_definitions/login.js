var { Given, When, Then } = require('cucumber');
var Selector = require('testcafe').Selector;

Given('I open boardprospects', function () {
    return testController.navigateTo('https://dev.boardprospects.com/');
});

When('I click on login', function () {
    var input = Selector('.glyphicon-log-in').with({ boundTestRun: testController });

    return testController.click(input);
});

Then('I fill the email&pass', function() {
    var email = Selector('.ta-login-form__email-field').with({ boundTestRun: testController });
    var pass = Selector('.ta-login-form__password-field').with({ boundTestRun: testController });
    var button = Selector('.ta-login-form__submit-btn').with({ boundTestRun: testController });
    testController.typeText(email, 'login_test@mailinator.com');
    testController.typeText(pass, 'blabla');

    return testController.click(button);
});

Then('I fill wrong email&pass', function() {
    var email = Selector('.ta-login-form__email-field').with({ boundTestRun: testController });
    var pass = Selector('.ta-login-form__password-field').with({ boundTestRun: testController });
    var button = Selector('.ta-login-form__submit-btn').with({ boundTestRun: testController });
    testController.typeText(email, 'asdadlogin_test@mailinator.com');
    testController.typeText(pass, 'blasdadabla');

    return testController.click(button);
});

Then('I should see user\'s name', function () {
    var firstLink = Selector('.ta-profile-dropdown').with({ boundTestRun: testController });

    return testController.expect(firstLink.innerText).contains('Test');
});

Then('I should see warning', function () {
    var wrning = Selector('.text-danger').find('span').with({ boundTestRun: testController });
    return testController.expect(wrning.innerText).contains('The email you entered does not exist.')
});