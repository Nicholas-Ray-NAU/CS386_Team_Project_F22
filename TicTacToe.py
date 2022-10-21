import os

#initialize game arrays
gameArray = [" "," "," "," "," "," "," "," "," "]
exampleGrid = ["1","2","3","4","5","6","7","8","9"]
magicSquare = [4, 9, 2, 3, 5, 7, 8, 1, 6]

#Display the current game board
def printGameBoard(gameArray):
    #initialize index
    i = 1
    
    #Start by printing a new line
    print("\n")
    
    #create rows of the board
    for x in gameArray:
        #print the value of each spot
        print(f" {x}",end=" ")
        
        #if created all three in the row, draw a line underneath them
        if i % 3 == 0 and i < 9:
            print("\n", end= "")
            print("-----------")
            
        #seperate the numbers, & if the last line, dont print an extra seperator
        elif i != 9:
            print("|",end="")
            
        #increment the index
        i = i + 1
    
        
#get all possible subsets of a set of numbers
def subsets(numbers):
    if numbers == []:
        return [[]]
    x = subsets(numbers[1:])    
    #concatenates arrays
    return x + [[numbers[0]] + y for y in x]
 
    
#find all subsets of length 3 from a given set of numnbers
def subsetsLength3(numbers):
    #initialize subset array
    subsetsSize3 = []
    #if size 3, put into array
    for x in subsets(numbers):
        if len(x) == 3:
           subsetsSize3.append(x)
    #return all sets of length 3
    return subsetsSize3
        
        
#check to see if either player won
def checkForWin(markerPositions):
    # for each player
    for player in range(2):
        #empty the index list
        magicList = []
        
        #get the magic numbers for each player marker
        for i in markerPositions[player]:
            magicList.append(magicSquare[i-1])
            
        #find all subsets of length 3 for that players magic magic numbers
        magicList = subsetsLength3(magicList)
        
        #check to see if either player won
        #a player wins if 3 of their magic numbers adds up to 15 exactly
        for x in magicList:
            #check if O's win
            if sum(x) % 15 == 0 and player == 0:
                print("\n\nO's Win!")
                raise SystemExit()
                
            #check if X's win
            elif sum(x) % 15 == 0 and player == 1:
                print("\n\nX's Win!")
                raise SystemExit()
    
        
    
    
#################### Main Program ########################
        
#initialize turn countand choice variable
turn = 1
choice = 0
#intialize the double array for each players marker positions
markerPositions = [[],[]]

#clear the console
os.system('cls')

#print the example array first
printGameBoard(exampleGrid)

# main program
while turn <= len(gameArray): 

    #if turn divisible by 2, then it is O's turn, otherwise X's turn
    if turn % 2 == 0:
        player = "O"
    else:
        player = "X"
    
    #get the players input on where to put the marker
    choice = int(input(f"\n\n{player}'s choose a slot on the grid: "))
    
    #if they chose a spot already taken, make them choose a new one
    while(choice in markerPositions[0] or choice in markerPositions[1]):
        choice = int(input("Choose a spot not taken: "))
    
    #clear the console
    os.system('cls')
    
    #append the players choice to their marker array
    markerPositions[turn%2].append(choice)
    
    #Put the a marker in the spot the player chose
    gameArray[choice-1] = player
    
    #print the example array
    printGameBoard(exampleGrid)
    print("\n\n")
    
    #print the current game board
    printGameBoard(gameArray)
    
    #see if either player won
    checkForWin(markerPositions)
    
    #increment the turn count
    turn = turn + 1
    
#If no win condition is set off, game ends in a draw
print("\n\nIts a draw!")

