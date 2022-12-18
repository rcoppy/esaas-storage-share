import { strict as assert } from 'assert';
import { When, Then, Given, setDefaultTimeout } from '@cucumber/cucumber';
import UserProfileModel from '../../src/lib/UserProfileModel.mjs';
import exp from 'constants';

setDefaultTimeout(10 * 1000); 

async function signInUser(name, email, password) {
  this.setRoute('/'); 
  if (!this.getByText("Let's store your stuff.")) {
    return;
  }

  // const email = "cucumber@alex.com";
  // const name = "Cucumber Client";
  // const password = "alexander";

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
}

Given('I am logged in', async function () {
  await signInUser.bind(this)("Cucumber Client", "cucumber@alex.com", "alexander");
});

Given('I am on the {string}', function (page) {
  switch (page) {
    case "homepage":
    default:
      this.setRoute('/');
  }
});

Given('a specific listing described as {string} exists', async function (description) {
  this.setRoute('/'); 

  try {
    assert.ok(this.getByText(description)); 
    return;
  } catch {}

  // logout 
  this.click(this.getButtonByAria("account avatar")); 
  this.click(this.getByText("Logout")); 
  await new Promise(resolve => setTimeout(resolve, 800));

  await signInUser.bind(this)('Cucumber Alternate', 'cucumber.alternate@alex.com', 'alexander');
   
  this.click(this.getButtonByAria("account avatar")); 
  this.click(this.getByText("Manage listings")); 

  try {
    const optIn = this.getButtonByText("Opt-in to leasing");
    this.click(optIn); 
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch {}

  console.log('route: ' + this.route); 

  this.click(this.getButtonByText('Create a new listing')); 

  this.setValue(this.getByAria("street address").querySelector('input'), '123 Test Rd'); 
  this.setValue(this.getByAria("state name").querySelector('input'), 'CT'); 
  this.setValue(this.getByAria("city name").querySelector('input'), 'Testtown'); 
  this.setValue(this.getByAria("zipcode").querySelector('input'), '12345'); 

  const next = this.getButtonByText('Next'); 
  this.click(next); 

  this.setValue(this.getByAria("square feet").querySelector('input'), "100");
  this.setValue(this.getByAria("ceiling height").querySelector('input'), "10");
  
  this.click(next); 

  this.setValue(this.getByAria("square foot cost").querySelector('input'), "10");

  this.click(next); 
  
  this.setValue(this.getByAria("description text").querySelector('textarea'), description);

  this.click(next); 
  this.click(this.getButtonByText('Create listing'));
  await new Promise((resolve) => setTimeout(resolve, 800)); 

  // logout 
  this.click(this.getButtonByAria("account avatar")); 
  this.click(this.getByText("Logout")); 
  await new Promise(resolve => setTimeout(resolve, 800));

  await signInUser.bind(this)("Cucumber Client", "cucumber@alex.com", "alexander"); 
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

When('I click on the listing described as {string}', function (description) {
  this.click(this.getByTextContent(description)[0].closest('a')); 
});

When('I set the lease start date to January 1st of next year', function () {
  this.setValue(this.getByAria('Lease start date').closest('div').querySelector('input'), `01/01/${new Date().getFullYear() + 1}`); 
}); 

When('I set the lease length to {int} months', function (months) {
  this.setValue(this.getByAria('lease length').querySelector('input'), months); 
}); 

When('I set the rental size to {int} square feet', function (size) {
  this.setValue(this.getByAria('square feet').querySelector('input'), size); 
}); 