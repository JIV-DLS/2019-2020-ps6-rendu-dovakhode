const { Router } = require('express')
const { Evolution } = require('../../models')
const questionPlayedRouter = require('./questionPlayed')

const router = new Router()

router.post('/', (req, res) => {
  try {
    const evol = Evolution.create({ ...req.body })
    res.status(201).json(evol)
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
    res.status(200).json(Evolution.get())
  } catch (err) {
    res.status(500).json(err)
  }
})
router.get('/:evolutionId', (req, res) => {
  try {
    const quiz = Evolution.getById(req.params.evolutionId)
    res.status(200).json(quiz)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:evolutionId', (req, res) => {
  try {
    Evolution.delete(req.params.evolutionId)
    res.status(200).json('deleted')
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:evolutionId', (req, res) => {
  try {
    const quiz = Evolution.update(req.params.evolutionId, { ...req.body })
    res.status(200).json(quiz)
  } catch (err) {
    res.status(500).json(err)
  }
})


router.use('/:evolutionId/questionPlayed', questionPlayedRouter)

module.exports = router
