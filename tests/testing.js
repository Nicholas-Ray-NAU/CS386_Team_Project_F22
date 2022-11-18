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

    //player one locates and takes cell 0 (300,300)
    await playerOne.mouse.click( 300, 300 );
    await page.waitForTimeout(1000);
    
    //player two locates and takes cell 4 (400,400)
    await playerTwo.mouse.click( 400, 400 );
    await page.waitForTimeout(1000);    
    
    //player one locates and takes cell 8 (500,500)
    await playerOne.mouse.click( 500, 500 );
    await page.waitForTimeout(1000);    
    
    //player two locates and takes cell 7 (400,500)
    await playerTwo.mouse.click( 400, 500 );
    await page.waitForTimeout(1000);    
    
    //player one locates and takes cell 2 (500,300)
    await playerOne.mouse.click( 500, 300 );
    await page.waitForTimeout(1000);    
    
    //player two locates and takes cell 1 (400,300)
    await playerTwo.mouse.click( 400, 300 );
    await page.waitForTimeout(1000);
    
    //test that player two receives win message - You won!
    await expect(playerTwo.getByText('You won!')).toBeVisible();
    
    //test that player one recieves lose message - You lost!
    await expect(playerOne.getByText('You lost!')).toBeVisible();
    
    //close all three browser contexts
    await context.close();
});
