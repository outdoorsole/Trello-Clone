#To-Do-ulate ('Trello' clone using MEAN Framework)
<img src='http://i.imgur.com/5z0Uo6l.jpg' title='To-Do-ulate homepage' width='' alt='To-Do-ulate homepage' />

## Original Source:
https://trello.com/

## Overview
To-Do-ulate (word play on "Tabulate") was created as a learning project based on Trello, an existing free web product management tool created by Avram Joel Spolsky. Trello allows individuals and groups to organize projects, lists and tasks in a visual way, using a kanban model to display and set up the process.


This project was built using MEAN (a fullstack JavaScript framework), which includes several pre-packaged bundled modules for building applications.

## Required Technologies
Please download and install the following applications:
* [NodeJS](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.org/downloads#production) 

## How to Install:

### Step 1
Install Nodejs for your particular operating system:
https://nodejs.org/en/download/


```
npm install
bower install
```


Clone this repository with the following link
* Using SSH: [git@github.com:outdoorsole/Trello-Clone.git](git@github.com:outdoorsole/Trello-Clone.git)
* Using HTTPS: [https://github.com/outdoorsole/Trello-Clone.git](https://github.com/outdoorsole/Trello-Clone.git)

### Step 2
* Navigate to the folder where the files are saved and run the 'npm install' command in the terminal prompt. Afterwards, use 'bower install' to download the Angular depencencies.


## Getting Started (Running the Application)

In a terminal window, navigate to the root of the project folder. Open up two new tabs (3 terminal tabs open) from this current location. You will need to keep all 3 of the following applications to run the todo app.
Mongo: Type 'mongod' (to start the database)
Node: Navigate into the 'expressApp' folder and type 'node app' (this will connect the server API session)
Gulp: Navigate into the 'angularApp' folder and type 'gulp serve' (this will run the client angular session)

When running Gulp, it Browsersync will automatically open up a new browser window that will launch the application. In the case that this does not occur, type in http://localhost:3001/ to view the application.

## Board Preview
<img src='http://i.imgur.com/i9Dwhsi.jpg' title='To-Do-ulate homepage' width='' alt='To-Do-ulate homepage' />

=====================
### MIT License
Copyright © `<2016>` `<Maribel Montejano>`

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
