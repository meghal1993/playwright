import {Page , expect} from "@playwright/test"
import logger from "../utils/LoggerUtil";


export default class HomePage{
    private readonly exitButtonSelector = "Exit"
    private readonly dashboardTitleSelector = ".title.seer-display-md-regular"
    private readonly analysisButtonSelector = "Analyses"
    private readonly menuList = 'mat-nav-list'
    private readonly userAndSpacesButtonSelector = "Users & Spaces"

    constructor(private page: Page){

    }

    //click on Exit button
    async clickExitButton(){
        await this.page.getByText(this.exitButtonSelector).click()
        .catch((error)=> {
            logger.error(`Error clicking Exit button: ${error}`)
            throw error;
        }).then(()=>{
            logger.info("Clicked on Exit button")
        })
    }

    //Verify if Dashboard title is visible or not on home page
    async expectDashboardTitleToBeVisible(){
        try {
            await expect(this.page.locator(this.dashboardTitleSelector)).toHaveText("Dashboard");
            logger.info("Dashboard title is visible");
        } catch (error) {
            logger.error(`Dashboard title is not visible: ${error}`);
            throw error;
        }
    }

    //Clcik on Analysis tab
    async clickAnalysisTab(){
        await this.page.locator(this.menuList).getByText(this.analysisButtonSelector).click()
        .catch((error)=> {
            logger.error(`Error clicking Analysis button: ${error}`)
            throw error;
        }).then(()=>{
            logger.info("Clicked on Analysis button")
        })
    }

    //Clcik on User and Spaces tab 
    async clickUserAndSpacesTab(){
        await this.page.locator(this.menuList).getByText(this.userAndSpacesButtonSelector).click()
        .catch((error)=> {
            logger.error(`Error clicking User and Spaces button: ${error}`)
            throw error;
        }).then(()=>{
            logger.info("Clicked on User and Spaces button")
        })
    }
}