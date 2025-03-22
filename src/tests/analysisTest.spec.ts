import {test} from "@playwright/test"
import LoginPage from "../pages/LoginPage"
import HomePage from "../pages/HomePage"
import AnalysesPage from "../pages/AnalysesPage"
import { encrypt, decrypt } from "../utils/CryptojsUtil";
import { encryptEnvFile, decryptEnvFile } from "../utils/EncryptEnvFile";

test.beforeEach(async ({page}) => {    
    await page.goto('/app/dashboard');
})

test.skip("@Regression Verify PCA Analysis Graph in Analysis tab -  spec File 2", async ({page}) => {
    const homePage = new HomePage(page);
    const analysesPage = new AnalysesPage(page)

    await homePage.expectDashboardTitleToBeVisible()
    await homePage.clickAnalysisTab()
    await analysesPage.clickPlasmaSubTypeStudyButton()
    await page.waitForTimeout(3000)
    await analysesPage.waitForLoaderToCompleteLoading()
    await analysesPage.scrollToPCAAnalysesGraph()
    await analysesPage.verifyPCAAnalysesGraph()
})

test.skip("Verify PPI Network Graph in Group Analysis tab - spec file 2", async ({page}) => {
    const homePage = new HomePage(page);
    const analysesPage = new AnalysesPage(page)

    await homePage.expectDashboardTitleToBeVisible()
    await homePage.clickAnalysisTab()
    await analysesPage.clickPlasmaSubTypeStudyButton()
    await page.waitForTimeout(3000)
    await analysesPage.waitForLoaderToCompleteLoading()
    await analysesPage.scrollToGroupAnalysesGraph()
    await analysesPage.clickOnPPINetwork()
    await analysesPage.verifyFilteredPPINetworkGraphIsLoaded()
    await page.waitForTimeout(3000)
    await analysesPage.verifyFilteredPPINetworkGraph()
})
