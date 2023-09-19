const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const DataConceptExotic = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(1200000);

  await page.goto(
    "https://www.pacificdrums.com/drums/concept-exotic-honey-mahogany-5-piece"
  );

  const data = [];

  const titleElement = await page.$(".c-page-title h3");
  const mainDescriptionElement = await page.$(".desc-text div");
  const assetsDescriptionElement = await page.$(
    ".field-name-field-drum-copy-more p"
  );

  const assetDescription = page.evaluate((element) => {
    return element.textContent;
  }, assetsDescriptionElement);

  const title = await page.evaluate(
    (element) => element.textContent,
    titleElement
  );
  const mainDescription = await page.evaluate(
    (element) => element.textContent,
    mainDescriptionElement
  );

  data.push({ title, mainDescription, assetDescription });
};

module.exports = DataConceptExotic;
