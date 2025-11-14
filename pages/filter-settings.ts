import { Locator, Page, expect } from "@playwright/test";
import BasePage from "./base-page";

export class filterSettings extends BasePage{
    constructor(page:Page)
    {super(page);}
    
    async navigation(url: string) {await this.navigateTo(url);}
    
    async filterRandom() {
        const tags = this.page.locator('.tag-list a.tag-default');
        const tag =  tags.last();
        const tagText = await tags.last().textContent();
        await tag.click();
        
        const selectedTag = this.page.locator('a.nav-link.active').last();
        await expect(selectedTag).toBeVisible();
        const selectedTagText = await selectedTag.textContent();
        expect(selectedTagText).toBe(tagText);
        await selectedTag.click();
        
    }

    async userSettings(url:string,pictureUrl:string,username:string,bio:string,email:string,password:string){
        await this.navigateTo(url);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.fill('input[placeholder="URL of profile picture"]',pictureUrl);
        await this.page.fill('input[placeholder="Username"]',username);
        await this.page.fill('textarea[placeholder="Short bio about you"]',bio);
        await this.page.fill('input[placeholder="Email"]',email);
        await this.page.fill('input[placeholder="New Password"]',password);
        await this.page.locator('button[type="submit"]').click();
    }
}