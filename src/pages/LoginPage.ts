import {Page} from  "@playwright/test"
import logger from  "../utils/LoggerUtil";

export default class LoginPage{
private readonly usernameInputSelector = "#mat-mdc-form-field-label-0"
private readonly passwordInputSelector = '[placeholder="Enter password"]'
private readonly loginButtonSelector = "Continue"

constructor(private page : Page){

}
 
//Naviage to the Login Url
async navigateToLoginPage(){
    await this.page.goto(process.env.LOGIN_URL || 'https://pas.seer.software/user-auth/login');
    logger.info("Navigated to Login page")
}

//Enter UserName
async fillUsername(username: string){
    await this.page.locator(this.usernameInputSelector).fill(username)
    logger.info("Filled Username")
}

//Enter Password
async fillPassword(password: string){
    await this.page.locator(this.passwordInputSelector).fill(password)
    logger.info("Filled Password")
}

//Click on Continue Button
async clickContinueButton(){
    await this.page.getByText(this.loginButtonSelector).click()
    .catch((error) => {
        logger.error(`Error clicking Continue button: ${error}`)
        throw error;
    }).then(()=> logger.info("Clicked Continue button"))
}
}