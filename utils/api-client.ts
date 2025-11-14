// utils/apiHelper.ts
import { APIRequestContext, request } from '@playwright/test';
import config from './testData';

export class APIClient {
  private requestContext: APIRequestContext;
  
  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }
  
  // Initialize API client with baseURL and auth headers
  static async init() {
    const requestContext = await request.newContext({
      baseURL: config.urls.API_URL,  // use baseURL here
      extraHTTPHeaders: {
        Authorization: `Token ${config.credentials.Token}`,
        'Content-Type': 'application/json',
      },
    });
    return new APIClient(requestContext);
  }

  // Create a new article via API
  async createArticle(dataSet: any) {
    const data = {
      article: {
        title: dataSet.Title,
        description: dataSet.About,
        body: dataSet.Description,
        tagList: dataSet.tags,
      },
    };

    const response = await this.requestContext.post('/api/articles/', { data });
    const body = await response.json();

    if (!response.ok() || !body.article) {
      throw new Error('Failed to create article');
    }

    return body.article.slug;
  }
}
