import { test, expect } from '@playwright/test';

test('Сценарій 1', async ({ page }) => {
  await page.goto('https://www.imdb.com');
  await expect(page).toHaveTitle(/IMDb/);

  await page.click('[aria-label="Search IMDb"]');
  await page.fill('input[type="text"]', 'Inception');
  await page.press('input[type="text"]', 'Enter');

  await page.waitForLoadState('load');

  const firstResult = page.locator('a.ipc-title-link-wrapper[href*="/title/"]').first();
  await expect(firstResult).toBeVisible({ timeout: 10000 });

  const resultText = await firstResult.innerText();
  expect(resultText.toLowerCase()).toContain('inception');

  await firstResult.click();
  await page.waitForLoadState('domcontentloaded');

  const movieTitle = page.locator('[data-testid="hero__primary-text"]');
  await expect(movieTitle).toBeVisible({ timeout: 10000 });

  const titleText = await movieTitle.innerText();
  expect(titleText.toLowerCase()).toContain('inception');
});

test('Сценарій 2', async ({ page }) => {
  const invalidQuery = 'zxcvbnm123';

  await page.goto('https://www.imdb.com');
  await expect(page).toHaveTitle(/IMDb/);

  await page.click('[aria-label="Search IMDb"]');
  await page.fill('input[type="text"]', invalidQuery);
  await page.press('input[type="text"]', 'Enter');

  await page.waitForLoadState('domcontentloaded');
  await page.screenshot({ path: 'no-results-debug.png' });

const noResultsMessage = page.locator('text=No results found for "zxcvbnm123"').first();
await expect(noResultsMessage).toBeVisible({ timeout: 10000 });

const movieCards = page.locator('a.ipc-title-link-wrapper[href*="/title/"]');
await expect(movieCards).toHaveCount(0);
});

test('Сценарій 3', async ({ page }) => {

  await page.goto('https://www.imdb.com/chart/top/');
  await expect(page).toHaveTitle(/IMDb Top 250/);

  const firstMovie = page.locator('a.ipc-title-link-wrapper[href*="/title/"]').first();
  await expect(firstMovie).toBeVisible({ timeout: 10000 });
  await firstMovie.click();

  await page.waitForLoadState('domcontentloaded');

  await expect(page).toHaveURL(/imdb\.com\/title\/tt/);

  const movieTitle = page.locator('[data-testid="hero__primary-text"]');
  await expect(movieTitle).toBeVisible({ timeout: 10000 });
  const titleText = await movieTitle.innerText();
  console.log(`Назва фільму: ${titleText}`);

  const rating = page.locator('[data-testid="hero-rating-bar__aggregate-rating__score"]').first();
  await expect(rating).toBeVisible({ timeout: 10000 });
  const ratingText = await rating.innerText();
  console.log(`Рейтинг: ${ratingText}`);

  const releaseYear = page.locator('[data-testid="title-details-releasedate"]')
    .locator('a')
    .first();
  await expect(releaseYear).toBeVisible({ timeout: 10000 });
  const yearText = await releaseYear.innerText();
  console.log(`Рік видання: ${yearText}`);
});

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