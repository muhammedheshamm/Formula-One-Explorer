import { test, expect } from '@playwright/test';

test.describe('Race Details Page', () => {
  test('should display race details title with the correct year', async ({ page }) => {
    const year = '1955';
    const round = '1';

    // Navigate to the specific race details page
    await page.goto(`/races/${year}/${round}`);

    const title = page.locator('h1');
    await expect(title).toBeVisible();

    // Expect the title to contain the correct year from the URL
    await expect(title).toContainText(year);
  });

  test('should display the winner card', async ({ page }) => {
    await page.goto('/races/1955/1');

    // Locate the winner card using the correct test ID
    const winnerCard = page.getByTestId('winner-card');

    // Check if the winner card is visible
    await expect(winnerCard).toBeVisible();
    await expect(winnerCard).toContainText(/Winner/i);
  });

  test('should switch between Participating Drivers and Performance Visualization tabs', async ({ page }) => {
    await page.goto('/races/1955/1');

    const driversTab = page.getByRole('tab', { name: /Participating Drivers/i });
    const performanceTab = page.getByRole('tab', { name: /Performance Visualization/i });

    // Initially "Participating Drivers" tab is active
    await expect(driversTab).toHaveAttribute('aria-selected', 'true');
    await expect(performanceTab).toHaveAttribute('aria-selected', 'false');

    // Click "Performance Visualization" tab
    await performanceTab.click();

    // Now "Performance Visualization" tab should be active
    await expect(performanceTab).toHaveAttribute('aria-selected', 'true');
    await expect(driversTab).toHaveAttribute('aria-selected', 'false');

    // Confirm related content is visible
    await expect(page.getByText(/Time Gap from Winner/i)).toBeVisible();
  });

  test('should allow navigating back to the season races page', async ({ page }) => {
    // Navigate to a specific race details page
    await page.goto('/races/1955/1');

    // Find and click the back button
    await page.getByText(/Back to Season Races/i).click();

    // Check if we navigated back to the season races page
    await expect(page).toHaveURL(/\/seasons\/1955/);
    await expect(page.getByText(/Season 1955 Races/i)).toBeVisible();
  });
});
