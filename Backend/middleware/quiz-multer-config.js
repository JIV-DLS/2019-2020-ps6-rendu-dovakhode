const multer = require('multer')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, (file.originalname.indexOf('quiz') === 0) ? 'images/quiz'
      : (file.originalname.indexOf('question') === 0) ? 'images/question' : 'images/answer')
  },
  filename: (req, file, callback) => {
    console.log(req.body);
    let name
    if (file.originalname.indexOf('quiz') === 0
        || file.originalname.indexOf('question') === 0
        || file.originalname.indexOf('answer') === 0) {
      /* console.log(file.originalname.split('/')[0])
      console.log(file.originalname.split('/')[1]) */
      console.log(file.originalname)
      name = file.originalname.split(' ')
      name.splice(0, 1)
      name = name.join('_')
    } else {
      name = file.originalname.split(' ').join('_')
    }
    const extension = MIME_TYPES[file.mimetype]
    callback(null, `${name + Date.now()}.${extension}`)
  },
})

// module.exports = multer({ storage }).single('image')
module.exports = multer({ storage }).array('quiz_image', 5)
