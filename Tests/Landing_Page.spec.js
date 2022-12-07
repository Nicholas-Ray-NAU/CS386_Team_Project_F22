// @ts-check
const { test, expect } = require('@playwright/test');
const playwright = require("playwright-core");

test.describe('Landing Page runs as expected', () => {

    //Connect to site
    test('Verify site behavior', async ({ page }) => {
        
        //send site actor to webpage, verify arival
        await page.goto('http://www.gameytime.me:3000');
        await expect(page).toHaveTitle(/GameyTime/);
        
        //Verify Home link behavior
        await page.getByRole('link', { name: 'Home' }).click();
        await expect(page).toHaveURL('http://www.gameytime.me:3000/index.html');
        
        //Verify Login Link behavior
        await page.getByRole('link', { name: 'Login' }).click();
        await expect(page).toHaveURL(/.*login.html/);
        await page.goto('http://www.gameytime.me:3000');
        
        //define how to handle prompt box
        page.on('dialog', async (dialog) => {
            await expect(dialog.message()).toEqual('Please Enter A Username')
            await dialog.accept('player')
            })

        //Verify TTT image behavior
        await page.getByRole('img', { name: 'goTicTacToe' }).click();
        await page.goto('http://www.gameytime.me:3000');
        
        //Verify Mancala image behavior
        await page.getByRole('img', { name: 'goMancala' }).click();
        await page.goto('http://www.gameytime.me:3000');
    });
});
