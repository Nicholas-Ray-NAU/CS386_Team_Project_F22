// @ts-check
const { test, expect } = require('@playwright/test');
const playwright = require("playwright-core");

test.describe('Mancala Chat performs as expected', () => {
    
    //Connect to site
    test('Verify chat behavior', async () => {
        
        //define variables for testing
        const TEST_MESSAGE_ONE = 'the quick brown fox jumped over the lazy dog !@#$%^&*()_+1234567890-=';
        const TEST_MESSAGE_TWO = 'While making deep excavations, we found some quaint bronze jewelry <>?:"{}|,./;]\\\'';
        const TESTER_NAME_ONE = 'Player One TESTER';
        const TESTER_NAME_TWO = 'Player Two TESTER';
        const TEST_MSG_RECV_ONE = TESTER_NAME_ONE + ': ' + TEST_MESSAGE_ONE;
        const TEST_MSG_RECV_TWO = TESTER_NAME_TWO + ': ' + TEST_MESSAGE_TWO;
        
        //initialize browser context (only chromium based browsers for now)
        const browser = await playwright.chromium.launch();
        const context = await browser.newContext();
        
        //load player one into the game
        const playerOne = await context.newPage();
        await playerOne.goto('http://www.gameytime.me:3000');
        
        playerOne.on('dialog', async (dialog) => {
            await expect(dialog.message()).toEqual('Please Enter A Username')
            await dialog.accept(TESTER_NAME_ONE)
            })

        await playerOne.getByRole('img', { name: 'goMancala' }).click();
        
        //load player two into the game
        const playerTwo = await context.newPage();
        await playerTwo.goto('http://www.gameytime.me:3000');
        
        playerTwo.on('dialog', async (dialog) => {
            await expect(dialog.message()).toEqual('Please Enter A Username')
            await dialog.accept(TESTER_NAME_TWO)
            })
        
        await playerTwo.getByRole('img', { name: 'goMancala' }).click();
        
        //player one writes message, player two recives
        await playerOne.getByPlaceholder('Type a message...').fill(TEST_MESSAGE_ONE);
        await playerOne.keyboard.press('Enter');
        //await playerTwo.waitForTimeout(4000);
        //await expect(playerTwo.locator('id=chat-messages').last()).toHaveText(TEST_MSG_RECV_ONE);
        
        //player two writes response, player one recieves
        await playerTwo.getByPlaceholder('Type a message...').fill(TEST_MESSAGE_TWO);
        await playerOne.keyboard.press('Enter');
        //await playerOne.waitForTimeout(4000);
        //await expect(playerOne.locator('id=chat-messages').last()).toHaveText(TEST_MSG_RECV_TWO);

        //close all three browser contexts
        await context.close();
        
        })
        
});