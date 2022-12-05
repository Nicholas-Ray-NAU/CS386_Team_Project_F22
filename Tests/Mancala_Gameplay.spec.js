// @ts-check
const { test, expect } = require('@playwright/test');
const playwright = require("playwright-core");

test.describe('Mancala Game runs as expected', () => {
    
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
        await playerOne.getByRole('img', { name: 'goMancala' }).click();
        await playerTwo.getByRole('img', { name: 'goMancala' }).click();
        
        //player one makes two moves
        await playerOne.locator('.row--container > div:nth-child(3)').first().click();
        await playerOne.locator('div:nth-child(4)').first().click();
        
        //player two chains three moves
        await playerTwo.locator('.row--container > div:nth-child(3)').first().click();
        await playerTwo.locator('.row--container > div:nth-child(2)').first().click();
        await playerTwo.locator('div:nth-child(4)').first().click();
        
        //player one makes one more move
        await playerOne.locator('div:nth-child(5)').first().click();
        
        //compare screenshots
        /*P1 => Score = 3 [7,0,0,1,5,5]*/
        /*P2 => Score = 3 [6,1,2,1,7,7]*/
        /*
        await expect(playerOne).toHaveScreenshot('Player_One_Mancala_TEST.png');
        await expect(playerTwo).toHaveScreenshot('Player_Two_Mancala_TEST.png');
        */
        
        //close all three browser contexts
        await context.close();
    })

});