import path from 'path';

import { defineConfig, devices } from '@playwright/test';

const BACKEND_PORT = 3334;
const WEB_PORT = 3001;

const backendDir = path.resolve(__dirname, '..', 'petfinder-backend');
const webDir = path.resolve(__dirname, '..', 'petfinder-web');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: `http://localhost:${WEB_PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command:
        'mkdir -p uploads-e2e && npx prisma db push --force-reset --accept-data-loss && yarn dev',
      cwd: backendDir,
      port: BACKEND_PORT,
      reuseExistingServer: false,
      timeout: 60_000,
      env: {
        PORT: String(BACKEND_PORT),
        APP_SECRET: 'e2e-test-secret',
        UPLOADS_BASE_URL: `http://localhost:${BACKEND_PORT}`,
        DATABASE_URL: 'file:./src/database/e2e.sqlite',
        UPLOADS_DIR: path.join(backendDir, 'uploads-e2e'),
        PET_IMAGE_VALIDATION_MOCK: 'true',
      },
    },
    {
      command: `yarn dev --port ${WEB_PORT} --strictPort`,
      cwd: webDir,
      url: `http://localhost:${WEB_PORT}`,
      reuseExistingServer: false,
      timeout: 60_000,
      env: {
        VITE_API_URL: `http://localhost:${BACKEND_PORT}`,
      },
    },
  ],
});
