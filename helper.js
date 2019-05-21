const exifGPSTags = require('./exif/exifGPSKeys.json')
const exifTags = require('./exif/exifTagsKeys.json')

/*
 *
 */
function setExifTags(origin) {
  const structure = Object.keys(origin)
  const restructure = ['0th', 'Exif', '1th', 'GPS']

  const result = Object.assign({}, origin)
  restructure.forEach(key => {
    const lookup = key === 'GPS' ? exifGPSTags : exifTags
    if (origin[key]) {
      const subKeys = Object.keys(origin[key])
      result[key] = {}

      subKeys.forEach(subKey => {
        if (lookup[subKey]) {
          result[key][lookup[subKey]] = unescape(origin[key][subKey])
        } else {
          result[key][subKey] = unescape(origin[key][subKey])
        }
      })
    }
  })

  return result
}

module.exports = {
  setExifTags
}
