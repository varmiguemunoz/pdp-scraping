const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const Data2023LTD = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(1200000);

  await page.goto("https://www.pacificdrums.com/drums/2023LTD");

  const data = [];

  const titleElement = await page.$(".c-page-title h3");
  const mainDescriptionElement = await page.$(".desc-text div");
  const assetsDescriptionElement = await page.$(
    ".field-name-field-drum-copy-more p"
  );

  //Extraccion de las imagenes 1:

  const imageElements = await page.$$(".masonry .column img");
  const assetImage = [];

  for (const imgElement of imageElements) {
    const url = await page.evaluate((element) => {
      return element.getAttribute("src");
    }, imgElement);

    assetImage.push(url);
  }

  // Extraccion de las imagenes 2

  const bottomImages = await page.$$(".inset-bottom .column img");
  const downAssetImage = [];

  for (const img of bottomImages) {
    const url = await page.evaluate((element) => {
      return element.getAttribute("src");
    }, img);

    downAssetImage.push(url);
  }

  // extraccion del asset principal

  const textElements = await page.$$(
    ".moredesc-content .no-padding .ltd-header"
  );

  const titleMainAsset = await page.evaluate((element) => {
    return element.textContent;
  }, textElements[0]);

  // --------------- //

  const mainImageElements = await page.$$(
    ".moredesc-content .ltd-snare-wrapper img"
  );

  const assetMainImage = await page.evaluate((element) => {
    return element.getAttribute("src");
  }, mainImageElements[0]);

  // ------------ //

  const downTextElement = await page.$$(".moredesc-content .ltd-copy");

  const assetMainDescription = await page.evaluate((element) => {
    return element.textContent;
  }, downTextElement[0]);

  // descripcion de los assets

  const assetDescription = page.evaluate((element) => {
    return element.textContent;
  }, assetsDescriptionElement);

  //sheell sizes block

  const descTextDivs = await page.$$(".desc-text");
  const secondDescTextDiv = descTextDivs[1];
  const shellSizesElement = await secondDescTextDiv.$("div");

  const shellSizes = await page.evaluate((element) => {
    return element.textContent;
  }, shellSizesElement);

  // Extraer el texto del párrafo seleccionado

  const title = await page.evaluate(
    (element) => element.textContent,
    titleElement
  );
  const mainDescription = await page.evaluate(
    (element) => element.textContent,
    mainDescriptionElement
  );

  data.push({
    title,
    mainDescription,
    shellSizes,
    assetDescription,
    assetImage,
    titleMainAsset,
    assetMainImage,
    assetMainDescription,
    downAssetImage,
  });
  console.log(data);

  await browser.close();

  const outputPath = path.join(__dirname, "../../data", "2023_LTD.json");

  fs.writeFile(outputPath, JSON.stringify(data, null, 2), function (err) {
    if (err) {
      throw err;
    }
    console.log("Su archivo fu exportado con exito!");
  });
};

module.exports = Data2023LTD;
