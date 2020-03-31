
const { Router } = require('express')

const { Answer } = require('../../../../models')
const { Question } = require('../../../../models')


const router = new Router({ mergeParams: true })


function getAnswersByQuestionId(id) {
  id += ''
  const arr = Answer.get()
  const indexes = []; let i
  for (i = 0; i < arr.length; i++) { if ((arr[i].questionId == id)) { indexes.push(arr[i]) } }
  return indexes
}

router.get('/:idQ', (req, res) => {
  try {
    res.status(200).json(Answer.getById(req.params.idQ))
  } catch (err) {
    res.status(500).json(err)
  }
})
router.get('/', (req, res) => {
  try {
    res.status(200).json(getAnswersByQuestionId(req.params.id))
  } catch (err) {
    res.status(500).json(err)
  }
})
function createAnswer(obj = {}) {
  const answer = Answer.create({ ...obj })

  return answer
}
router.post('/', (req, res) => {
  try {
    res.status(201).json(createAnswer({ ...req.body, questionId: parseInt(req.params.id) }))
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:idQ', (req, res) => {
  try {
    const tmp = Answer.getById(req.params.idQ)
    Answer.delete(req.params.idQ)
    res.status(201).json(`${tmp.name}(id= )${tmp.id}is deleted`)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})
function updateAnswer(id, obj) {
  return Answer.update(id, { ...obj })
}
router.put('/:idQ', (req, res) => {
  try {
    const answer = updateAnswer(req.params.idQ, { ...req.body })
    res.status(201).json(answer)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})


module.exports = {
  createAnswer, updateAnswer, getAnswersByQuestionId, router,
}
