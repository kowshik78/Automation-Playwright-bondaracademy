import { test, expect, BrowserContext, Page, chromium, firefox, webkit, request } from '@playwright/test';
import config from "../utils/testData";
import { UICheck } from "../pages/UI-check";
import { newArticle } from "../pages/new-article";
import { loginAndSaveAuth } from "../pages/save-auth";
import { APIClient } from '../utils/api-client';
import { filterSettings } from '../pages/filter-settings';

let context: BrowserContext;
let page: Page;

test.beforeAll( async ({ browserName }) => {    
    const type = browserName === 'chromium' ? chromium : browserName === 'firefox' ? firefox : webkit;
    context = await loginAndSaveAuth(type);
    page = await context.newPage();
});

test.afterAll(async () => {
    await context.close();
});

test('positive', async () => {
    const uiChecking = new UICheck(page);
    await uiChecking.navigation(config.urls.homePage);
    await uiChecking.verifyNavbarUI();

    const editor = new newArticle(page);
    await editor.navigation(config.urls.editor);
    const {itemUrl,createTitle,createBody,createTags} = await editor.createDetails(config.NewArticle.Title,config.NewArticle.About,config.NewArticle.Description,config.NewArticle.tags);
    expect (itemUrl).toContain('/article/');
    
    const itemCheck = new UICheck(page);
    const{titleText,titleBody,titleTags} = await itemCheck.DetailsCheck();
    expect(createTitle).toBe(titleText);
    expect(createBody).toBe(titleBody);
    expect(createTags).toEqual(titleTags);
});

test('Update_Delete_filter via create article API', async () => {
    const apiHelp = await APIClient.init();

    const update = new newArticle(page);
    const slug1 = await apiHelp.createArticle(config.APIArticle);
    console.log(slug1);
    await update.navigation("https://conduit.bondaracademy.com/editor/"+slug1);
    const {itemUrl,createTitle,createBody,createTags} = await update.createDetails(config.NewArticle.Title,config.NewArticle.About,config.NewArticle.Description,config.NewArticle.tags);
    expect(itemUrl).not.toBe(`https://conduit.bondaracademy.com/article/${slug1}`);
    expect(createTitle).not.toBe(config.APIArticle.Title);
    expect(createTags).not.toBe(config.APIArticle.tags);

    const del = new newArticle(page);
    const slug2 = await apiHelp.createArticle(config.APIArticle);
    await update.navigation("https://conduit.bondaracademy.com/article/"+slug2);
    await del.delete();

    const tag = new filterSettings(page);
    await tag.filterRandom();
    const settings = new filterSettings(page);
    await settings.userSettings(config.urls.settings,config.settings.url(),config.settings.username(),config.settings.bio,config.settings.email(),config.settings.newPass());   
});

test('Negative: create article with empty field', async () => {
  const negEditor = new newArticle(page);
  await negEditor.navigation(config.urls.editor);
  const { itemUrl } = await negEditor.createDetails('',config.NewArticle.About,config.NewArticle.Description, config.NewArticle.tags,false);  
  expect(itemUrl).toContain('/editor');
  const errorM = await negEditor.errorMessgae();
  expect(errorM).toBe("title can't be blank");
});

test.only('Negative: update profile with large invalid url', async () => {
  const negProfile = new filterSettings(page);
  await negProfile.userSettings(config.urls.settings,config.invalidURL,config.settings.username(),config.settings.bio,config.settings.email(),config.settings.newPass());
  expect(page.url).not.toContain('/profile/');
});

