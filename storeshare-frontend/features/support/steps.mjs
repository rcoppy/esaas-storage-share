import { strict as assert } from 'assert';
import { When, Then, Given } from '@cucumber/cucumber';
import UserProfileModel from '../../src/lib/UserProfileModel.mjs';
import exp from 'constants';

Given('I am on the {string}', function (page) {
  switch (page) {
    case "homepage":
    default:
      this.setRoute('/');
  }
});

When('I click the {string} icon', function (iconLabel) {
  const button = this.getButtonByAria(iconLabel);
  this.click(button);
});

When('I click the {string} button', function (buttonLabel) {
  const button = this.getButtonByText(buttonLabel);
  this.click(button);
});

When('I wait for {int} seconds', async function (seconds) {
  const milliseconds = seconds * 1000; 
  await new Promise(resolve => setTimeout(resolve, milliseconds));
}); 

When('I fill in my email with {string}', function (email) {
  const field = this.getButtonByAria("email field").querySelector('input');
  this.setValue(field, email);
});

When('I fill in my password with {string}', function (password) {
  const field = this.getButtonByAria("password field").querySelector('input');
  this.setValue(field, password);
});

Then('I should see the {string} view.', function (expected) {

  if (expected === "listing gallery") {
    // listing gallery currently lives at root
    expected = '';
  }

  const route = '/' + expected;

  if (this.route !== route) {
    throw new Error(`
      Expected route: ${route}
      Received route: ${this.route}
    `);
  }
});

When('I make a new profile with the name {string}', function (input) {
  this.profile = new UserProfileModel({ firstName: input });
});

Then('the profile name should be {string}', function (expectedResponse) {
  assert.equal(this.profile.firstName, expectedResponse)
});