// @ts-check
const { test, expect } = require('@playwright/test');
const playwright = require("playwright-core");

/*
Data Cell coordinates (x,y => 0,0 in top left of page)
    {
        (300,300)  (400,300)  (500,300)
        
        (300,400)  (400,400)  (500,400)
        
        (300,500)  (400,500)  (500,500)
    }
*/

test.describe('Tic Tac Toe Game runs as expected', () => {
    
    //Connect to site
    test('Verify gameplay behavior', async () => {
        
        //initialize browser context (only chromium based browsers for now)
        const browser = await playwright.chromium.launch();
        const context = await browser.newContext();
        
        //load game play clients
        const playerOne = await context.newPage();
        const playerTwo = await context.newPage();
        
        //all pages travel to website
        await playerOne.goto('http://www.gameytime.me:3000');
        await playerTwo.goto('http://www.gameytime.me:3000');
        
        //define what each player must do on a dialog box (Username)
        playerOne.on('dialog', async (dialog) => {
            await expect(dialog.message()).toEqual('Please Enter A Username')
            await dialog.accept('Player One TESTER')
            })

        playerTwo.on('dialog', async (dialog) => {
            await expect(dialog.message()).toEqual('Please Enter A Username')
            await dialog.accept('player Two TESTER')
            })
        
        //get both players to enter TTT Queue/game
        await playerOne.getByRole('img', { name: 'goTicTacToe' }).click();
        await playerTwo.getByRole('img', { name: 'goTicTacToe' }).click();
        
        //player one locates and takes cell 0 (300,300)
        await playerOne.locator('.cell').first().click();
        
        //player two locates and takes cell 4 (400,400)
        await playerTwo.locator('div:nth-child(5)').click();    
        
        //player one locates and takes cell 8 (500,500)
        await playerOne.locator('div:nth-child(9)').click();
        
        //player two locates and takes cell 7 (400,500)
        await playerTwo.locator('div:nth-child(8)').click();
        
        //player one locates and takes cell 2 (500,300)
        await playerOne.locator('#game--container > div:nth-child(3)').click();
        
        //player two locates and takes cell 1 (400,300)
        await playerTwo.locator('#game--container > div:nth-child(2)').click();
        
        //redefine what each player must do on a dialog box (win/loss)
        playerOne.on('dialog', async (dialog) => {
            await expect(dialog.message()).toEqual('You lost!')
        })

        playerTwo.on('dialog', async (dialog) => {
            await expect(dialog.message()).toEqual('You won!')
        })
        
        //close all three browser contexts
        await context.close();
    })

});