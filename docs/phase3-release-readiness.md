# Phase 3 release readiness

This review document is for portfolio maintainers and reviewers. It is not rendered on the public website.

## Verified public sources

- **Tracemark:** the public README, guide, CI workflow, and GitHub release page identify v0.5.0, Rust, Tree-sitter, SQLite, CLI and desktop apps, GitHub pull-request integration, MCP, and Windows/macOS/Linux checks and release artifacts. The owner-supplied desktop screenshots retain their privacy redactions. The counts visible in the Explore screenshot describe one scan only; they are not performance or adoption metrics.
- **Poultrix Hub:** the product website, Google Play listing, and GAB product case study confirm a live web and Android product. The public case study describes farm records, learning, marketplace, subscriptions, vendor tools, and a shared backend. The supplied CV names Flutter/Dart and Supabase/PostgreSQL; the company case study lists React/TypeScript for the web product. The site keeps those platform roles separate. Confirm the current frontend split before production.
- **Sente:** the official Android listing is `https://play.google.com/store/apps/details?id=com.gabsoftware.sente`; the official Windows product page is `https://www.gabdigitalsystem.com/products/sente`; the privacy policy is `https://www.gabdigitalsystem.com/privacy/sente`. Product materials describe offline, on-device records, Mobile Money message review, payment matching, invoices and reminders, and cash-flow forecasting. The Windows page displayed version 2.4.6 at capture and warns that its installer is unsigned; the site links to the product page rather than embedding a direct installer.
- **FastWorkFlow VPN:** the official Android listing is `https://play.google.com/store/apps/details?id=com.fastworkflow.fastworkflow_vpn`. Its Play listing describes WireGuard-based connections and Android app features. The supplied CV still marks networking integration and production verification as evolving, and the GAB work/product pages contain conflicting release statements. The portfolio only claims that the Android listing is live, describes capabilities as evolving, and makes no independent security, anonymity, or network-performance claims. Update the GAB product copy and confirm current networking maturity before production.
- **GAB Office:** the supplied internal test screenshot shows the product name and current document-tool home screen. The CV uses the name GAB PDF Editor. Confirm the final product name before production; the site currently uses GAB Office and does not present it as released.
- **Enterprise Parts CRM:** the supplied CV supports an anonymized React/TypeScript/Vite prototype summary and workflow tests. No client identity, client screenshot, private repository, or production outcome is included.

## Content intentionally withheld

- The CV lists Poultrix user and test totals, Tracemark test totals, and CRM test totals. Those numbers were not independently corroborated in the public sources reviewed, so the website does not repeat them.
- Sente marketing and Play screenshots show transaction-like names, message content, amounts, and identifiers. Their demo provenance is not confirmed, so none of those product screenshots are copied into the portfolio. The case study uses a text-only workflow diagram instead.
- NovaStack is a GAB Digital System block-stacking puzzle game on Google Play (`https://play.google.com/store/apps/details?id=com.novastack.nova_stack`). The public listing confirms the game and publisher, but Chrish’s individual contribution is not established by the CV or approved public sources. It is omitted until his role is confirmed.
- CodeAtlas remains omitted until its relationship to Tracemark is confirmed.
- The supplied CV is included unmodified because it was provided as the public-download asset. The page uses its professional email for contact and does not repeat its telephone number in page copy. Reconfirm the CV’s contact details before any public deployment.

## Remaining release checks

- Confirm Poultrix’s current Android/web frontend split and contribution boundaries.
- Confirm Sente and GAB Office contribution details and final GAB Office naming.
- Confirm FastWorkFlow’s current networking/release maturity and update the conflicting GAB product copy.
- Confirm whether Chrish contributed to NovaStack before adding it to the portfolio.
- Review the CV’s project metrics and contact details for continued public use.
- Approve the final site content and deployment separately; this branch is not deployed.

## Remaining visual assets

- The Tracemark case study uses the supplied redacted desktop screenshots and factual architecture diagram.
- Poultrix currently uses its public website screenshot; an owner-approved in-app view of the Android or farm-record experience was not supplied.
- Sente uses a text workflow rather than product screenshots because the supplied examples contain transaction-like data whose demo provenance is unconfirmed.
- FastWorkFlow uses public Play listing artwork, not an in-app screenshot.
- GAB Office uses the supplied internal test-build screen. The Enterprise Parts CRM remains a text-based, anonymized workflow because no approved prototype screenshot was supplied.
- These are editorial asset opportunities, not broken placeholders; the live pages use authentic available imagery or factual diagrams.

## Phase 3 quality checks

- `npm run check`: passed with 0 errors, 0 warnings, and 0 hints.
- `npm run build`: passed; generated all 7 static pages.
- `npm test`: passed all 14 Playwright tests. Coverage includes CV delivery, recruiter links, project navigation, theme persistence, keyboard focus, reduced motion, 6 viewport widths, internal routes, image loading, and axe checks on every page in both themes.
- External link check: 15 of 16 unique external page destinations returned HTTP 200. LinkedIn blocks automated requests (HEAD 405, GET 999); the owner profile URL remains in place. The structured-data `schema.org` URL also returned HTTP 200.
- Lighthouse on the local production preview: desktop scores were 100 performance, 100 accessibility, 100 best practices, and 100 SEO. Mobile scores were 99, 100, 100, and 100 respectively. Desktop FCP/LCP/TBT/CLS/speed index: 0.2 s / 0.4 s / 0 ms / 0 / 0.3 s. Mobile: 0.8 s / 1.6 s / 130 ms / 0 / 0.8 s.
- `npm audit --json` could not reach the npm registry audit endpoint because the TLS connection was disconnected. No dependency-audit result is available from this run.
- Production-preview screenshots are in `docs/phase3-screenshots/`: homepage desktop/mobile in dark and light themes, plus all six case studies in desktop/mobile dark theme. The preview was checked locally at `http://127.0.0.1:4321/`; it has not been deployed.
