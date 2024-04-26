//@ts-nocheck
import * as playwright from "playwright";

import * as dotenv from "dotenv";
dotenv.config();

const setupVideoDirectory = "./test-results/global-setup";
const setupTracesArchivePath = "./test-results/global-setup/traces.zip";

// Add the plugin to playwright
async function setup(): Promise<void> {
  const browser = await playwright.chromium.launch({
    headless: false,
    args: ["--disable-blink-features=AutomationControlled"],
  });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    // recordVideo: { dir: setupVideoDirectory },
  });

  const page = await context.newPage();
  try {

    await page.goto(`https://app.toidispy.com/login`);
    await page.waitForLoadState();
    await page.evaluate(() =>
      document.querySelector('div[role="button"]').click()
    );
    const pagePopup = await page.waitForEvent("popup");
    await pagePopup
      .locator('input[type="email"]')
      .fill(process.env.EMAIL || "");
    await pagePopup.locator("#identifierNext").click();
    await pagePopup.waitForSelector('input[type="password"]');
    await pagePopup
      .locator('input[type="password"]')
      .fill(process.env.PASSWORD || "");
    await pagePopup.locator("#passwordNext").click();

    await page.waitForURL(`https://app.toidispy.com`);
    await page.context().storageState({ path: "./.auth/storage-state.json" });
  } catch (error) {
    // await context.tracing.stop({ path: setupTracesArchivePath });
    throw error;
  }

  await browser.close();
}
export default setup;
