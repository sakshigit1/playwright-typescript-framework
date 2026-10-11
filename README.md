# Playwright TypeScript Framework

A hybrid test automation framework built with **Playwright** and **TypeScript**, using the **Page Object Model (POM)** design pattern. Tests run against [SauceDemo](https://www.saucedemo.com) and are integrated with **GitHub Actions** for CI.

## Tech Stack

- Playwright Test
- TypeScript
- Node.js
- dotenv
- GitHub Actions

## Features

- **Page Object Model:** locators and actions kept in page classes, separate from tests
- **Custom fixtures:** page objects injected directly into tests
- **Data-driven testing:** test data stored in JSON and run in a loop
- **Environment config:** base URL and credentials loaded from `.env`
- **Tags:** `@smoke` and `@regression` for selective runs
- **Failure evidence:** screenshot, video and trace on failure
- **HTML report:** generated after every run
- **CI/CD:** tests run automatically on every push via GitHub Actions, with credentials stored in GitHub Secrets

## Project Structure

```
├── .github/workflows/playwright.yml   # CI pipeline
├── fixtures/pomFixtures.ts            # Custom fixtures
├── pages/
│   ├── LoginPage.ts                   # Login page object
│   └── InventoryPage.ts               # Products page object
├── test-data/users.json               # Data for data-driven tests
├── tests/
│   ├── login.spec.ts                  # Login tests
│   └── cart.spec.ts                   # Cart tests
├── .env                               # Environment variables (not committed)
└── playwright.config.ts               # Playwright configuration
```

## Setup

```bash
git clone https://github.com/sakshigit1/playwright-typescript-framework.git
cd playwright-typescript-framework
npm install
npx playwright install
```

Create a `.env` file in the project root:

```
BASE_URL=https://www.saucedemo.com
STD_USER=standard_user
STD_PASS=secret_sauce
```

## Running Tests

| Command | Description |
|---|---|
| `npx playwright test` | Run all tests |
| `npx playwright test --grep @smoke` | Run smoke tests only |
| `npx playwright test --grep @regression` | Run regression tests only |
| `npx playwright test --headed` | Run with the browser visible |
| `npx playwright test --ui` | Open UI mode |
| `npx playwright show-report` | Open the HTML report |

## Test Coverage

| Suite | Test | Tag |
|---|---|---|
| Login | Valid login | `@smoke` |
| Login | Invalid login: wrong password | `@regression` |
| Login | Invalid login: locked user | `@regression` |
| Login | Invalid login: empty username | `@regression` |
| Cart | Add one item | `@smoke` |
| Cart | Add two items | `@regression` |
