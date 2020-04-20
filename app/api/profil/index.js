const { Router } = require('express')
const { Profiles } = require('../../models')
const profilMulter = require('../../../middleware/profil-multer-config')


const router = new Router()

router.post('/', profilMulter, (req, res) => {
  try {
    const profil = Profiles.create(req.file ? {
      ...JSON.parse(req.body.profil),
      image: `${req.protocol}://${req.get('host')}/images/profil/${req.file.filename}`,
    } : {
      ...JSON.parse(req.body.profil),
      image: '',
    })
    res.status(201).json(profil)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.get('/', (req, res) => {
  try {
    res.status(200).json(Profiles.get())
  } catch (err) {
    res.status(500).json(err)
  }
})
router.get('/:profilId', (req, res) => {
  try {
    const quiz = Profiles.getById(req.params.profilId)
    res.status(200).json(quiz)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:profilId', (req, res) => {
  try {
    Profiles.delete(req.params.profilId)
    res.status(200).json('deleted')
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:profilId',profilMulter, (req, res) => {
  try {
    const profil = Profiles.update( req.params.profilId,req.file? {...JSON.parse(req.body.profil),
          image: `${req.protocol}://${req.get('host')}/images/profil/${req.file.filename}`,}:
        { ...JSON.parse(req.body.profil),
          image: '', })
    res.status(200).json(profil)
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router
