import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify/functions";
import robotsTxt from "astro-robots-txt";
import UnoCSS from "@unocss/astro";
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "dracula"
    },
    remarkPlugins: [remarkReadingTime],
  },
  site: "https://lemosl.com.br/",
  integrations: [
    sitemap(),
    robotsTxt({
      sitemap: [
        "https://lemosl.com.br/sitemap-index.xml",
        "https://lemosl.com.br/sitemap-0.xml",
      ],
    }),
    UnoCSS({ injectReset: true })
  ],
  output: "server",
  adapter: netlify(),
});
