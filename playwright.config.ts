import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://bestbuy.com',
    headless: false,
  },
});