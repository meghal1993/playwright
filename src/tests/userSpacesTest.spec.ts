import {test} from "@playwright/test"
import LoginPage from "../pages/LoginPage"
import HomePage from "../pages/HomePage"
import { decrypt } from "../utils/CryptojsUtil";
import UserSpacesPage from "../pages/UserSpacesPage";
import userData from "../testData/addUser.json";


test.beforeEach(async ({page}) => {    
    await page.goto('/app/dashboard');
})

test.skip("Verify user is able to a new user -  spec File 3", async ({page}) => {
    const homePage = new HomePage(page);
    const userSpacesPage = new UserSpacesPage(page)

    await homePage.clickUserAndSpacesTab()
    await userSpacesPage.clickAddUserButton()
    await userSpacesPage.enterUserName(userData[0].username)
    await userSpacesPage.enterUserEmail(userData[0].email)
})

