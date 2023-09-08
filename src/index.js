const puppeteer = require('puppeteer')

const pdpScraping = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100
  })

const page = await browser.newPage();
page.setDefaultNavigationTimeout(1200000);

await page.goto("")

}

pdpScraping()


