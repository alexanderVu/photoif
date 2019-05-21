const photoif = require('./index')
const {readFile} = require('fs').promises

const files = [
  './test/2019-01-22 21.36.39.jpg',
  './test/newPhoto.jpg',
  './test/ama025.jpg'
]

/**
 * Read file
 */
async function getFile(fileName) {
  return await readFile(fileName)
}

files.forEach(fotoPath => {
  getFile(fotoPath).then(fileAsString => {
    const pif = photoif(fileAsString)
    console.log(fotoPath, pif)
  }).catch(err => {
    console.error(err)
  })
})
