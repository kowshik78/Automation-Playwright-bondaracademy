import { expect, Locator, Page } from "@playwright/test";
export default class BasePage {
  protected page: Page;
  constructor(page: Page) {
	this.page = page;
  }
  
async navigateTo(url: string) {
    await this.page.goto(url, {timeout: 60000});
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('networkidle');
}
async typeText(selector: string, text: string) {
  const input = this.page.locator(selector);
    await input.waitFor({ state: 'visible', timeout: 20000 });
    if (!(await input.isEnabled())) {
        throw new Error(`Input ${selector} is not enabled`);
    }
  await input.fill( text);
}
async getElementText(selector: string) {
    const element = this.page.locator(selector).first();
    return await element?.textContent();
}
async getElement(selector:any){
  const element = this.page.locator(selector);
  await element.waitFor({state:'visible'});
  return element;
}
}

