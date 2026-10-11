import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart/);
    await expect(this.title).toHaveText('Your Cart');
  }

  async expectItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async expectItemPresent(name: string) {
    await expect(this.cartItems.filter({ hasText: name })).toBeVisible();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}