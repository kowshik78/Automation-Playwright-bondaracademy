import { Locator, Page, expect } from "@playwright/test";
import BasePage from "./base-page";
import config from "../utils/testData";

export class newArticle extends BasePage{
    constructor(page:Page)
    {super(page);}
    
    async navigation(url: string) {await this.navigateTo(url);}
    async createDetails(createTitle:string,createDesc:string,createBody:string,createTags?:string|string[],  expectNavigation = true) {
        
        await this.typeText('input[formcontrolname="title"]',createTitle);
        await this.typeText('input[formcontrolname="description"]',createDesc);
        await this.typeText('textarea[formcontrolname="body"]',createBody);

        if(createTags){
            const tagsArr = Array.isArray(createTags)? createTags: [createTags];
            const perTag = this.page.locator('input[placeholder="Enter tags"]');
            for (const tag of tagsArr){
                await perTag.fill(tag);
                await perTag.press('Enter');
            }
        }
        await this.page.locator('button', { hasText: 'Publish Article' }).click();
        if (expectNavigation) {
            await this.page.waitForURL('**/article/**',{waitUntil:'networkidle'});
        }
        const itemUrl = this.page.url();
        return {itemUrl,createTitle,createBody,createTags};
    }

    async update(){
        const updateButton = this.page.locator('a',{hasText: /Edit Article/i}).first();
        await updateButton.click();
        await this.page.waitForURL('**/article/**',{waitUntil:'networkidle'});
    }
    async delete(){
        const deleteButton = this.page.locator('button', {hasText: /Delete Article/i }).first();
        await deleteButton.click();
        await this.page.waitForURL(config.urls.homePage);
    }
    async errorMessgae(){
        const titleError = this.page.locator('ul.error-messages li');
        return await titleError.textContent();
    }
}