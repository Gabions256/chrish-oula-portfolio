import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const viewportWidths = [360, 390, 768, 1024, 1440, 1920];
const caseStudyRoutes = [
  '/work/tracemark',
  '/work/poultrix-hub',
  '/work/sente',
  '/work/fastworkflow-vpn',
  '/work/gab-pdf-editor',
  '/work/enterprise-parts-crm',
];

test('homepage introduces Chrish and exposes the primary portfolio actions', async ({ page }) => {
  await page.goto('/');
  const heroHeading = page.getByRole('heading', { level: 1 });
  await expect(heroHeading).toContainText('Chrish Oula');
  await expect(heroHeading).toContainText('Software Engineer');
  await expect(page.getByRole('link', { name: /Explore my work/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Download CV/ }).first()).toHaveAttribute(
    'href',
    '/Oula-Chrish-CV.pdf',
  );
  await expect(page.getByRole('link', { name: /View GitHub/ }).first()).toHaveAttribute(
    'href',
    'https://github.com/Gabions256',
  );
  await expect(page.getByRole('link', { name: 'Tracemark', exact: true })).toBeVisible();
  await expect(
    page.locator('#work').getByRole('link', { name: 'Poultrix Hub', exact: true }),
  ).toBeVisible();
  await expect(page.locator('#work').getByRole('link', { name: 'Sente', exact: true }))
    .toBeVisible();

  const themeToggle = page.getByRole('button', { name: /Switch to (light|dark) theme/ });
  const currentTheme = await page.locator('html').getAttribute('data-theme');
  await themeToggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', currentTheme ?? '');
  const selectedTheme = await page.locator('html').getAttribute('data-theme');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', selectedTheme ?? '');
});

test('portrait and recruiter contact links load', async ({ page }) => {
  await page.goto('/');
  const portrait = page.locator('.hero-portrait img');
  await expect(portrait).toHaveAttribute('alt', 'Chrish Oula, Software Engineer');
  await expect(portrait).toBeVisible();
  await expect(page.locator('.hero-portrait figcaption')).toHaveCount(0);
  const alpha = await portrait.evaluate(async (image: HTMLImageElement) => {
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 32;
    const context = canvas.getContext('2d')!;
    context.drawImage(image, 0, 0, 32, 32);
    return [context.getImageData(0, 0, 1, 1).data[3], context.getImageData(16, 12, 1, 1).data[3]];
  });
  expect(alpha).toEqual([0, 255]);

  await expect(page.locator('#contact').getByRole('link', { name: /Connect on LinkedIn/ }))
    .toHaveAttribute('href', 'https://www.linkedin.com/in/oula-chrish-6a538323b');
  await expect(page.locator('#contact').getByRole('link', { name: /View GitHub/ }))
    .toHaveAttribute('href', 'https://github.com/Gabions256');
  await expect(page.locator('#contact').getByRole('link', { name: /Email me/ }))
    .toHaveAttribute('href', 'mailto:oulachris28@gmail.com');
  await expect(page.locator('#contact').getByRole('link', { name: /Download CV/ }))
    .toHaveAttribute('download', '');
  await expect(page.locator('#contact')).not.toContainText('+256');
});

test('CV download serves the supplied PDF on desktop and mobile', async ({ page, request }) => {
  const response = await request.get('/Oula-Chrish-CV.pdf');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/pdf');
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');

  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('link', { name: /Download CV/ }).first())
      .toHaveAttribute('href', '/Oula-Chrish-CV.pdf');
    await expect(page.locator('#contact').getByRole('link', { name: /Download CV/ }))
      .toBeVisible();
  }
});

test('featured project cards navigate to their case studies', async ({ page }) => {
  await page.goto('/');
  const caseStudyLinks = page.getByRole('link', { name: /^Read case study: / });
  await expect(caseStudyLinks).toHaveCount(caseStudyRoutes.length);
  await page.getByRole('link', { name: 'Read case study: Tracemark', exact: true }).click();
  await expect(page).toHaveURL(/\/work\/tracemark$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Tracemark');
});

test('sticky navigation tracks the active homepage section', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('[data-site-header]')).toHaveCSS('position', 'sticky');
  await page.locator('#about').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-nav-section="about"]')).toHaveAttribute(
    'aria-current',
    'location',
  );
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-nav-section="contact"]')).toHaveAttribute(
    'aria-current',
    'location',
  );
});

test('mobile navigation opens, closes with Escape, and returns focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.locator('[data-menu-toggle]');
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-label', 'Open navigation');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(toggle).toHaveAttribute('aria-label', 'Close navigation');
  await expect(page.locator('[data-nav-section="top"]')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();

  await toggle.click();
  await page.locator('[data-nav-section="work"]').click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator('#work')).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('project stories use authentic visuals and contain no editorial placeholders', async ({ page }) => {
  await page.goto('/work/tracemark');
  await expect(page.locator('.architecture-flow li')).toHaveCount(4);
  await expect(page.locator('.project-visual-gallery img')).toHaveCount(2);
  await expect(page.locator('.project-visual-gallery img').nth(1))
    .toHaveAttribute('alt', /redacted/);
  await page.goto('/work/sente');
  await expect(page.locator('.project-visual-gallery img')).toHaveAttribute(
    'alt',
    /redacted/,
  );
  await expect(page.locator('.workflow-flow li')).toHaveCount(4);

  for (const route of caseStudyRoutes) {
    await page.goto(route);
    await expect(page.locator('.project-asset-pending')).toHaveCount(0);
    const body = await page.locator('body').innerText();
    for (const internalNote of [
      'Owner confirmation needed',
      'Product screenshot not supplied',
      'Owner-supplied asset pending',
      'No public documentation available',
      'Confirm individual contributions',
      'Not publicly documented',
    ]) {
      expect(body).not.toContain(internalNote);
    }
  }
});

test('case-study images keep their intrinsic proportions on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/work/tracemark');
  const images = page.locator('.project-visual-gallery img');
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    const ratio = await image.evaluate(async (element: HTMLImageElement) => {
      await element.decode();
      const box = element.getBoundingClientRect();
      return { displayed: box.width / box.height, source: element.naturalWidth / element.naturalHeight };
    });
    expect(ratio.displayed).toBeCloseTo(ratio.source, 2);
  }
});

test('unconfirmed product contribution and technology claims are omitted', async ({ page }) => {
  for (const route of [
    '/work/poultrix-hub',
    '/work/sente',
    '/work/fastworkflow-vpn',
    '/work/gab-pdf-editor',
  ]) {
    await page.goto(route);
    await expect(page.getByRole('heading', { name: 'My contribution', exact: true }))
      .toHaveCount(0);
    await expect(page.locator('.case-meta-row').getByText('Technology', { exact: true }))
      .toHaveCount(0);
  }

  await page.goto('/');
  await expect(page.locator('body')).not.toContainText('row-level security');
});

test('case studies expose a contents list, reading progress, and working project navigation', async ({
  page,
}) => {
  await page.goto('/work/tracemark');
  await expect(page.getByRole('navigation', { name: 'On this page' })).toBeVisible();
  await expect(page.locator('[data-reading-progress]')).toBeAttached();
  await expect(page.locator('.case-project-nav')).toBeVisible();
  await expect(page.locator('.case-hero')).toHaveCSS('view-transition-name', 'page-hero');
  await page.getByRole('link', { name: /Next project Poultrix Hub/ }).click();
  await expect(page).toHaveURL(/\/work\/poultrix-hub$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Poultrix Hub');
});

test('keyboard navigation exposes the skip link and visible focus', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('.wordmark').first()).toBeFocused();
  await expect(page.locator('.wordmark').first()).toHaveCSS('outline-style', 'solid');
});

test('reduced-motion preference disables smooth scrolling and transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const styles = await page.evaluate(() => ({
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    transitionDuration: getComputedStyle(document.querySelector('.button')!).transitionDuration,
    animationDuration: getComputedStyle(document.querySelector('.hero-copy')!).animationDuration,
    portraitAnimationDelay: getComputedStyle(document.querySelector('.hero-portrait')!).animationDelay,
  }));
  expect(styles.scrollBehavior).toBe('auto');
  expect(styles.portraitAnimationDelay).toBe('0s');
  const duration = styles.transitionDuration.split(',')[0].trim();
  const seconds = duration.endsWith('ms')
    ? Number.parseFloat(duration) / 1000
    : Number.parseFloat(duration);
  expect(seconds).toBeLessThanOrEqual(0.00001);
  const animationSeconds = styles.animationDuration.endsWith('ms')
    ? Number.parseFloat(styles.animationDuration) / 1000
    : Number.parseFloat(styles.animationDuration);
  expect(animationSeconds).toBeLessThanOrEqual(0.00001);
});

test('all project case studies render', async ({ page }) => {
  for (const route of caseStudyRoutes) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Thoughtful decisions. Useful outcomes.' }))
      .toBeVisible();
  }
});

test('all project pages load without browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (response.status() >= 400) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  for (const route of ['/', ...caseStudyRoutes]) {
    const response = await page.goto(route);
    expect(response?.status(), `response for ${route}`).toBe(200);
  }
  expect(errors).toEqual([]);
});

test('internal links and local image assets resolve on every page', async ({ page, request }) => {
  const internalPaths = new Set<string>();
  for (const route of ['/', ...caseStudyRoutes]) {
    await page.goto(route);
    const paths = await page.locator('a[href^="/"]').evaluateAll((anchors) =>
      anchors.map((anchor) => new URL((anchor as HTMLAnchorElement).href).pathname),
    );
    paths.forEach((path) => internalPaths.add(path));

    const imagePaths = await page.locator('img[src^="/"]').evaluateAll((images) =>
      images.map((image) => new URL((image as HTMLImageElement).src).pathname),
    );
    imagePaths.forEach((path) => internalPaths.add(path));

    const invalidExternalLinks = await page.locator('a[href^="http"]').evaluateAll((anchors) =>
      anchors
        .filter((anchor) => {
          const link = anchor as HTMLAnchorElement;
          return (
            new URL(link.href).protocol !== 'https:' ||
            (link.target === '_blank' && !link.rel.includes('noreferrer'))
          );
        })
        .map((anchor) => (anchor as HTMLAnchorElement).href),
    );
    expect(invalidExternalLinks, `unsafe external links on ${route}`).toEqual([]);

  }

  for (const path of internalPaths) {
    const response = await request.get(path);
    expect(response.status(), `internal link ${path}`).toBe(200);
  }
});

test('homepage has no horizontal overflow at required widths', async ({ page }) => {
  for (const width of viewportWidths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth, `overflow at ${width}px`).toBeLessThanOrEqual(
      dimensions.clientWidth,
    );
  }
});

test('mobile layout keeps portrait and primary actions available', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Chrish Oula');
  await expect(page.locator('.hero-portrait img')).toBeVisible();
  await expect(page.getByRole('link', { name: /Explore my work/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Download CV/ }).first()).toBeVisible();
  await expect(page.locator('#contact').getByRole('link', { name: /Email me/ })).toBeVisible();
});

test('case studies have no horizontal overflow at required widths', async ({ page }) => {
  for (const width of viewportWidths) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of caseStudyRoutes) {
      await page.goto(route);
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(
        dimensions.scrollWidth,
        `overflow on ${route} at ${width}px`,
      ).toBeLessThanOrEqual(dimensions.clientWidth);
    }
  }
});

for (const route of ['/', ...caseStudyRoutes]) {
  test(`automated accessibility checks in both themes on ${route}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route);
    for (const theme of ['light', 'dark']) {
      const currentTheme = await page.locator('html').getAttribute('data-theme');
      if (currentTheme !== theme) {
        await page.getByRole('button', { name: `Switch to ${theme} theme` }).click();
      }
      const results = await new AxeBuilder({ page }).analyze();
      const violations = results.violations.flatMap((violation) =>
        violation.nodes.map(
          (node) => `${violation.id}: ${node.target.join(', ')}`,
        ),
      );
      expect(
        violations,
        `accessibility violations on ${route} in ${theme} theme`,
      ).toEqual([]);
    }
  });
}
