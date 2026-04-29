import { test, expect } from '@playwright/test';

test('Сценарій 4', async ({ page }) => {
  const invalidEmail = 'user_test_domain.com';
  const password = 'Pass123!';

  await page.goto('https://www.imdb.com');
  await expect(page).toHaveTitle(/IMDb/);

  await page.click('text=Sign in ');
  await page.waitForLoadState('domcontentloaded');

  await page.click('text=Sign in to an existing account');
  await page.waitForLoadState('domcontentloaded');

  const signInWithImdb = page.locator('a:has-text("Sign in with IMDb")').first();
  await expect(signInWithImdb).toBeVisible({ timeout: 10000 });
  await signInWithImdb.click();
  await page.waitForLoadState('domcontentloaded');

  const emailInput = page.locator('input[type="email"], input[name="email"]').first();
  await expect(emailInput).toBeVisible({ timeout: 10000 });
  await emailInput.fill(invalidEmail);

  const passwordInput = page.locator('input[type="password"]').first();
  await expect(passwordInput).toBeVisible({ timeout: 10000 });
  await passwordInput.fill(password);

  const submitButton = page.locator('input[type="submit"], button[type="submit"]').first();
  await expect(submitButton).toBeVisible({ timeout: 10000 });
  await submitButton.click();
  await page.waitForLoadState('domcontentloaded');

  const errorMessage = page.locator('text=There was a problem').first();
  await expect(errorMessage).toBeVisible({ timeout: 10000 });
  console.log('Повідомлення про помилку відображається коректно ');

  await expect(page).toHaveURL(/signin|ap\/signin|login/);
  console.log(`Даний URL: ${page.url()}`);
});