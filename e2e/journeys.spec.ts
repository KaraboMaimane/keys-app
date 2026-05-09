import { expect, test, type Page, type TestInfo } from '@playwright/test';

async function capture(page: Page, testInfo: TestInfo, name: string) {
  const path = testInfo.outputPath(`${name}.png`);
  await page.screenshot({ path, fullPage: true });
  await testInfo.attach(name, { path, contentType: 'image/png' });
}

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

test.describe('Keys Lessons journeys', () => {
  test.beforeEach(async ({ page }) => {
    await applyStableClientState(page);
  });

  test('@smoke home to phase journey with theory/practice filters', async ({ page }, testInfo) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Keys Lessons' })).toBeVisible();
    await expect(page.locator('.focus-card')).toBeVisible();
    await capture(page, testInfo, '01-home-dashboard');

    await page.getByRole('button', { name: /Open Phase/i }).first().click();
    await expect(page.locator('.phase-panel')).toBeVisible();
    await capture(page, testInfo, '02-phase-view');

    await page.getByRole('button', { name: /Practice/i }).click();
    await expect(page.locator('mat-tab-group .mat-mdc-tab').first()).toBeVisible({ timeout: 10000 });
    await capture(page, testInfo, '03-practice-filter');

    await page.getByRole('button', { name: /Theory/i }).click();
    await expect(page.locator('mat-tab-group .mat-mdc-tab').first()).toBeVisible({ timeout: 10000 });
    await capture(page, testInfo, '04-theory-filter');
  });

  test('@smoke dashboard controls journey', async ({ page }, testInfo) => {
    await page.goto('/');

    const keyboardToggle = page.locator('.keyboard-toggle');
    await expect(keyboardToggle).toContainText('25-key');
    await keyboardToggle.click();
    await expect(keyboardToggle).toContainText('61-key');

    const devToggle = page.locator('.dev-toggle');
    await expect(devToggle).toContainText(/Dev: unlock all|Locked \(dev off\)/i);
    await devToggle.click();
    await expect(devToggle).toContainText(/Locked \(dev off\)|Dev: unlock all/i);

    await capture(page, testInfo, '05-dashboard-controls');
  });

  test('@smoke mobile home journey has no page overflow', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.startsWith('mobile'), 'Mobile-only journey');

    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Keys Lessons' })).toBeVisible();

    const noHorizontalOverflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth <= root.clientWidth + 1;
    });

    expect(noHorizontalOverflow).toBeTruthy();
    await capture(page, testInfo, '06-mobile-home');

    await page.getByRole('button', { name: /Open Phase/i }).first().click();
    await expect(page.locator('.phase-panel')).toBeVisible();
    await capture(page, testInfo, '07-mobile-phase');
  });
});
