import { test, expect } from '@playwright/test';

test('Register + Login (and save state)', async ({ page }) => {
  const email = 'oreltwito3@gmail.com';
  const password = '123456A';
  
  
  // Register  
  await page.goto('http://localhost:4200');
  await expect(page).toHaveURL('http://localhost:4200/login');
  await page.getByRole('link', { name: 'Register now' }).click();
  await expect(page).toHaveURL('http://localhost:4200/register');
  
  await page.getByRole('textbox', { name: 'Your Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
  await page.getByRole('textbox', { name: 'Repeat your password' }).fill(password);
  await page.getByRole('button', { name: 'Register' }).click();

  // Login
  await expect(page).toHaveURL('http://localhost:4200/login');
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL('http://localhost:4200/dashboard');
  await expect(page.getByText('oreltwito3@gmail.com')).toBeVisible();

  await page.context().storageState({ path: 'auth.json' });
});

test.describe('Basic flows (after login)', () => {
  test.use({ storageState: 'auth.json' });

  test('Add to cart flow', async ({ page }) => {
    await page.goto('http://localhost:4200/dashboard/products');
    await expect(page).toHaveURL('http://localhost:4200/dashboard/products');
  
    await page.locator('.product-card', { hasText: 'Sand' }).getByRole('button', { name: 'Add' }).click();
    await page.locator('.product-card', { hasText: 'Phone' }).getByRole('button', { name: 'Add' }).click();
    
    // Check cart have the items
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page).toHaveURL('http://localhost:4200/dashboard/cart');
    await expect(page.locator('.cart-item:has-text("Sand")')).toHaveCount(1);
  
    // Save to auth.json
    await page.context().storageState({ path: 'auth.json' });
  });

  test('View and update cart', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('http://localhost:4200/dashboard/cart');
    const sandQtyText = await page.locator('.cart-item:has-text("Sand") .details').innerText();
    const qtyMatch = sandQtyText.match(/Quantity:\s*(\d+)/);
    expect(Number(qtyMatch?.[1])).toBeGreaterThanOrEqual(1);
  });

  test('Logout flow', async ({ page }) => {
    await page.goto('http://localhost:4200/dashboard');
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL(/\/login/);
  });

});
