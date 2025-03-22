import {test, Page} from "@playwright/test"
import LoginPage from "../pages/LoginPage"
import HomePage from "../pages/HomePage"
import AnalysesPage from "../pages/AnalysesPage"
import { encrypt, decrypt } from "../utils/CryptojsUtil";
import { encryptEnvFile, decryptEnvFile } from "../utils/EncryptEnvFile";

// test.beforeAll(async () => {
//     await encryptEnvFile()
// });

// test.afterAll(async () => {
//     await decryptEnvFile()
// }); 

// test.describe.configure({mode:'parallel'})

test.beforeEach(async ({page}) => {    
    await page.goto('/app/dashboard');
})

test("@Regression Login into the application - spec file 1", async ({page}) => {
    const homePage = new HomePage(page);

    await homePage.expectDashboardTitleToBeVisible()
})

test("Verify PCA Analysis Graph in Analysis tab - spec file 1", async ({page}) => {
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

test("Verify PPI Network Graph in Group Analysis tab - spec file 1", async ({page}) => {
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

// test.afterEach(async(page)=> {
//     await page.close()
// })
