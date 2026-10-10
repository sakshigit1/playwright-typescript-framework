import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.title).toHaveText('Products');
  }

  async addToCart(itemId: string) {
    await this.page.locator(`#add-to-cart-${itemId}`).click();
  }

  async expectCartCount(count: string) {
    await expect(this.cartBadge).toHaveText(count);
  }
}