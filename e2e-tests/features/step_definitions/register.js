var { Given, When, Then } = require('cucumber');
var Selector = require('testcafe').Selector;
var ClientFunction = require('testcafe').ClientFunction;

When('I click on register', function () {
    var input = Selector('.glyphicon-user').with({ boundTestRun: testController });

    return testController.click(input);
});

When('I press join on standard', function() {
    var button = Selector('.ta-individual-subscription__option-1').with({ boundTestRun: testController });

    return testController.click(button);
});

When('I press join on premium', function() {
    var button = Selector('.ta-individual-subscription__option-2').with({ boundTestRun: testController });

    return testController.click(button);
});

When('I finish registration', function() {
    var button = Selector('#step2 > :nth-child(1) > .col-md-8 > :nth-child(1) > .join-form-main > .btn').with({ boundTestRun: testController });

    return testController.click(button);
});

Then('I fill the form', function() {
    var firstName = Selector(':nth-child(1) > :nth-child(1) > .form-control').with({ boundTestRun: testController });
    var lastName = Selector(':nth-child(1) > :nth-child(2) > .form-control').with({ boundTestRun: testController });
    var email = Selector('.col-md-12 > .form-control').with({ boundTestRun: testController });
    var retypePass = Selector('[data-view="views/registration/_password"] > :nth-child(2) > .form-control').with({ boundTestRun: testController });
    var zipCode = Selector(':nth-child(6) > :nth-child(2) > .form-control').with({ boundTestRun: testController });
    var gender = Selector(':nth-child(4) > :nth-child(2) > :nth-child(3) > input').with({ boundTestRun: testController });
    var eula = Selector('.termscheckbox').with({ boundTestRun: testController });
    var pass = Selector('[data-view="views/registration/_password"] > :nth-child(1) > .form-control').with({ boundTestRun: testController });
    var button = Selector('#step1 > :nth-child(1) > .col-md-8 > :nth-child(1) > .join-form-main > .btn').with({ boundTestRun: testController });
    testController.typeText(firstName, 'Vlad');
    testController.typeText(lastName, 'Test');
    testController.typeText(zipCode, '9030');
    testController.typeText(email, 'asdkjkj@mailinator.com');
    testController.typeText(pass, 'blasdadabla');
    testController.typeText(retypePass, 'blasdadabla');
    testController.click(gender);
    testController.click(eula);

    return testController.click(button);
});

Then('I should be redirected on login', function () {
    var button = Selector('.ta-login-form__submit-btn').with({ boundTestRun: testController });

    return testController.expect(button.innerText).contains('Login');
});

Then('I login on paypal', function () {
    const url = ClientFunction(() => 
        window.location.href.toString()
    );

    testController.switchToIframe('[name=injectedUl]');

    var email = Selector('#email').with({ boundTestRun: testController });
    var pass = Selector('#password').with({ boundTestRun: testController });
    var button = Selector('#btnLogin').with({ boundTestRun: testController });
    testController.typeText(email,'pp-test@equilobe.com');
    testController.typeText(pass,'parola1234');
    return testController.click(button);
});

Then('I confirm payment', function() {
    testController.switchToMainWindow();
    var button = Selector('#confirmButtonTop').with({ boundTestRun: testController });

    return testController.click(button);
})