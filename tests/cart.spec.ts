import { test } from '../fixtures/pomFixtures';

test.describe('Cart', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.STD_USER!, process.env.STD_PASS!);
  });

  test('add one item @smoke', async ({ inventoryPage }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.expectCartCount('1');
  });

  test('add two items @regression', async ({ inventoryPage }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await inventoryPage.expectCartCount('2');
  });

});