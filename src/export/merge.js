const fs = require('fs')
const path = require('path')

const dataFolderPath = path.join(__dirname, '../../data')

const jsonFiles = fs
  .readdirSync(dataFolderPath)
  .filter(file => file.endsWith('.json'))

// Objeto para almacenar los datos fusionados
const mergedData = []

const mergeJSONFiles = () => {
  jsonFiles.forEach(file => {
    try {
      const jsonFilePath = path.join(dataFolderPath, file)
      const jsonData = require(jsonFilePath)
      mergedData.push(jsonData)
    } catch (error) {
      console.error(`Error al fusionar ${file}:`, error)
    }
  })

  const outputPath = path.join(dataFolderPath, 'data.json')

  fs.writeFile(outputPath, JSON.stringify(mergedData, null, 2), err => {
    if (err) {
      console.error('Error al guardar el archivo fusionado:', err)
    } else {
      console.log('Archivos fusionados con éxito en data.json')
    }
  })
}

mergeJSONFiles()
