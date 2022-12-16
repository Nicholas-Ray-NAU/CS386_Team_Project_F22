// @ts-check
const { test, expect } = require('@playwright/test');
const playwright = require("playwright-core");

test.describe('Tic Tac Toe Queue runs as expected', () => {
    
    test('Verify Loading wheel and Queue Behavior', async () => {
        
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

        //locate loading wheel (used in testing later)
        const loadingOne = playerOne.locator('id=loading');
        const loadingTwo = playerTwo.locator('id=loading');
        
        //both players dont see loading wheel
        await expect(loadingOne).toHaveClass("loading-off");
        await expect(loadingTwo).toHaveClass("loading-off");
        
        //player one joins queue, should see loading wheel
        await playerOne.getByRole('img', { name: 'goTicTacToe' }).click();
        await expect(loadingOne).toHaveClass("loading-on");
        
        //player two should not see loading wheel
        await expect(loadingTwo).toHaveClass("loading-off");
        await playerTwo.getByRole('img', { name: 'goTicTacToe' }).click();
            
        //both players should land on the game
        await expect(playerOne).toHaveURL(/.*ticTacToe.html/);
        await expect(playerTwo).toHaveURL(/.*ticTacToe.html/);
        
        //close all three browser contexts
        await context.close();
        
        })
        
});