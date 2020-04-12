const multer = require('multer')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/quiz')
  },
  filename: (req, file, callback) => {
    console.log(file.originalname)
    const name = file.originalname.split(' ').join('_')
    const extension = MIME_TYPES[file.mimetype]
    callback(null, `${name + Date.now()}.${extension}`)
  },
})

// module.exports = multer({ storage }).single('image')
module.exports = multer({ storage }).array('image', 5)
