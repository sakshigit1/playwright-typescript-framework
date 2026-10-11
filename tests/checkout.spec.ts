 import { test } from '../fixtures/pomFixtures';

test.describe('Checkout', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.STD_USER!, process.env.STD_PASS!);
  });

  test('complete order end-to-end @smoke', async ({ inventoryPage, cartPage, checkoutPage }) => {
    // Products page
    await inventoryPage.expectLoaded();
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await inventoryPage.expectCartCount('2');
    await inventoryPage.openCart();

    // Cart page
    await cartPage.expectLoaded();
    await cartPage.expectItemCount(2);
    await cartPage.expectItemPresent('Sauce Labs Backpack');
    await cartPage.clickCheckout();

    // Checkout pages
    await checkoutPage.fillDetails('Test', 'User', '110001');
    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderComplete();
  });

  test('checkout without first name shows error @regression', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.openCart();
    await cartPage.clickCheckout();

    await checkoutPage.fillDetails('', 'User', '110001');
    await checkoutPage.expectError('First Name is required');
  });

});