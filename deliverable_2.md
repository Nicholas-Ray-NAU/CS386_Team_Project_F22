# Positioning
##    Problem Statement
|||
| -------------- | ---------------------- |
| The Problem Of | A lack of convenient and inclusive ways to game with others |
| Affects | Gamers |
| The Impact of Which is | A disconnected group of gamers |

"The problem of lack of convenient and inclusive ways to game with others affects gamers. The Impact of Which is a disconnected group of gamers."

##    Product Position Statement
|||
| -------------- | ---------------------- |
| For | Gamers |
| Who | Need an online platform to connect with others |
| The (Product Name) | GameyTime is an online gaming platform |
| That | Is an extremely convenient way to connect with other gamers |
| Unlike | Other platfroms that require you to download extra software or create an online account |
| Our Product | Will make it easier and faster for all gamers to game together  |

"For gamers who need an online platform to connect with others, GameyTime is an online gaming platform that is an extremely convenient way to connect with other gamers: unlike other platforms that require you to download extra software or create an online account, our product will make it easier and faster for all gamers to game together."

##    Value Proposition and Consumer Segment
   We aim to deliver a fast, easy to navigate and efficient browser-based gaming website that will offer a wide variety of games for free. The website is easily accessible for any type of person of any age and will allow multiple people to quickly connect and play together online. Our intended audience/consumer is casual gamers of any age who also have access to an internet connection and are looking to play a casual game with someone else online.

# Stakeholders
1. Front end Developers - Front end developers are responsible for the aesthetics and UI of the gaming website
2. Back end Developers - Back end developers are responsible for creating the games as well as corresponding network application to connect clients
3. Testers - Testers are responsible to find bugs, glitches, and exploits on the website
4. Players - Users that only play games on the website
5. Competitors - Free Games Max, Addicting Games, io games, cool math games 

# Functional Requirements (Features)
1. Network application to connect two or more players
2. Without Log-in / Automatic generated user profile
3. Games to play with other players
4. Simple UI / No ads
5. Be able to join specific lobby rooms
6. Preset communication between players 
7. Synchronize games between players
8. Random selection of players
9. Gamer’s leaderboard
10. Tier-based matching
11. End of game summary

# Non-Functional Requirements
1. Usability - The UI will be simple and clear. Users are able to find their end goal within 30 seconds.
2. Speed - 8 out of 10 users are satisfied with the speed. The game response speed for each user should be limited in variance and little latency. 
3. Performance - Receives at least all B’s from web page test (https://www.webpagetest.org/)
3. Security - Account will be secured with passwords encrypted and communication between players will be client-server architecture.
4. Accessibility - 8 out of 10 users are satisfied with the website UI. UI will have high contrast to help all users to navigate the website.
5. Readability - Program will be commented on for every functional unit.
6. Reliability -  Website will be accessible to at least 8 out of 10 users at any time.

# MVP (Minimum Viable Product)
For our team project, we will be creating a simple browser-based gaming website for our MVP. It will be developed slowly, by first creating the website as a basis for our games, with this website following the first 5 functional requirements. The website will only contain 1 game, and the game and the website will be created in collaboration with all of us. Each of these requirements will be tested and validated by creating the working website first, and then having all of us, as well as some outside sources, attempt to make sure the functional requirements are satisfied by testing the website and the game. This will allow us to collect feedback on the quality of our MVP.

# Use Cases
##    Use Case Diagram
![This is a use case diagram png](/Images/GameyTime_-_Use_case.png)
##    Use case descriptions and interface sketch
**Use Case**: User Selects a game lobby/game to play
**Actor**: User
**Description**: User will select a single game lobby to join from a variety of possible lobbies
**Preconditions**: User is connected to server
**Postconditions**: User will be placed into selected game lobby queue
**Main Flow**:
1. User will be placed into game queue
2. User will wait for game to start
**Alternative Flow**:
None
![This is a use case diagram png](/Images/UseCaseNick.png)

**Use Case**: Create an account
**Actor**: User
**Description**: Create an account to the website which will store the user rankings and scores ( this will be optional ) 
**Preconditions**: The user has access to the internet 
**Postconditions**: The user selects  the option to create 
**Main Flow**:
1. The user connects to the website
2. Select the option to make an account
**Alternative Flow**:
2b. The user declines the option to make an account
![This is a use case diagram png](/Images/ChristianUseCase.png)

**Use Case**: Connect to Website
**Actor**: Player 
**Description**: Player connects to website via browser
**Preconditions**: Player has a device with a browser
**Postconditions**: Player is connected to the website
**Main Flow**:
1. Player connects to the website by inputting the link www.gameytime.xyz (link tentative to change) to a browser. 
2. User browses webpage
**Alternative Flow**:
None
![This is a use case diagram png](/Images/zachUseCase.png)

**Use Case**: Connect with other players
**Actor**: User 
**Description**: User will enter the game, and play a game with another connected player.
**Preconditions**: User has already selected the game that the user wants to play. The user is already waiting for the match with another user to play with.
**Postconditions**: User will play the game with another online user 
**Main Flow**:
1. Users start to play the game with matched user
2. Once the game is finished, users can choose to play once again or exit the game.
**Alternative Flow**: 
 If the other person terminates the connection during the game, you must wait until the other person reconnects.
 ![This is a use case diagram png](/Images/SujiTicTacToe.png)
 
 
**Use Case**: Communicate With Other Players
**Actor**: User 
**Description**: User sends a message selected from a list of pre-created messages chosen by the website creators to the other user they are connected on the game server with.
**Preconditions**: Both users are connected to the game website server
**Postconditions**: The message is read by the receiving user
**Main Flow**:
1. The server shows the user what available messages there are to send
2. The user chooses the message to send to the other user
3. The user sends the message
4. The server sends the message to the other user
5. The other user receives the message
![This is a use case diagram png](/Images/GavinUseCase.png)

# User Stories
## Highest Priority is Largest Value
### Nick:
- As a gamer, I want easy access so that I waste less time with credentials. (Priority #)
- As a parent, I want safe chats so that children aren’t exposed to violent users. (Priority #)

### Cristian:
- As a user, I want to create an account so that I can access my scores and rankings easily.
- As a player, I want to communicate with my opponent so that they are aware of what I have to say.

### Gavin:
- As a social gamer, I want an easy way to game with friends so that I can connect with them in a way I am used to.
- As an impatient person, I want my technology to run efficiently so that I do not have to wait long.

### Zachary:
- As a player, I want a simple UI so that I can find my desired game fast.
- As a front-end developer, I want a html template so that the style of the website is consistent.

### Suji:
As a user, I want to play games without log-in so that I can play the game without an inconvenient process.
As a user, I want to check the ranking for the game so that I can know who is the best player.

# Issue Tracker
## GitHub
https://github.com/Nicholas-Ray-NAU/CS386_Team_Project_F22/issues
![This is a use case diagram png](/Images/IssueTrackerImage.png)
