# esaas-storage-share
Semester project for CS4152 (AirBnB for storage). 

## First-time setup

The `storeshare_api` and `storeshare-frontend` directories each contain projects that need to be configured separately. 

### Backend setup
To set up the dependencies for the rails API, inside of `storeshare_api` run the command: 
```
$ bundle install
```

To be able to run the API locally, we also need to initialize its local database instance: 
```
$ rake db:create && rake db:migrate && rake db:seed
```

Finally, to check that everything is set up correctly, run: 
```
$ rails s
```

And the server should start without errors within a couple seconds. 

### Frontend setup
To set up the react app's dependencies, inside of `storeshare-frontend` run the command: 
```
$ npm install
```

To verify, run `npm test`, which takes about a minute. If not all six scenarios pass, your project dependencies are likely only partially installed.

## Test coverage

### Unit tests 
_running Rspec test suite in the backend_
```
$ cd storeshare_api
$ bundle exec rspec
```
The code coverage report will be generated in `coverage/index.html` after the test suite finishes running.
We use the `simplecov` gem to generate the report.

### Acceptance tests 
_running Cucumber against the frontend_
```
$ cd storeshare-frontend
$ npm test
```
The test suite will take up to a minute to finish running. In a minority of runs, some tests will be flaky-- this can either happen when npm dependencies for the project are misconfigured (see `First-time setup`) or because of non-deterministic race conditions caused by quirks of the networking stack. 

## Spinning up the stack locally

### To start the API: 
```
$ cd storeshare_api
$ rails s
```
Server will be live at `localhost:8080` (do not try to reconfigure the port number.)

### To start the react app: 
```
$ cd storeshare-frontend
$ npm start
```
App will be live at `localhost:3000`

## Stack versioning
API relies on: 
- Ruby 3.1.2
- Rails 7.0.4

Frontend app requires Node.js and NPM to be available on the system. 

The easiest way to manage your ruby version is using `rbenv`:

https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-macos

