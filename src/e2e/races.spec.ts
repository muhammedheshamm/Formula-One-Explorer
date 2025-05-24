import { test, expect } from '@playwright/test';

test.describe('Races Page', () => {
  test('should display races for a selected season', async ({ page }) => {
    // Navigate to a specific season's races page
    await page.goto('/seasons/1955');

    // Check if the season title is displayed
    await expect(page.getByText(/Season 1955 Races/i)).toBeVisible();

    // There should be race cards visible
    const races = page.locator('[data-testid="race-card"]');
    await expect(races.first()).toBeVisible();
  });

  test('should allow pinning and unpinning races', async ({ page }) => {
    // Navigate to a specific season's races page
    await page.goto('/seasons/1955');

    // Wait for races to load
    await page.waitForSelector('[data-testid="race-card"]');

    // Find and click the pin button for the first race
    const pinButton = page.locator('[aria-label="Pin race"]').first();
    await pinButton.click();

    // Check if the Pinned Races section appears
    await expect(page.getByText('Pinned Races')).toBeVisible();

    // Unpin the race
    await page.locator('[aria-label="Unpin race"]').first().click();

    // Pinned Races section should disappear
    await expect(page.getByText('Pinned Races')).not.toBeVisible();
  });

  test('should navigate to race details when clicking on a race', async ({ page }) => {
    // Navigate to a specific season's races page
    await page.goto('/seasons/1955');

    // Wait for races to load
    await page.waitForSelector('[data-testid="race-card"]');

    // Get the name of the first race
    const raceName = await page.locator('[data-testid="race-card"]').first().locator('a').first().textContent();

    // Click on the first race
    await page.locator('[data-testid="race-card"]').first().locator('a').first().click();

    // Check if we navigated to the race details page
    await expect(page).toHaveURL(/\/races\/1955\/\d+/);

    // Check if the race name is displayed on the details page
    if (raceName) {
      await expect(page.getByText(raceName)).toBeVisible();
    }
  });
});
