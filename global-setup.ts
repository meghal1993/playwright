import fs from 'fs';
import { chromium, firefox, webkit } from '@playwright/test';
import LoginPage from "./src/pages/LoginPage";
import HomePage from "./src/pages/HomePage";
import { encrypt, decrypt } from "./src/utils/CryptojsUtil";
import logger from "./src/utils/LoggerUtil";

const DIRECTORIES_TO_CLEAN = ['./allure-results', './src/logging', './src/auth', './playwright-report'];

const AUTH_DIR = './src/auth';
const AUTH_FILES = {
    chromium: `${AUTH_DIR}/auth-chromium.json`,
    firefox: `${AUTH_DIR}/auth-firefox.json`,
    webkit: `${AUTH_DIR}/auth-webkit.json`
};

// Ensure auth directory exists
if (!fs.existsSync(AUTH_DIR)) {
    fs.mkdirSync(AUTH_DIR, { recursive: true });
    logger.info(`Created auth directory: ${AUTH_DIR}`);
}

async function authenticateAndSaveState(browserType, authFile, browserName) {
    logger.info(`Launching ${browserName} for authentication...`);
    const browser = await browserType.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.userid!));
    await loginPage.fillPassword(decrypt(process.env.password!));
    await loginPage.clickContinueButton();

    await homePage.clickExitButton();

    // Save authentication state
    await context.storageState({ path: authFile });
    logger.info(`Saved auth state for ${browserName}: ${authFile}`);

    await browser.close();
}

async function globalSetup() {
    logger.info(`Cleaning up old directories...`);
    DIRECTORIES_TO_CLEAN.forEach((dir) => {
        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true, force: true });
            console.log(`Cleared directory: ${dir}`);
        }
    });

    logger.info(`Starting authentication setup...`);
    await Promise.all([
        authenticateAndSaveState(chromium, AUTH_FILES.chromium, 'Chromium'),
        // authenticateAndSaveState(firefox, AUTH_FILES.firefox, 'Firefox'),
        // authenticateAndSaveState(webkit, AUTH_FILES.webkit, 'Webkit')
    ]);
    logger.info(`All authentication states saved!`);
}

export default globalSetup;