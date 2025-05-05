import { test, expect } from '@playwright/test';

test('User can register, login, add products to cart, and logout', async ({ page }) => {
  // Strting
  await page.goto('http://localhost:4200');
  await expect(page).toHaveURL('http://localhost:4200/login');

  // Register page
  await page.getByRole('link', { name: 'Register now' }).click();
  await expect(page).toHaveURL('http://localhost:4200/register');

  // insert invalid password (less then 6 chars)
  await page.getByRole('textbox', { name: 'Your Email' }).fill('oreltwito3@gmail.com');
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill('1121');
  await page.getByRole('textbox', { name: 'Repeat your password' }).fill('1121');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.locator('.error')).toHaveText('Password must be at least 6 characters');

  // insert invalid password (not using Capital char)
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill('123456');
  await page.getByRole('textbox', { name: 'Repeat your password' }).fill('123456');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.locator('.error')).toHaveText('Password must contain at least one uppercase letter');

  // insert unmatch between password and repeat password
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill('12345');
  await page.getByRole('textbox', { name: 'Repeat your password' }).fill('123456');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.locator('.error')).toHaveText('Passwords do not match');


  // Register
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill('123456A');
  await page.getByRole('textbox', { name: 'Repeat your password' }).fill('123456A');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page).toHaveURL('http://localhost:4200/login');

  // Put invalid email
  await page.getByRole('textbox', { name: 'Email' }).fill('oreltwito3@gmail');
  await page.getByRole('textbox', { name: 'Password' }).fill('123456A');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.locator('.error')).toHaveText('Email does not exist');

  // Put invalid password
  await page.getByRole('textbox', { name: 'Email' }).fill('oreltwito3@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('1234AAAAA');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.locator('.error')).toHaveText('Incorrect password');

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

  // Add 2 to the sand quantity
  await page.locator('.cart-item:has-text("Sand") .actions >> text="+"').click();
  await page.locator('.cart-item:has-text("Sand") .actions >> text="+"').click();

  // Check sand has 3 quantity in cart
  await page.waitForTimeout(250);       // used becuse sometimes not updated at time
  const updatedQtyText = await page.locator('.cart-item:has-text("Sand") .details').innerText();
  const updatedQty = updatedQtyText.match(/Quantity:\s*(\d+)/);
  expect(Number(updatedQty?.[1])).toBe(3);

  // '–'
  await page.locator('.cart-item:has-text("Sand") .actions >> text="–"').click();
  
  // Check sand has 2 quantity in cart
  let finalQtyText = await page.locator('.cart-item:has-text("Sand") .details').innerText();
  let finalQty = finalQtyText.match(/Quantity:\s*(\d+)/);
  expect(Number(finalQty?.[1])).toBe(2);

  // Check total sum
  let totalText = await page.locator('.total').innerText();
  let totalAmount = Number(totalText.replace(/[^0-9.]/g, ''));
  expect(totalAmount).toBe(668);

  // '-'
  await page.locator('.cart-item:has-text("Phone") .actions >> text="–"').click();
  
  // Check phone no longer exist in cart
  await expect(page.locator('.cart-item:has-text("Phone")')).toHaveCount(0);

  // Check new total sum
  totalText = await page.locator('.total').innerText();
  totalAmount = Number(totalText.replace(/[^0-9.]/g, ''));
  expect(totalAmount).toBe(476);

  // Logout
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL('http://localhost:4200/login');
  
  // After logout, check if log-in the cart stay still the same
    // Log-in
  await page.getByRole('textbox', { name: 'Email' }).fill('oreltwito3@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('123456A');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL('http://localhost:4200/dashboard');
  await expect(page.getByText('oreltwito3@gmail.com')).toBeVisible();

    // Cart page
  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page).toHaveURL('http://localhost:4200/dashboard/cart');

    // Check sand has 2 quantity in cart
  finalQtyText = await page.locator('.cart-item:has-text("Sand") .details').innerText();
  finalQty = finalQtyText.match(/Quantity:\s*(\d+)/);
  expect(Number(finalQty?.[1])).toBe(2);

    // Check new total sum
  totalText = await page.locator('.total').innerText();
  totalAmount = Number(totalText.replace(/[^0-9.]/g, ''));
  expect(totalAmount).toBe(476);
});
