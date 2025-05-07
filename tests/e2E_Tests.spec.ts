import { test, expect } from '@playwright/test';

test('User can register, login, add products to cart, and logout', async ({ page }) => {
  // Strting
  await page.goto('http://localhost:4200');
  await expect(page).toHaveURL('http://localhost:4200/login');
  await page.getByRole('link', { name: 'Register now' }).click();
  await expect(page).toHaveURL('http://localhost:4200/register');

  // Register
  await page.getByRole('textbox', { name: 'Your Email' }).fill('oreltwito3@gmail.com');
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill('123456A');
  await page.getByRole('textbox', { name: 'Repeat your password' }).fill('123456A');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL('http://localhost:4200/login');

  // Log-in
  await page.getByRole('textbox', { name: 'Email' }).fill('oreltwito3@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('123456A');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL('http://localhost:4200/dashboard');
  await expect(page.getByText('oreltwito3@gmail.com')).toBeVisible();

  // Products page
  await page.getByRole('link', { name: 'Products' }).click();
  await expect(page).toHaveURL('http://localhost:4200/dashboard/products');

  // Adding products to cart 
  await page.locator('div:nth-child(2) > .bottom-row > button').click();
  await page.locator('.product-card', { hasText: 'Sand' }).getByRole('button', { name: 'Add' }).click();
  await page.locator('.product-card', { hasText: 'Phone' }).getByRole('button', { name: 'Add' }).click();

  // Cart page
  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page).toHaveURL('http://localhost:4200/dashboard/cart');

  // Check sand in the cart
  await expect(page.locator('.cart-item:has-text("Sand") .details')).toContainText('Sand');

  // Check sand has 1 quantity in cart
  const sandQtyText = await page.locator('.cart-item:has-text("Sand") .details').innerText();
  const qtyMatch = sandQtyText.match(/Quantity:\s*(\d+)/);
  expect(Number(qtyMatch?.[1])).toBe(1);

  // Check total sum
  let totalText = await page.locator('.total').innerText();
  let totalAmount = Number(totalText.replace(/[^0-9.]/g, ''));
  expect(totalAmount).toBe(476);

  // Logout
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL('http://localhost:4200/login');
});
