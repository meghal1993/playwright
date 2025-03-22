import { defineConfig, devices } from '@playwright/test';

if (!process.env.NODE_ENV) {
  require('dotenv').config({ path: `${__dirname}//src//config//.env` })
}
else {
  require('dotenv').config({ path: `${__dirname}//src//config//.env.${process.env.NODE_ENV}` })
}

export default defineConfig({
  testDir: './src/tests',                                     // Path to the test files
  timeout: 50 * 1000,                                         // Timeout for each test
  expect: {                                                   // Timeout for expect statements
    timeout: 5 * 1000
  },
  reporter:'html', 
  workers: 3,                                                 //Execute test files in parallel mode (by deafult 5) if 1 then all files run in serial mode
  retries: 1,                                                 // Number of retries for each test
  use: {
    baseURL: 'https://pas.seer.software/user-auth/login',
    screenshot: "on",
    video: "retain-on-failure",
    headless: false,                                          // Have to run in headed mode
    viewport: null,                                           // Ensures full-screen size
    launchOptions: {
      args: ['--start-maximized']                             // Opens browser in full-screen
    }
  },

  projects: [
    {
      name: 'Chrome Execution',
      use: {
        ...devices['Desktop Chrome'],
        // viewport: { width: 720, height: 720 },
        video: "retain-on-failure",
      }
    },
    {
      name: 'Firefox Execution',
      use: {
        ...devices['Desktop Firefox'],
        headless: true,
        screenshot: "only-on-failure",
      },
    },
  ],
});
