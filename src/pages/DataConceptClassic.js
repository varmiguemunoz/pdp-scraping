const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

const DataConceptMaple = async () => {
  const browser = await puppeteer.launch({
    headless: false
  })

  const page = await browser.newPage()
  page.setDefaultNavigationTimeout(1200000)
  await page.goto(
    'https://www.pacificdrums.com/drums/concept-maple-classic-natural-stain-with-walnut-stain-hoops-bop-kit'
  )

  const data = []

  const descTextDivs = await page.$$('.desc-text')
  const secondDescTextDiv = descTextDivs[1]
  const shellSizesElement = await secondDescTextDiv.$('div')
  const titleElement = await page.$('.c-page-title h3')
  const mainDescriptionElement = await page.$('.desc-text div')

  const title = await page.evaluate(
    element => element.textContent,
    titleElement
  )

  const shellSizes = await page.evaluate(element => {
    return element.textContent
  }, shellSizesElement)

  const mainDescription = await page.evaluate(
    element => element.textContent,
    mainDescriptionElement
  )

  // imagenes adds on:

  const imageLinks = await page.$$eval('.colorbox img', elements => {
    return elements.map(element => element.src)
  })

  const ConceptImages = []

  for (let i = 0; i < imageLinks.length; i++) {
    ConceptImages.push(imageLinks[i])
  }

  // Down assets images:

  const DownAssetImages = await page.$$eval(
    '.masonry.gutterless .column',
    elements => {
      return elements.map(element => {
        const imgSrc = element.querySelector('img').src
        const description = element.querySelector('p').textContent
        return { imgSrc, description }
      })
    }
  )

  const ConceptAssetImages = []

  for (let i = 0; i < DownAssetImages.length; i++) {
    ConceptAssetImages.push(
      DownAssetImages[i].description,
      DownAssetImages[i].imgSrc
    )
  }

  // imagenes del carrousel:
  const carrouselImages = await page.$$eval('.bxslider li img', elements => {
    return elements.map(element => element.src)
  })

  const carrousel = []

  for (let i = 0; i < carrouselImages.length; i++) {
    carrousel.push(carrouselImages[i])
  }

  data.push({
    title,
    shellSizes,
    mainDescription,
    carrousel,
    ConceptImages,
    ConceptAssetImages
  })

  console.log(data)

  const outputPath = path.join(__dirname, '../../data', 'ConceptClassic.json')

  fs.writeFile(outputPath, JSON.stringify(data, null, 2), function (err) {
    if (err) {
      throw err
    }
    console.log('Archivo exportado con exito')
  })

  await browser.close()
}

module.exports = DataConceptMaple
