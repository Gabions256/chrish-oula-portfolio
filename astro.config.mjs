import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const configuredSite =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);
const site = configuredSite ? new URL(configuredSite).toString() : undefined;

export default defineConfig({
  site,
  integrations: site ? [sitemap()] : [],
});
