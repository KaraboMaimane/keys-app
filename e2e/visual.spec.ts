import { expect, test, type Page } from '@playwright/test';

async function applyStableClientState(page: Page) {
  await page.addInitScript(() => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('keys_app_keyboard', '25');
    localStorage.setItem('keys_app_progress', JSON.stringify({ completed: {} }));
    localStorage.setItem('keys_app_streak', JSON.stringify({
      lastSessionDate: today,
      currentStreak: 3,
      totalSessions: 12,
    }));
  });
}

async function disableMotion(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        transition: none !important;
        animation: none !important;
        caret-color: transparent !important;
      }
    `,
  });
}

test.describe('Visual regression snapshots', () => {
  test.beforeEach(async ({ page }) => {
    await applyStableClientState(page);
  });

  test('dashboard baseline', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Keep baseline on one stable desktop browser');

    await page.goto('/');
    await disableMotion(page);
    await expect(page).toHaveScreenshot('dashboard-baseline.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });

  test('phase baseline', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Keep baseline on one stable desktop browser');

    await page.goto('/');
    await page.getByRole('button', { name: /Open Phase/i }).first().click();
    await expect(page.locator('.phase-panel')).toBeVisible();
    await disableMotion(page);
    await expect(page).toHaveScreenshot('phase-baseline.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
});
