import {strict as assert} from 'assert';
import { When, Then } from '@cucumber/cucumber'; 
import UserProfileModel from '../../src/lib/UserProfileModel.mjs'; 

When('I make a new profile with the name {string}', function (input) {
  this.profile = new UserProfileModel({firstName: input});
});

Then('the profile name should be {string}', function (expectedResponse) {
  assert.equal(this.profile.firstName, expectedResponse)
});