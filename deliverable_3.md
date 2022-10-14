# System Description

   The problem of lack of convenient and inclusive ways to game with others affects gamers. The Impact of which is a disconnected group of gamers. For gamers who need an online platform to connect with others, GameyTime is an online gaming platform that is an extremely convenient way to connect with other gamers: unlike other platforms that require you to download extra software or create an online account, our product will make it easier and faster for all gamers to game together. We aim to deliver a fast, easy to navigate and efficient browser-based gaming website that will offer a wide variety of games for free. The website is easily accessible for any type of person of any age and will allow multiple people to quickly connect and play together online. Our intended audience/consumer is casual gamers of any age who also have access to an internet connection and are looking to play a casual game with someone else online.

   **Users** *connect* to the website by inputting the link www.gameytime.xyz (link tentative to change) to a browser. **Users** have the option to <ins>create</ins> a *profile* to the website which will <ins>store</ins> the user *rankings*, **games ratings**, and **achievements**. **Users** will <ins>select</ins> a single game **lobby** to join from a variety of possible **games**, which may include **tic-tac-toe**, **checkers**, and **mancala**. **Users** will enter the **game**, and <ins>play</ins> a **game** with another connected **user**. **Users** have the option to <ins>send</ins> a **message** through the use of an **in-game chat**, by <ins>selecting</ins> from a list of *pre-created messages* chosen by the website creators. **Users** are able to look at their *statistics* if they have registered a *profile* in addition to a **leaderboard** containing *rankings* from other **users**. User interface will be simple and clean.

# Model
![This is a UML case diagram png](/Images/GameyTime_-_UML_Diagram.png)

## User:
- The User Class is responsible for keeping track of a given user's personal information, including contact and authentication data.
- It is included because it allows the necessary information pertaining to score information and to be stored in a single class, and managed easily from the backend.
- It helps meet the system requirements because it enables personalization of rating of the game.

## Leaderboard:
- The Leaderboard class is responsible for storing the user's score information for each game and creating and maintaining the ranking for each game accordingly.
- It is included because it allows the users to save the rank of each game which is also including the userName and date.
- It is automatically updated by the operating system when the user gets the new best score.

## Achievement: 

- The achievement class achievements accomplished by the user for certain games.
- It was included, as it ensures certain feats performed by the user are not forgotten, and thus stored within the user’s profile.
- It encourages the user to continue to use the website in the future in order to collect as many achievements as they can.

## In-game Chat:

- The in-game chat class is responsible for allowing users to communicate with each other while playing together.
- It was included as it allows users to express themselves to other users in a limited capacity which prevents any form of harassment. 
- It enables users to further connect to the gaming experience and encourages a competitive aspect while playing.

## Games:

- The games class contains all possible games which have the potential to be included in the website and in turn the possible games a user can play.
- It allows certain game information to be stored within the user’s profile.
- It enables the user to play games on our website in addition to having access to certain features.

### Game1(Tic-ta-toe): Games subclass
### Game2(Checkers): Games subclass
### Game3(Mancala): Games subclass 


## Game Rating: 

- This class is responsible for storing a rating set by the user after each game.
- This was included as it allows the users to express their opinions on a certain game and rate their experience. 
- This feature enables us to determine which games are popular and what users think of their experience with our website.

## Lobby:

- The game lobby is responsible for containing all possible games the user can choose from.
- It was included since it allows users to preview the games they are able to play, and then select a game to play with other users.
- This enables a simple and clear way to select games and prevents confusion from the user after selecting any of the possible games in the website. 

