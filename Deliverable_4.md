# Introduction
We aim to deliver a fast, easy-to-navigate, and efficient browser-based gaming website that will offer a wide variety of games for free. The website is easily accessible for any type of person of any age and will allow multiple people to quickly connect and play together online. Our webpage will have a database that will store user account data. User accounts will have achievements, and game statistics. Games hosted on the website are open to being reviewed by the players to ensure the quality of games. Games will also have a queueing lobby so that everyone has a fair chance to play a game. In a game, users will have access to an in-game chat and game leaderboard.

# Implemented requirements
MVP

For our team project, we will be creating a simple browser-based gaming website for our MVP. It will be developed slowly, by first creating the website as a basis for our games, with this website following the first 5 functional requirements. The website will only contain 1 game, and the game and the website will be created in collaboration with all of us. Each of these requirements will be tested and validated by creating the working website first, and then having all of us, as well as some outside sources, attempt to make sure the functional requirements are satisfied by testing the website and the game. This will allow us to collect feedback on the quality of our MVP.

1. Network application to connect two or more players
2. Without Log-in / Automatic generated user profile
3. Games to play with other players
4. Simple UI / No ads
5. Be able to join specific lobby rooms


> Requirement: As a social gamer, I want an easy way to game with friends so that I can connect with them in a way I am used to.
* Issue: https://github.com/Nicholas-Ray-NAU/CS386_Team_Project_F22/issues/12
* Pull request: https://github.com/Nicholas-Ray-NAU/CS386_Team_Project_F22/pull/22
* Implemented by: Zach
* Approved by: Suji

> Requirement: As a user, I want to play games without log-in so that I can play the game without an inconvenient process.
* Issue: https://github.com/Nicholas-Ray-NAU/CS386_Team_Project_F22/issues/6
* Pull request: https://github.com/Nicholas-Ray-NAU/CS386_Team_Project_F22/pull/25
* Implemented by: Gavin
* Approved by: Suji

> Requirement: As a gamer, I want to be able to play games online so that I'm not bored.
* Issue: https://github.com/Nicholas-Ray-NAU/CS386_Team_Project_F22/issues/20
* Pull request: https://github.com/Nicholas-Ray-NAU/CS386_Team_Project_F22/pull/21
* Implemented by: Nick
* Approved by: Suji

> Requirement: As a player, I want a simple UI so that I can find my desired game fast.
* Issue: https://github.com/Nicholas-Ray-NAU/CS386_Team_Project_F22/issues/4
* Pull request: https://github.com/Nicholas-Ray-NAU/CS386_Team_Project_F22/pull/23
* Implemented by: Suji
* Approved by: Zack
* Pull request: https://github.com/Nicholas-Ray-NAU/CS386_Team_Project_F22/pull/24
* Implemented by: Christian
* Approved by: Suji



# Tests


# Adopted technologies
| Part | Technologies | Description |
|------|--------------|-------------|
| Server-host | Digital Ocean | Digital ocean is a server hosting service. We are using it as it is light-weight and can be accessed directly through ssh |                                                                                                    |   |   |
| Backend | GGame implementing - socket.io Server - express  Language: Javascript | We can implement web games with javascript library socket.io. Socket.io allows for clients to be connected and communicate through the server.  Express allows the webpages to be dynamically served to clients.  Javascript allows for dynamic html and css web pages | 
| Frontend | html css | Basic language for website |
| Testing framework | playwright | Playright is one of the test automation tools for javascript. |
| Design | Figma | Figma is one of the best tool for UI and co-working. |

# Learning/training
We all allotted time to take a look at the documentation for adopted technologies. With the documentation and personal testing, we were able to sufficiently learn the technologies and get the server up and running.

# Deployment
http://www.gameytime.me:3000/

Domain name from namecheap
Server hosting from Digital Ocean (ubuntu system)
Server is started with express in server.js
Command to start: forever start server.js

# Licensing
We Have adopted the MIT License format which grants a variety of permissions to anyone who might want to use any of our work present in the repository. This allows us to maintain an open source format, promotes the use of our work, and encourages anyone interested in software and website development to implement or review our work without much scrutiny. Lastly, while this format is incredibly liberal with its use, it does not provide any warranty from us, in addition from absolving our software from legal issues that might arise or be caused by our work.

# Readme File
https://github.com/Nicholas-Ray-NAU/CS386_Team_Project_F22/tree/main#readme

# Look & feel
We intended to create a user interface which remained as accessible as possible while also creating a cohesive aesthetic style. Simplicity and ease of use were our primary objectives, as this would in turn allow a wider variety of players to use our website. Furthermore, we tried to maintain a consistent style throughout the website, which will give our website a signature aesthetic no matter which game the user decides to play.


# Lessons learned
In the process of producing this MVP, our team was able to experience the overall work from basic website configuration to server work that allows two users to play games at the same time through the server. Each team member has different advantages, so collaboration could be carried out effectively.
In the next release, various functions will be incorporated, so we will pay more attention to co-working. In addition, branch management should be paid attention because there are cases where the same code is jointly modified.


# Demo
https://youtu.be/BAnMtcbmj3Q
