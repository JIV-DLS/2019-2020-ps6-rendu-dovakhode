const { Router } = require('express')
const { Profiles } = require('../../models')


const router = new Router()

router.post('/', (req, res) => {
  try {
    console.log(req.body)
    const profil = Profiles.create({ ...req.body })
    console.log(profil)
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

router.put('/:profilId', (req, res) => {
  try {
    const profil = Profiles.update(req.params.profilId, { ...req.body })
    res.status(200).json(profil)
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router
