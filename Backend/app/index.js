const mongoose = require('mongoose')
const path = require('path')
const buildServer = require('./build-server.js')
const logger = require('./utils/logger.js')

/*
mongoose.connect('mongodb+srv://JIVDLS:jjjjjjjj@cluster0-zvo0t.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})
*/
buildServer((server) => logger.info(`Server is listening on port ${server.address().port}`))
