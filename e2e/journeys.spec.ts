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
    test.setTimeout(60_000); // Extra time for mobile emulators
    await page.goto('/');

    // ── Home dashboard ──────────────────────────────────────────────────────
    await expect(page.getByRole('heading', { name: 'Keys Lessons' })).toBeVisible();
    await expect(page.locator('.focus-card')).toBeVisible();
    await capture(page, testInfo, '01-home-dashboard');

    // ── Open Phase → now shows .phase-view with a section list ──────────────
    await page.getByRole('button', { name: /Open Phase/i }).first().click();
    // The new phase view has .phase-view and a list of .section-row buttons
    await expect(page.locator('.phase-view')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.section-row').first()).toBeVisible({ timeout: 10000 });
    await capture(page, testInfo, '02-phase-view');

    // ── Practice filter ─────────────────────────────────────────────────────
    // Filter pills are now .filter-pill elements (not mat-chips)
    await page.locator('.filter-pill', { hasText: 'Practice' }).click();
    // Should show section rows filtered to Practice, or empty state
    await expect(
      page.locator('.section-row, .section-empty-state').first()
    ).toBeVisible({ timeout: 10000 });
    await capture(page, testInfo, '03-practice-filter');

    // ── Theory filter ───────────────────────────────────────────────────────
    await page.locator('.filter-pill', { hasText: 'Theory' }).click();
    await expect(
      page.locator('.section-row, .section-empty-state').first()
    ).toBeVisible({ timeout: 10000 });
    await capture(page, testInfo, '04-theory-filter');

    // ── Open first visible section → focused section view ───────────────────
    await page.locator('.filter-pill', { hasText: 'All' }).click();
    await page.locator('.section-row').first().click();
    // Section view renders .section-view with a sticky .section-top-bar
    await expect(page.locator('.section-view')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.section-top-bar')).toBeVisible();
    await capture(page, testInfo, '05-section-view');

    // ── Back to phase list ───────────────────────────────────────────────────
    await page.locator('.section-top-bar .back-btn').click();
    await expect(page.locator('.phase-view')).toBeVisible({ timeout: 10000 });
    await capture(page, testInfo, '06-back-to-phase');
  });

  test('@smoke dashboard controls journey', async ({ page }, testInfo) => {
    test.setTimeout(60_000);
    await page.goto('/');

    const keyboardToggle = page.locator('.keyboard-toggle');
    await expect(keyboardToggle).toContainText('25-key');
    await keyboardToggle.click();
    await expect(keyboardToggle).toContainText('61-key');

    const devToggle = page.locator('.dev-toggle');
    await expect(devToggle).toContainText(/Dev: unlock all|Locked \(dev off\)/i);
    await devToggle.click();
    await expect(devToggle).toContainText(/Locked \(dev off\)|Dev: unlock all/i);

    await capture(page, testInfo, '07-dashboard-controls');
  });

  test('@smoke mobile home journey has no page overflow', async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    test.skip(!testInfo.project.name.startsWith('mobile'), 'Mobile-only journey');

    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Keys Lessons' })).toBeVisible();

    const noHorizontalOverflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth <= root.clientWidth + 1;
    });

    expect(noHorizontalOverflow).toBeTruthy();
    await capture(page, testInfo, '08-mobile-home');

    // Navigate to phase — new architecture uses .phase-view
    await page.getByRole('button', { name: /Open Phase/i }).first().click();
    await expect(page.locator('.phase-view')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('.section-row').first()).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(400); // stagger animation
    await capture(page, testInfo, '09-mobile-phase');

    // Open first section — new architecture uses .section-view
    await page.locator('.section-row').first().click();
    await expect(page.locator('.section-view')).toBeVisible({ timeout: 15000 });
    await capture(page, testInfo, '10-mobile-section');
  });
});
