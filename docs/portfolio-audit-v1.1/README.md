# Portfolio audit and signature portrait

Reviewed the live portfolio and its six case studies before editing. The primary paths were finding work, validating evidence in a case study, downloading the CV, and contacting Chrish. I reviewed the desktop (1440 px) and mobile (390 px) layouts in both themes, then checked the Astro components, TypeScript project data, and existing Playwright tests. [Issue #2](https://github.com/Gabions256/chrish-oula-portfolio/issues/2) · [Live portfolio](https://chrish-oula-portfolio.vercel.app/)

## Independent findings

| Step | Finding |
| --- | --- |
| 1. Homepage and recruiter actions | The name, role, work, CV, and contact paths were easy to find. The boxed photograph repeated the name and role in a caption. The new cutout gives the portrait its own space and brings it higher on small screens. Some arrow glyphs appeared as missing-character boxes in Chromium. A local symbol-font fallback restores them without a web font request. |
| 2. Selected work | The flagship, released products, internal test, and prototype groupings make the evidence and project stages easy to scan. The six case-study actions had the same accessible name. Each now includes its project name. |
| 3. Tracemark | The workflow and two redacted screenshots establish the scope of the example. At 390 px both screenshots occupied 620 px-high boxes. They now reserve about 219 px and 170 px at their respective intrinsic ratios. |
| 4. Poultrix Hub | The website screenshot supports the public product description. Its caption identifies it as the public website. The image now scales with the gallery width, reducing empty space around it. |
| 5. Sente | The redacted Windows page, workflow, and separate platform references make the evidence and platform differences clear. The same layout correction makes the screenshot easier to reach on mobile. |
| 6. FastWorkFlow VPN | Approved store artwork supports the listing-based description. The image keeps its proportions, and the case study continues to link directly to the Android listing. |
| 7. GAB Office | The portrait-format product screenshot is easy to distinguish from store artwork. The internal-testing label is visible before the image, and the image stays within the gallery’s height limit. |
| 8. Enterprise Parts CRM | The text workflow explains the prototype without disclosing a client or displaying private records. The prototype status is visible before the workflow. |
| 9. Navigation, motion, and metadata | The mobile navigation collapsed from 114 px to 68 px after first paint on the live homepage. Initializing its enhanced state in the document head removes that shift and preserves the no-JavaScript navigation. Keyboard focus, Escape, skip link, case-study navigation, and reduced motion were checked. Titles, descriptions, canonical URLs, social images, sitemap, and robots metadata were present. |

Poultrix Hub and FastWorkFlow VPN currently have website or store evidence. The available assets support those case studies. The audit did not independently verify in-app behavior, business outcomes, or full WCAG conformance.

## Portrait

I isolated the subject from the owner-approved source with local, non-generative alpha matting. The face, skin tone, glasses, and suit come from the original photograph. I used a short alpha taper at the lower jacket and right sleeve where the source ends. The olive glow is a separate CSS layer with theme-specific colors.

| WebP | Encoded size |
| --- | ---: |
| [384 × 447](../../public/chrish-oula-portrait-cutout-384.webp) | 25,636 bytes |
| [640 × 745](../../public/chrish-oula-portrait-cutout-640.webp) | 55,832 bytes |
| [904 × 1052](../../public/chrish-oula-portrait-cutout.webp) | 103,136 bytes |

## Before and after

The before screenshots use the baseline build from `768456a`. The live homepage HTML and original portrait matched that build byte for byte. The case-study before sheets use the live review captures. The after screenshots use the branch’s local static build. Screenshots were captured with reduced motion to show the settled layout.

| Width | Light | Dark |
| ---: | --- | --- |
| 360 px | [Before](before/home-360-light.jpg) · [After](after/home-360-light.jpg) | [Before](before/home-360-dark.jpg) · [After](after/home-360-dark.jpg) |
| 390 px | [Before](before/home-390-light.jpg) · [After](after/home-390-light.jpg) | [Before](before/home-390-dark.jpg) · [After](after/home-390-dark.jpg) |
| 768 px | [Before](before/home-768-light.jpg) · [After](after/home-768-light.jpg) | [Before](before/home-768-dark.jpg) · [After](after/home-768-dark.jpg) |
| 1024 px | [Before](before/home-1024-light.jpg) · [After](after/home-1024-light.jpg) | [Before](before/home-1024-dark.jpg) · [After](after/home-1024-dark.jpg) |
| 1440 px | [Before](before/home-1440-light.jpg) · [After](after/home-1440-light.jpg) | [Before](before/home-1440-dark.jpg) · [After](after/home-1440-dark.jpg) |
| 1920 px | [Before](before/home-1920-light.jpg) · [After](after/home-1920-light.jpg) | [Before](before/home-1920-dark.jpg) · [After](after/home-1920-dark.jpg) |

| All six case studies | Light | Dark |
| --- | --- | --- |
| Mobile | [Before](before/cases-390-light.jpg) · [After](after/cases-390-light.jpg) | [Before](before/cases-390-dark.jpg) · [After](after/cases-390-dark.jpg) |
| Desktop | [Before](before/cases-1440-light.jpg) · [After](after/cases-1440-light.jpg) | [Before](before/cases-1440-dark.jpg) · [After](after/cases-1440-dark.jpg) |

## Verification

- `npm run check` reported 0 errors, warnings, or hints. The production-mode build generated all seven pages, the sitemap, and robots metadata.
- `npm test -- --workers=2` passed all 25 tests, including the CV PDF response, internal links and assets, keyboard and menu focus, both themes, and reduced motion. The portrait test verifies transparent and opaque pixels. Reduced motion now also skips the portrait’s 90 ms entrance delay.
- A separate desktop and mobile sweep ran 28 axe scans across both themes and all seven pages against WCAG 2.1 A/AA tags. It found zero violations.
- The 12 hero captures had 0 CLS. The 40 viewport and route samples showed no horizontal overflow, browser errors, or broken images. One full-page Tracemark capture at 390 px measured 0.0007 CLS. Five reruns measured 0. The slow-response homepage test measured 0.052 before and 0 after, and the mobile menu links remained usable with JavaScript disabled.
- `npm audit --json` reported 0 vulnerabilities across 503 dependency entries.
- The CV served as `application/pdf`, began with `%PDF-`, and matched the supplied file. The HTTPS check returned 200 for 15 of 16 external destinations. LinkedIn returned 999 to automated requests, so I verified the configured URL only.
- The project data, approved imagery, privacy redactions, CV, and original photo match the baseline files. All seven pages retain the same link destinations and canonical metadata.

### Lighthouse homepage results

Lighthouse 13.6.0 on Chromium 156, with production-mode builds served locally and the standard desktop and mobile profiles. Each value is the median of three runs per build and profile. All 12 runs scored 100 for Performance.

| Profile and build | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS | Speed Index |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Desktop before | 100 | 100 | 100 | 100 | 290 ms | 290 ms | 0 ms | 0 | 442 ms |
| Desktop after | 100 | 100 | 100 | 100 | 285 ms | 285 ms | 0 ms | 0 | 320 ms |
| Mobile before | 100 | 100 | 100 | 100 | 1,055 ms | 1,055 ms | 0 ms | 0 | 1,055 ms |
| Mobile after | 100 | 100 | 100 | 100 | 1,054 ms | 1,054 ms | 0 ms | 0 | 1,054 ms |
