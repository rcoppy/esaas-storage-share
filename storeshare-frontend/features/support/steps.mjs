import { strict as assert } from 'assert';
import { When, Then, Given } from '@cucumber/cucumber';
import UserProfileModel from '../../src/lib/UserProfileModel.mjs';
import exp from 'constants';

Given('I am logged in', async function () {
  this.setRoute('/'); 
  if (!this.getByText("Let's store your stuff.")) {
    return;
  }

  const email = "cucumber@alex.com";
  const name = "Cucumber Client";
  const password = "alexander";

  const emailField = this.getButtonByAria("email field").querySelector('input');
  this.setValue(emailField, email);

  const passwordField = this.getButtonByAria("password field").querySelector('input');
  this.setValue(passwordField, password);

  const loginButton = this.getButtonByText('Login');
  this.click(loginButton); 

  await new Promise(resolve => setTimeout(resolve, 1500));  

  // check if logged in 
  try {
    this.getByText("Let's store your stuff."); 
  } catch {
    return;
  }

  // otherwise try signup 
  console.log("trying to sign up");
  const toggle = this.getButtonByAria("toggle register mode").querySelector('input');; 
  this.click(toggle); 

  await new Promise(resolve => setTimeout(resolve, 1500));  

  const nameField = this.getButtonByAria("name field").querySelector('input');
  this.setValue(nameField, name);

  // try signup 
  const signupButton = this.getButtonByText("Sign up");
  this.click(signupButton); 
  await new Promise(resolve => setTimeout(resolve, 1000));
});

Given('I am on the {string}', function (page) {
  switch (page) {
    case "homepage":
    default:
      this.setRoute('/');
  }
});

When('I try to click the "Create a new listing" button', async function () {
  try {
    const optIn = this.getButtonByText("Opt-in to leasing");
    this.click(optIn); 
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch {}

  const create = this.getButtonByText("Create a new listing"); 
  this.click(create); 
});

When('I click the {string} icon', function (iconLabel) {
  const button = this.getButtonByAria(iconLabel);
  this.click(button);
});

When('I click the {string} button', function (buttonLabel) {
  const button = this.getButtonByText(buttonLabel);
  this.click(button);
});

When('I click the {string} link', function (linkText) {
  const link = this.getByText(linkText); 
  this.click(link);
});

When('I wait for {int} seconds', async function (seconds) {
  const milliseconds = seconds * 1000; 
  await new Promise(resolve => setTimeout(resolve, milliseconds));
}); 

When('I fill in the {string} field with {string}', function (label, value) {
  let field = this.getByAria(label).querySelector('input')
  
  if (!field) {
    field = this.getByAria(label).querySelector('textarea'); 
  }

  this.setValue(field, value); 
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
  assert.equal(this.profile.firstName, expectedResponse);
});

Then('I should see {string}', function (text) {
  assert.ok(this.getByTextContent(text));
});