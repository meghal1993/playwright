import { defineConfig, devices } from '@playwright/test';

if(!process.env.NODE_ENV){
  require('dotenv').config({path:`${__dirname}//src//config//.env`})
  }
  else{
    require('dotenv').config({path:`${__dirname}//src//config//.env.${process.env.NODE_ENV}`})
  }

export default defineConfig({
  globalSetup: './global-setup.ts',
  testDir: './src/tests',                                     // Path to the test files
  timeout: 90*1000,                                           // Timeout for each test
  expect: {                                                   // Timeout for expect statements
    timeout: 5*1000 
  },
  retries: 0,                                                 // Number of retries for each test
  workers: 1,                                                 // Files will run in serial mode
  use: {
    baseURL: process.env.LOGIN_URL || 'https://pas.seer.software',
    screenshot: "on",
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    headless: true,                                          // HAve to run in headed mode
    viewport: null,                                           // Ensures full-screen size
    launchOptions: {
    args: ['--start-maximized']  ,
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        storageState: './src/auth/auth-chromium.json',
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     browserName: 'firefox',
    //     storageState: './src/auth/auth-firefox.json',
    //     headless: true,
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     browserName: 'webkit',
    //     storageState: './src/auth/auth-webkit.json',
    //     headless: true,
    //   },
    // }
  ],

  reporter: [
    ['allure-playwright', {
      detail: true,
      outputFolder: "allure-results",
    }],
    ['html', { outputFolder: 'playwright-report', open: 'always' }]  // Generates an HTML report
  ],
});
