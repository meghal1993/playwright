import { Page, expect } from "@playwright/test"
import logger from "../utils/LoggerUtil";


export default class AnalysesPage {
    private readonly loadingDataSelector = "Loading Data..."
    private readonly svgCircleSelector = '[id^="SvgjsCircle"]'
    private readonly PCAAnalysisTextSelector = 'text="PCA analysis"'
    private readonly groupAnalysesTextSelector = 'text="Group Analyses"'
    private readonly ppiNetworkTextSelector = "PPI network"
    private readonly filteredPPINetworkTextSelector = 'text=/Filtered PPI Network/i'
    private readonly nodesSelector = '.nodes g'
    private readonly nodeTitlesSelector = '.nodes g title'
    private readonly tooltipTitleSelector = '.apexcharts-tooltip-title'
    private readonly tooltipBodySelector = '.apexcharts-tooltip-text-y-value'

    constructor(private page: Page) {

    }

    //click on Exit button
    async clickPlasmaSubTypeStudyButton() {
        await this.page.getByRole('cell', { name: ' Plasma Subtype Study' }).locator('span').click()
            .catch((error) => {
                logger.error(`Error clicking Plasma Subtype Study button: ${error}`)
                throw error;
            }).then(() => {
                logger.info("Clicked on Plasma Subtype Study button")
            })
    }

    //Wait for loader to complete the loading
    async waitForLoaderToCompleteLoading() {
        try {
            logger.info("Waiting for loader to complete loading");
            while (await this.page.getByText(this.loadingDataSelector).isVisible()) {
                await this.page.waitForTimeout(500); // Wait and check again
            }
            await this.page.waitForTimeout(2000);
            logger.info("Loader completed loading successfully");
        } catch (error) {
            logger.error(`Error while waiting for loader to complete: ${error}`);
            throw error;
        }
    }

    //Scroll to PCA Analyses graph
    async scrollToPCAAnalysesGraph() {
        try {
            logger.info("Attempting to scroll to PCA analysis graph");
            const pcaElement = this.page.locator(this.PCAAnalysisTextSelector).first();
            await pcaElement.scrollIntoViewIfNeeded(); // Scroll to the element
            await expect(pcaElement).toBeVisible();
            logger.info("Successfully scrolled to PCA analysis graph");
        } catch (error) {
            logger.error(`Error scrolling to PCA analysis graph: ${error}`);
            throw error;
        }
    }

    //Get all the data points in the PCA Analyses Graph (Print them)
    async verifyPCAAnalysesGraph() {
        await this.page.waitForTimeout(2000)
        const circles = this.page.locator(this.svgCircleSelector);
        const count = await circles.count();

        logger.info(`Found ${count} data points.`);

        for (let i = 18; i <= count - 2; i++) {
            try {
                const circle = circles.nth(i);
                await circle.waitFor({ state: 'visible', timeout: 5000 });
                await circle.hover();

                await this.page.waitForSelector(this.tooltipTitleSelector, { state: 'visible', timeout: 5000 });

                const tooltipHeading = this.page.locator(this.tooltipTitleSelector);
                const tooltipBody = this.page.locator(this.tooltipBodySelector).first();

                const tooltipHeadingText = await tooltipHeading.innerText();
                const tooltipBodyText = await tooltipBody.innerText();

                logger.info(`Point ${i} Tooltip Text: ${tooltipHeadingText} ${tooltipBodyText}`);
                await this.page.waitForTimeout(200);
            } catch (error) {
                logger.error(`Error processing point ${i}: ${error}`);
                continue;
            }
        }
    }

    //Scroll to PPI Network Graph
    async scrollToGroupAnalysesGraph() {
        try {
            const groupAnalysisElement = this.page.locator(this.groupAnalysesTextSelector).first();
            await groupAnalysisElement.scrollIntoViewIfNeeded(); // Scroll to the element
            await expect(groupAnalysisElement).toBeVisible();
            logger.info("Successfully scrolled to Group Analyses graph");
        }
        catch (error) {
            logger.error(`Error scrolling to Group Analyses graph: ${error}`);
            throw error;
        }
    }

    //Click on PPI Network Graph
    async clickOnPPINetwork() {
        await this.page.getByText(this.ppiNetworkTextSelector).click()
        logger.info("Clicked on PPI Network Graph");
    }

    //Verify if the filtered PIP Network graph is loaded or not
    async verifyFilteredPPINetworkGraphIsLoaded() {
        try {
            const filteredPPIText = this.page.locator(this.filteredPPINetworkTextSelector).first();
            await expect(filteredPPIText).toBeVisible({ timeout: 10000 });
            logger.info("Filtered PPI Network graph loaded successfully");
        } catch (error) {
            logger.error(`Error verifying Filtered PPI Network graph: ${error}`);
            throw error;
        }
    }

    //Verify the data points of Filtered PIP Network graph (Print them)
    async verifyFilteredPPINetworkGraph() {
        try {
            await this.page.waitForSelector(this.nodesSelector, { timeout: 10000 });
            const nodes = this.page.locator(this.nodesSelector);
            const count = await nodes.count();
            logger.info(`Found ${count} data points.`);

            const titles = await this.page.locator(this.nodeTitlesSelector).all();

            for (let i = 0; i < titles.length; i++) {
                try {
                    const nodeText = await titles[i].textContent();
                    logger.info(`Point ${i} Node Text: ${nodeText}`);
                } catch (error) {
                    logger.error(`Error processing node ${i}: ${error}`);
                    continue;
                }
            }
        } catch (error) {
            logger.error(`Error in verifyFilteredPPINetworkGraph: ${error}`);
            throw error;
        }
    }
}
