# Gamey Time

Gamey Time is a broswer based gaming website that quickly allows two players to connect to a session of a game of their choosing!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them


#### 1. Node.js

##### Windows/Mac Installation

Visit the link below and click the windows/mac installer
```
https://nodejs.org/en/download/
```
An installer will download. Run the installer and follow the steps it gives


#### 2. Express

##### Windows/Mac Installation

In a terminal, enter this command:
```
npm install express
```


#### 3. Socket.io

##### Windows/Mac Installation
In a terminal, enter this command:
```
npm install socket.io
```


#### 4. Git

##### Windows Installation
Navigate to this link and choose the latest download for your system
```
https://git-scm.com/download/win
```
An installer will download. Run the installer and follow the steps it gives
  

##### Mac Installation
In a terminal, enter this command:
```
sudo dnf install git-all
```


### Installing

Follow these steps to get the server running on your local machine

Open a terminal on your machine and go into a directory where you want to store  
the repository, otherwise the repository will be stored in the current directory  
  
Once there, and enter this command:
```
git clone https://github.com/Nicholas-Ray-NAU/CS386_Team_Project_F22
```
The repository is now on your device!  
Now move into the repository with this command:
```
cd CS386_Team_Project_F22
```
Now make your current directory the website directory with this command:
```
cd Website
```
You are now in the server directory! Feel free to move this wesbite directory into any location on your device.
To run the server on your machine, you must be in the directory and enter this command:
```
node server.js
```
The server should now be running on your local machine!
To enter the server, open any browser of your choice and enter this URL:
```
http://localhost:3000
```
You can now freely test the webpage!


## Running the tests

For our project we are using [Playwright](https://playwright.dev/) to implement our automated testing. To prepare the tests to run, download [testing.js](tests/testing.js) into the ~/tests folder in the root directory that you installed Playwright into. To run the tests, run the following command:
```
npx playwright test --project=chromium
```
The tests should take approximately 10 seconds to run. After the tests finish execution, a *.HTML report will be generated with test details. To view this file, run the following command:
```
npx playwright show-report
```

### Test execution

The current test file for the 1.0.0 deployment performs 3 tasks. The first tests the custom socketing framework. It first defines the browser context and then opens 3 different tabs. The first 2 clients are players that interact together on a shared page. The third client is a mock client that is expected to be rejected/redirected. 
![MVP testing Part 1](/Images/D4_testing_pt1.PNG)

The second test plays a simulated game by initiating a series of clicks at given locations across the screen. This is acheiveable since Playwright uses a fixed viewbox size for each browser instance.
![MVP testing Part 2](/Images/D4_testing_pt2.PNG)

The final test checks that the winner and looser are correctly assigned by scanning the page for the win/lose text box that will appear after a win condition is met.
![MVP testing Part 3](/Images/D4_testing_pt3.PNG)

### Final test state
#### Player One
![Player One Final State](/Images/D4_playerOne_Complete.png)
#### Player Two
![Player One Final State](/Images/D4_playerOne_Complete.png)

## Deployment

To deploy an on an actual server, you must already have a live server, and you must install all previous dependancies listed.
Once the dependancies are installed, simply file transfer the wesbite folder into the server, move into the wesbite directory,
and type
```
node server.js
```
and the server will be up and running!
  
  
## Built With

* [Node.js](https://nodejs.org/en/) - Packet Manager/Allows Javascript to run
* [Socket.io](https://socket.io/) - Used for network communication
* [Express](https://expressjs.com/) - Web framework used

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We are currently in version 1.0.0

## Authors

-Gavin Russell  
-Suji Baek  
-Zachary Hellemeyer  
-Nick Ray  
-Cristian Marrufo  

## License

This project is licensed under the MIT License - please see the [LICENSE.md](LICENSE.md) file for details
