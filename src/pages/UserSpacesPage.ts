import { Page, expect } from "@playwright/test"
import logger from "../utils/LoggerUtil";


export default class UserSpacesPage {
    private readonly addUserButtonSelector = " Add User "
    private readonly userNameInputSelector = '[name="Username"]'
    private readonly userEmailInputSelector = '[name="email"]'


    constructor(private page: Page) {

    }

    //click on Add User button
    async clickAddUserButton() {
        await this.page.getByRole('button', { name: this.addUserButtonSelector}).click()
            .catch((error) => {
                logger.error(`Error clicking Add User button: ${error}`)
                throw error;
            }).then(() => {
                logger.info("Clicked on Add User button")
            })
    } 

    //Enter User Name
    async enterUserName(userName: string) {
        await this.page.locator(this.userNameInputSelector).fill(userName)
            .catch((error) => {
                logger.error(`Error entering User Name: ${error}`)
                throw error;
            }).then(() => {
                logger.info("Entered User Name")
            })
    }

    //Enter User Email
    async enterUserEmail(userEmail: string) {
        await this.page.locator(this.userEmailInputSelector).fill(userEmail)
            .catch((error) => {
                logger.error(`Error entering Email: ${error}`)
                throw error;    
            }).then(() => {
                logger.info("Entered Email")
            })
    }
    

}
