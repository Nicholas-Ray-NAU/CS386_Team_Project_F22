// @ts-check
const { test, expect } = require('@playwright/test');
const playwright = require("playwright-core");

/*
Sample gameboard coordinates
    {
        A3  B3  C3
        
        A2  B2  C2
        
        A1  B1  C1
    }
*/

test('Website works as intended for release 1.0.0', async ({ page }) => {
    
    //initialize browser context (only chromium based browsers for now)
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    
    //load game play clients
    const playerOne = await context.newPage();
    const playerTwo = await context.newPage();
    
    //load rejected client
    const rejectedPlayer = await context.newPage();
    
    //all pages travel to website
    await playerOne.goto('http://www.gameytime.me:3000');
    await playerTwo.goto('http://www.gameytime.me:3000');
    await rejectedPlayer.goto('http://www.gameytime.me:3000');
    
    //test that the third client is rejected
    await expect(rejectedPlayer).toHaveTitle(/Rejected Game Access/);
    await expect(rejectedPlayer).toHaveURL(/.*rejectPage/);
    
    /*https://playwright.dev/docs/locators*/
    
    //player one locates and takes A3
    
    //player two locates and takes B2
    
    //player one locates and takes C1
    
    //player two locates and takes C3
    
    //player one locates and takes B1
    
    //player two locates and takes A1
    
    /*https://playwright.dev/docs/pages#handling-popups*/
    
    //test that player two receives win message
    
    //test that player one recieves lose message
    
});
