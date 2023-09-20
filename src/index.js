// const Data2023LTD = require('./pages/Data2023LTD')
// const DataConceptExotic = require('./pages/DataConceptExotic')
// const DataConceptMaple = require('./pages/DataConceptMaple')
const DataConceptClassic = require('./pages/DataConceptClassic')

const index = async () => {
  // await Data2023LTD()
  // await DataConceptExotic()
  await DataConceptClassic()
}

index()
