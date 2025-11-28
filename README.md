<h1>Automation-Playwright-BondarAcademy</h1>
A fully automated end-to-end testing framework for https://conduit.bondaracademy.com, built using Playwright, TypeScript, and Faker for randomized test data. This project covers UI, API, and end-to-end workflows with modular, reusable test components, including article management, user settings, and authentication workflows.
Table of Contents

<h2>Project Overview</h2>

* This automation framework is designed to test the Conduit blogging platform for:
* User authentication and profile management
* Article creation, editing, deletion, and validation
* UI navigation and component verification
* Tag filtering and article API interaction
* Positive and negative test scenarios
* It integrates Playwright test runner for browser automation, TypeScript for type safety, and Faker to generate dynamic/randomized test data.

<h2>Key Features</h2>

* Cross-browser testing: Supports Chromium, Firefox, and WebKit
* API integration: Create articles and interact with backend directly using API
* UI Validation: Automated verification of navigation bars, article details, and settings
* Data-driven tests: Randomized articles, usernames, emails, and passwords
* Negative testing: Handles invalid inputs and error scenarios
* Session management: Saves authentication state to avoid repeated login

<h2>Project Structure</h2>

```
Automation-Playwright-BondarAcademy/
│
├─ pages/                 # Page Object Model classes
│  ├─ base-page.ts        # Generic page utilities (navigation, element handling)
│  ├─ UI-check.ts         # Navbar and UI element validations
│  ├─ new-article.ts      # Article creation, update, deletion
│  ├─ filter-settings.ts  # User profile settings and tag filtering
│  └─ save-auth.ts        # Login and save authentication state
│
├─ utils/                 # Utility scripts
│  ├─ testData.ts         # Test configuration and data
│  ├─ random-data.ts      # Random data generation using Faker
│  └─ api-client.ts       # API helper for article management
│
├─ tests/                 # Test suites
│  └─ conduit.spec.ts     # End-to-end and API tests
│
├─ playwright.config.ts   # Playwright configuration
├─ package.json           # Node dependencies
└─ README.md
```

<h2>Test Scenarios</h2>

UI Tests

* Verify navigation bar elements: Home, New Article, Settings, Profile picture
* Create new articles with randomized titles, body, description, and tags
* Validate article details post-creation
* Update and delete articles
* Filter articles by tags

API Tests

* Create articles via API (APIClient.createArticle)
* Integrate API-created articles with UI tests for update/delete

Negative Tests

* Article creation with empty mandatory fields
* Updating profile with invalid/too-long URLs

<h2>Utilities & Helpers</h2>

* BasePage: Core utilities for navigation, typing text, and element retrieval
* UICheck: Validates page components and article details
* newArticle: Handles article creation, editing, deletion
* filterSettings: Manages user profile updates and tag filtering
* APIClient: API interaction for creating articles directly via backend
* loginAndSaveAuth: Saves authentication state for re-use across tests
