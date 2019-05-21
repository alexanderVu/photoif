/*
 * Convert Exif Tag Table from
 * https://sno.phy.queensu.ca/~phil/exiftool/TagNames/EXIF.html
 * to a valid json array and key / value object
 */
const fs = require('fs')
const path = require('path')

/**
 * Parse from list just the first element.
 * List is determinated by '\n'
 * @param {string} description
 * @returns {string}
 */
function stripName(description) {
  if (description.indexOf('\n') > 0) {
    return description.slice(0, description.indexOf('\n')).trim()
  }

  return description
}

/**
 * Go throu json array and clean up.
 * When name is missing so first value is a subtable of previous record.
 * @param {array} data is an array of objects
 * @returns {object}
 */
function convert(data) {
  const result = {
    array: [],
    keys: {}
  } 
  let previous = null

  data.forEach(element => {
    const id = parseInt(element['Tag ID'], 0)

    if (element['Tag Name'].length > 0) {
      const entry = {
        tag: id,
        name: element['Tag Name'],
        writable: element['Writable'] === '-' ? null : element['Writable'],
        group: element['Group'] === '-' ? null : element['Group'],
        desc: element['Values / Notes']
      }
      result.array.push(entry)
      result.keys[id] = stripName(element['Tag Name'])
      previous = Object.assign({}, entry)
    } else {
      previous.desc = element['Tag ID']
      result.array.splice(-1,1)
      result.array.push(previous)
    }
  });

  return result
}

const exifTags = convert(require('./exifTagSource.json'))
fs.writeFileSync(path.join(__dirname, 'exifTagsArray.json'), JSON.stringify(exifTags.array))
fs.writeFileSync(path.join(__dirname, 'exifTagsKeys.json'), JSON.stringify(exifTags.keys))
console.log(`Converted ${exifTags.array.length} exif tags and saved.`)

const exifGPSTags = convert(require('./exifGPSSource.json'))
fs.writeFileSync(path.join(__dirname, 'exifGPSArray.json'), JSON.stringify(exifGPSTags.array))
fs.writeFileSync(path.join(__dirname, 'exifGPSKeys.json'), JSON.stringify(exifGPSTags.keys))
console.log(`Converted ${exifGPSTags.array.length} exif GPS tags and saved.`)
