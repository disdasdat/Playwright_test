import { test, expect } from '@playwright/test';

test.describe('Wikipedia search', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.wikipedia.org');
  });

  test('page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Wikipedia/);
  });

  test('search for a topic and verify results', async ({ page }) => {
    // Fill the search input and submit
    await page.fill('input#searchInput', 'Playwright');
    await page.click('button[type="submit"]');

    // Wait for the results page to load
    await page.waitForURL(/.*Playwright.*/);

    // Verify the page heading contains the search term
    const heading = page.locator('h1#firstHeading');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Playwright');
  });

  test('search input is visible and interactive', async ({ page }) => {
    const searchInput = page.locator('input#searchInput');

    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeEnabled();

    // Type and verify the value updates
    await searchInput.fill('TypeScript');
    await expect(searchInput).toHaveValue('TypeScript');

    // Clear it and confirm it's empty
    await searchInput.clear();
    await expect(searchInput).toHaveValue('');
  });

  test('take a screenshot on failure', async ({ page }) => {
    await page.fill('input#searchInput', 'Playwright testing');
    await page.click('button[type="submit"]');

    await page.waitForURL(/.*Playwright.*/);

    // Take a screenshot during the test
    await page.screenshot({ path: 'screenshots/results.png' });

    const content = page.locator('#mw-content-text');
    await expect(content).toBeVisible();
  });

});