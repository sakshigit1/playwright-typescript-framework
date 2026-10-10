import { test } from '../fixtures/pomFixtures';
import users from '../test-data/users.json';

test.describe('Login', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('valid login @smoke', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(process.env.STD_USER!, process.env.STD_PASS!);
    await inventoryPage.expectLoaded();
  });

  // Data-driven: JSON ki har row ke liye ek test banega
  for (const data of users) {
    test(`invalid login - ${data.case} @regression`, async ({ loginPage }) => {
      await loginPage.login(data.user, data.pass);
      await loginPage.expectError(data.error);
    });
  }

});