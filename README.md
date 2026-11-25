# Chrish Oula — Software Engineer

Portfolio for Chrish Oula, a Kampala-based Software Engineer. Built with Astro and TypeScript as a static site.

## Run locally

```sh
npm install
npm run dev
```

## Checks

```sh
npm run check
npm run test
npm run build
npm audit
```

Playwright uses Chromium. Install its browser once with `npx playwright install chromium` if it is not already available.

## Deployment

The site builds as static HTML and can run on Vercel. Set `SITE_URL` to the final HTTPS origin before building. This enables absolute canonical URLs, sitemap generation, and the Person schema URL.

PowerShell:

```powershell
$env:SITE_URL = 'https://your-final-domain.example'
npm run build
```

In Bash, use `SITE_URL=https://your-final-domain.example npm run build`.

Do not deploy until the final domain and content are approved. No production deployment is configured by this repository.

## Content and assets

- Professional details follow the updated public GitHub profile and the supplied CV. The homepage links the supplied CV and uses its professional email; it does not repeat the CV phone number in page copy.
- Tracemark details follow its public README, guide, CI workflow, and v0.5.0 release. The interface screenshots keep their supplied privacy redactions; the scan counts shown are specific to one sample scan.
- Poultrix Hub release details follow its live product website, Google Play listing, and GAB product case study. The included website image shows the public landing page, not the farm-record dashboard.
- Sente's Android listing, Windows product page, and privacy policy support its released status and product-level descriptions. No transaction or customer-like product screenshots are included.
- FastWorkFlow VPN is linked to its Google Play listing. The portfolio describes its Android availability while avoiding security, anonymity, or network-performance guarantees.
- GAB Office is shown as an internal-testing product. Enterprise Parts CRM remains a separate, anonymized prototype with no client identity or private source details.
- NovaStack is not presented as Chrish's project until his individual contribution is confirmed. CodeAtlas is omitted until its relationship to Tracemark is confirmed.
- The owner-supplied portrait, CV PDF, and approved product visuals are stored under `public/`.
- Unresolved content, asset provenance, and release notes are kept in `docs/phase3-release-readiness.md`, not on the portfolio pages.

## Stack

- Astro static output with TypeScript.
- Shared responsive design tokens and components.
- Minimal client-side JavaScript for the light/dark theme switch.
- Sitemap integration runs when `SITE_URL` is set.
- Playwright and axe-core checks cover project navigation, CV delivery, contact links, theme persistence, keyboard access, reduced motion, local links/assets, responsive overflow, and accessibility across routes and themes.
