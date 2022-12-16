# Description
We aim to address the problem that there is a lack of convenient and inclusive ways to game with other gamers. The Impact of this is a disconnected group of gamers. For gamers who need an online platform to connect with others, GameyTime will be an online gaming platform that is an extremely convenient method for connecting with other gamers. Unlike other platforms that require you to download extra software or create an online account, our product will make it easier and faster for all gamers to game together. We will deliver a fast, easy-to-navigate, and efficient browser-based gaming website that will include a wide variety of games for free. The website is easily accessible by any type of person of any age and will allow multiple people to quickly connect and play together online. Our intended audience/consumer is casual gamers of any age who also have access to an internet connection and are looking to play a casual game with someone else online.

Users will connect to the website by inputting the link www.gameytime.me into a browser. Users will have the option to create a profile on the website which will store the user rankings, games ratings, and achievements, or create a temporary username to quickly play any game offered by our site. Users will select a single game lobby to join from a variety of possible games, which will include tic-tac-toe, checkers, mancala, and other tabletop games. Once a user selects a game lobby, they will be placed into a queue. Users will wait in a game specific queue until they can be paired with the appropriate number of players needed. Users have the option to send a message through the use of an in-game chat, by typing any string into the chat box. In-game chat will be moderated to ensure a clean dialog between users. Users with a profile will be able to look at their game statistics and acquired achievements. The landing page will display a leaderboard containing rankings from other users with profiles. The user interface will be simple and clean.

# Verification (tests)
## Unit test
#### Test framework
 - [Mocha](https://mochajs.org/)
 - Tests are located [here](website/public/login.spec.js)
#### An example of a test case that makes use of mock objects. Include in your answer a GitHub link to the class being tested and to the test.
* https://github.com/Nicholas-Ray-NAU/CS386_Team_Project_F22/blob/Deliverable07/website/public/login.js
1) If space is exist, login will be failed - loginFail Function
2) If empty data is exist, login will be failed - LoginFailEmpty Function
#### A print screen showing the result of the unit tests execution
<img width="1441" alt="image" src="https://user-images.githubusercontent.com/38903362/206126253-d5efe73e-065d-4a20-9484-9c6d7f274290.png">

## Acceptance test
### Test framework
 - [Playwright](https://playwright.dev/)
 - Tests are located [here](Tests/)

### All Tests executed
![All Tests Passing](/Images/D6_Testing_All_Passed.PNG)

#### Example code - Proper Landing Page Behavior
![Landing Page Passing Code](/Images/D6_Testing_Landing_Passed.PNG)
Landing page code is located [here](Tests/Landing_Page.spec.js)

# Validation (user evaluation)
## Questions 
#### On a scale of 1 to 10, how would you rate the layout of our application?
- Answer 1. 10
- Answer 2. I would give the overall layout a 10 out of 10. The home screen was easy to navigate. The different game screens were laid out well and the game chat was a nice feature to have.
- Answer 3. 8.5
#### On a scale of 1 to 10, how would you rate the accessibility of the website?
- Answer 1. 10
- Answer 2. I would give the accessibility a 9 out of 10, all parts of the website were easy to access, the black text on the blue background used on a couple of the screens may be difficult for some people to see.
- Answer 3. 10
#### On a scale of 1 to 10, how would you rate how easy it is to get into a game?
- Answer 1. 10
- Answer 2. I would rate the ease of accessing the games a 10 out of 10. I just had to click and wait for another player. Accessing the games was very intuitive. 
- Answer 3. 9
#### On a scale of 1 to 10, how would you rate how easy it is to create an account?
- Answer 1. 10
- Answer 2. I would rate making an account a 10 out of 10. It was easy to find the login and sign up options and the process to signup was very straightforward.
- Answer 3. 10
#### Would you play on this website again?
- Answer 1. Yes
- Answer 2. I would play on the website again, it was easy to use and the games were fun with a friend.
- Answer 3. Yes
#### Would you play on this website with your friends?
- Answer 1. Yes
- Answer 2. The website was easy to use and I would be willing to play with a friend on the website again.
- Answer 3. Yes
#### How would you rate the general aesthetic and visual design of the website?
- Answer 1. 6.5
- Answer 2. I would give the general looks and design a 9 out of 10, it has a clear  professional look. The games are designed nicely and easy to play. More color on the games could be a nice addition. 
- Answer 3. 10
#### How likely are you to use our website to play with your friends compared to similar websites? 
- Answer 1. Depends on how quick I want to game
- Answer 2. This website was more straightforward and simple than other similar websites. I enjoyed how easy it was to navigate and the overall design more than other websites.
- Answer 3. Very likely  

## Reflections

It seems that we have done a great job on this project overall. Our main goal was to make something simple and convenient, and our users that tested it seem to agree that we got it right. They all said that the convenience and accessibility of the site was one of the things we did really well. They were all able to navigate the site very easily as there is little to mislead and distract them. They all quite enjoyed the layout of the website and found it easy to use. Even when users first accessed the website, they immediately knew what to do and how to use it. Because of this simplicity and accessibility, the users used the website exactly as expected. Logging in and signing up were extremely simple and intuitive for them, and joining and playing games was very simple for them to figure out and do. Not only did they use the website as expected, but the website itself functioned as expected. There was only one notable bug that one person ran into, which was fixed shortly after. However, the one thing that the users found to be sub-par was the design of the website. One user found it boring to look at, which is a cost of simplicity and time. However, through all of this we believe that we have achieved our value proposition and have created a website that achieves the goals we initially set for it.
