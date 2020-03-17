const { Router } = require('express')

const { User } = require('../../models')


const router = new Router()


router.get('/:id', (req, res) => {
  try {
    const user = User.getById(req.params.id);
    res.status(200).json(user);
    res.status(200).json()
  } catch (err) {
    res.status(500).json(err)
  }
})
router.get('/', (req, res) => {
  try {
    res.status(200).json(User.get())
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const user = User.create({ ...req.body })
    res.status(201).json(user)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:id', (req, res) => {
  try {
    const tmp = User.getById(req.params.id);
    User.delete(req.params.id);
    res.status(201).json( tmp.name + '(id= )'+ tmp.id + 'is deleted')
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})
router.put('/', (req, res) => {
  try {
    const user = User.update(req.params.id, { ...req.body })
    res.status(201).json(user)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router
