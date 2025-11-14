import { faker } from '@faker-js/faker';

export class RandomData {
  static randomNumber(limit = 1000) {
    return Math.floor(Math.random() * limit);
  }
  static randomUrl(){return faker.internet.url();}
  static randomBio(){return faker.internet.domainName();}
  static randomMail(){return faker.internet.email();}
  static randomPassword(){return faker.person.zodiacSign();}

  static randomArticle() {
    return {
      Title: `Title-${this.randomNumber()}`,
      About: `About-${this.randomNumber()}`,
      Description: `Description-${this.randomNumber(10000)}`,
      tags: [
        `QA-${this.randomNumber()}`,
        `Playwright-${this.randomNumber()}`,
        `Automation-${this.randomNumber()}`
      ]
    };
  }
  static APIArticle() {
    return {
      Title: `APITitle-${this.randomNumber()}`,
      About: `APIAbout-${this.randomNumber()}`,
      Description: `APIDescription-${this.randomNumber(10000)}`,
      tags: [
        `APIQA-${this.randomNumber()}`,
        `APIPlaywright-${this.randomNumber()}`,
        `APIAutomation-${this.randomNumber()}`
      ]
    };
  }

}
