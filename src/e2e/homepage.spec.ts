import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display the logo and hero section', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');

    // Check if the logo is visible
    await expect(page.getByRole('img', { name: 'logo' })).toBeVisible();

    // Check if the navigation btn in hero section is visible
    await expect(page.getByRole('button', { name: 'Explore Seasons' })).toBeVisible();

    // Check if the seasons section is visible
    await expect(page.getByRole('heading', { name: 'Formula 1 Seasons' })).toBeVisible();

    // at least one season should be visible
    const seasons = page.getByRole('link', { name: /Season \d{4}/ });
    const count = await seasons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to a season page when clicking on a season', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');

    // Click on a season (e.g., 1955)
    await page.getByText('1955').click();

    // Check if we navigated to the season page
    await expect(page).toHaveURL(/\/seasons\/1955/);

    // Check if the season title is displayed
    await expect(page.getByText(/Season 1955 Races/i)).toBeVisible();
  });
});
