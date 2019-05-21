/**
  Actually we do not support raw file types like:
    ARW: image/x-sony-arw
    CR2: image/x-canon-cr2
    CRW: image/x-canon-crw
    DCR: image/x-kodak-dcr
    DNG: image/x-adobe-dng
    ERF: image/x-epson-erf
    K25: image/x-kodak-k25
    KDC: image/x-kodak-kdc
    MRW: image/x-minolta-mrw
    NEF: image/x-nikon-nef
    ORF: image/x-olympus-orf
    PEF: image/x-pentax-pef
    RAF: image/x-fuji-raf
    RAW: image/x-panasonic-raw
    SR2: image/x-sony-sr2
    SRF: image/x-sony-srf
    X3F: image/x-sigma-x3f

 */

const fileType = require('file-type')
const readExif = require('piexifjs')

/* File formats that contain exif informations */
const exifFileTypes = [
  'image/jpeg',
  'image/tiff',
]

/* File formats that are images we can handle */
const imegeFileTypes = [
  'image/jpeg',
  'image/tiff',
  'image/gif',
  'image/png',
]

/**
 *
 */
function photoif(fileAsString) {
  const pif = {
    type: null
  }

  pif.type = fileType(fileAsString)

  // no type so nothing to do
  if (!pif.type) {
    return pif
  }

  // get exif data if type is one of possible image
  if (exifFileTypes.includes(pif.type.mime)) {
    pif.exif = readExif.load(fileAsString.toString('binary'))
  }

  // get p

  return pif
}

module.exports = photoif
