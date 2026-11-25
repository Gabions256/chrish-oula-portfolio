import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const configuredSite = process.env.SITE_URL;
const site = configuredSite ? new URL(configuredSite).toString() : undefined;

export default defineConfig({
  site,
  integrations: site ? [sitemap()] : [],
});
