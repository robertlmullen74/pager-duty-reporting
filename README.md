# Overview
This is a project for some extra pager duty reports that someone might find useful.  It has an angular front end and a node.js express backend to crunch some numbers.

## Client
### Install Dependencies

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:  

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

## Server

### Prereqs
You'll need node installed to run this app.

### Install
Switch to the api directory and install the server side code  
```
cd api
npm install
```

Now just start the server  
```
node app.js
```
You should see the console output like this:  
```
$ node app.js
Express server listening on port 3000
```

