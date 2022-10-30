import { strict as assert } from 'assert';
import { When, Then, Given } from '@cucumber/cucumber';
import UserProfileModel from '../../src/lib/UserProfileModel.mjs';

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

Then('I should see the {string} view.', function (expected) {

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