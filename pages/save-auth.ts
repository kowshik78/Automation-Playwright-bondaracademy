import config from "../utils/testData.js";
import { BrowserType } from "@playwright/test";

export const loginAndSaveAuth = async (browserType: BrowserType) => {
        const browser = await browserType.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(config.urls.homePage);
        await page.click('text=Sign in');
        await page.fill('input[placeholder="Email"]', config.credentials.username);
        await page.fill('input[placeholder="Password"]', config.credentials.password);
        await page.click('button[type="submit"]');
        
        await page.waitForSelector('a.nav-link[href^="/profile/"]', { timeout: 10000 });
        await context.storageState({ path: './utils/auth.json' });
        console.log("Auth state saved");
        await page.close();
        return context;
      }
