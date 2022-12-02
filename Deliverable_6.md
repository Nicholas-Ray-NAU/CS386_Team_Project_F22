# Introduction
We aim to address the problem that there is a lack of convenient and inclusive ways to game with other gamers. The Impact of this is a disconnected group of gamers. For gamers who need an online platform to connect with others, GameyTime will be an online gaming platform that is an extremely convenient method for connecting with other gamers. Unlike other platforms that require you to download extra software or create an online account, our product will make it easier and faster for all gamers to game together. We will deliver a fast, easy-to-navigate, and efficient browser-based gaming website that will include a wide variety of games for free. The website is easily accessible by any type of person of any age and will allow multiple people to quickly connect and play together online. Our intended audience/consumer is casual gamers of any age who also have access to an internet connection and are looking to play a casual game with someone else online.

Users will connect to the website by inputting the link www.gameytime.me into a browser. Users will have the option to create a profile on the website which will store the user rankings, games ratings, and achievements, or create a temporary username to quickly play any game offered by our site. Users will select a single game lobby to join from a variety of possible games, which will include tic-tac-toe, checkers, mancala, and other tabletop games. Once a user selects a game lobby, they will be placed into a queue. Users will wait in a game specific queue until they can be paired with the appropriate number of players needed. Users have the option to send a message through the use of an in-game chat, by typing any string into the chat box. In-game chat will be moderated to ensure a clean dialog between users. Users with a profile will able to look at their game statistics and aquired achievements. The landing page will display a leaderboard containing rankings from other users with profiles. The user interface will be simple and clean.

[Github Repository](https://github.com/Nicholas-Ray-NAU/CS386_Team_Project_F22)

# Implemented requirements
List in this section, the requirements and associated pull request that you implemented for this release, following the example below---include the description of the requirement, link to the issue,  a link to the pull request(s) that implement the requirement, who implemented the requirement, who approved it, and a print screen that depicts the implemented feature (if applicable). Order the requirements by the name of the student who implemented them.

We expect that you implement/prototype the features you specified in your MVP (c.f. D.2 Requirements). We expect that all the members of the group have been involved in some programming activities and report here several pull requests. 

Remember that all source code should be submitted by means of pull requests and the quality assurance person in the team should review and approve each pull request. For more information about pull requests:
https://help.github.com/articles/about-pull-requests/  

Grading criteria (20 points): This section will be evaluated in terms of correctness, completeness, thoroughness, consistency, coherence, adequate use of language, and amount of work put into the implementation. Students can receive different grades depending on their involvement. It is expected that all members contribute with non-trivial implementation. All pull requests should be approved and integrated by the quality assurance person. You should follow an adequate workflow (description of the requirement on the issue tracker, submission of the implemented requirement as a pull request, and review of the pull request by another developer). 

# Tests
You should implement automated tests for the features described in the previous subsection. Provide the following information:

- Test framework you used to develop your tests (e.g., JUnit, unittest, pytest, etc.):
- Link to your GitHub folder where your automated unit tests are located.
- An example of a test case. Include in your answer a GitHub link to the class being tested and to the test.
- A print screen showing the result of the automated tests execution. 

Grading criteria (3 points): You should have an adequate number of automated tests. They should be well written and match the features implemented in the aforementioned pull requests.

# Demo
Include a link to a video showing the system working.

Grading criteria (10 points): This section will be graded based on the quality of the video and on the evidence that the features are running as expected. Additional criteria are the relevance of the demonstrated functionalities, the correctness of the functionalities, and quality of the developed system from the external point of view (user interface).

# Code quality
During the development of the second release of our product, we adopted various solutions we learned throughout the production of the project, primarily the SOLID and DRY principles. DRY in particular helped us improve the efficiency of our code by preventing redundancy through useless repetition of code which could otherwise be implemented modularly. Furthermore, we decided to continue to use the concept of modularity throughout the project, in this instance adopting the dependency inversion principle, which prevents high level modules from entirely relying on lower level modules and instead abstracting code into modular parts which are able to be reused more easily. Another example of our use of SOLID comes in the use of an interface which allows our users to have different options rather than a general user interface that attempts to accommodate all possible options a user might have. More specifically, we used the interface segregation principle, which provides our users the option to sign in and create a profile, or play without the hassle of having to sign in. Both of these options are handled differently, and thus require our interface to adapt to these possible circumstances. 

# Lessons Learned
In the process of implementing this D6, our team was able to experience users matching one game and storing user information through lobbying. The process of continuously storing the user's information on the website so that the session can be maintained was difficult because it was the first time for all the team members. However, we were able to overcome the difficulties through good discussions.
In this release, the same code was often modified jointly, and it was important to maintain mutual conventions well due to the more complex code.
