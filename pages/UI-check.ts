import { Locator, Page,expect } from "@playwright/test";
import BasePage from "./base-page";

export class UICheck extends BasePage{
    constructor(page:Page)
    {super(page);}

    get homeLink(): Locator {return this.page.locator('a.nav-link', { hasText: 'Home' });}
    get newArticleLink(): Locator {return this.page.locator('a.nav-link', { hasText: 'New Article' });}
    get settingsLink(): Locator {return this.page.locator('a.nav-link', { hasText: 'Settings' });}
    get userPic(): Locator {return this.page.locator('img.user-pic');}

    async getArticleTags(){
        const liCount = this.page.locator('ul.tag-list li.tag-default');
        const count = await liCount.count();
        const tags: string[] = [];
        for (let i=0; i< count; i++){
            const text = await liCount.nth(i).textContent();
            if(text) tags.push(text.trim());
        }
        return tags;
    }
    
    async navigation(url: string) {await this.navigateTo(url);}
    async verifyNavbarUI() {
        await expect(this.homeLink).toBeVisible();
        await expect(this.newArticleLink).toBeVisible();
        await expect(this.settingsLink).toBeVisible();
        await expect(this.userPic).toBeVisible();
    }
    async DetailsCheck(){
        const titleText = await this.getElementText('h1');
        const titleBody = await this.getElementText('p');
        const titleTags = await this.getArticleTags();
        return {titleText, titleBody, titleTags};
    }
}