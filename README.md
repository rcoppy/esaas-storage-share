# esaas-storage-share
Semester project for CS4152 (AirBnB for storage). 

## Unit tests 
_running Rspec test suite in the backend_
```
$ cd storeshare-api
$ bundle exec rspec
```
The code coverage report will be generated in `coverage/index.html` after the test suite finishes running.
We use the `simplecov` gem to generate the report.

## Acceptance tests 
_running Cucumber against the frontend_
```
$ cd storeshare-frontend
$ npm test
```
The test suite will take a couple of seconds to finish running. 

## Spinning up the frontend dev server
```
$ cd storeshare-frontend
$ npm start
```
App will be live at `localhost:3000`

## Stack versioning
Makes use of: 
- Ruby 3.1.2
- Rails 7.0.4

Ideally managing ruby version via `rbenv`

https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-macos

