
const { Router } = require('express')

const { Question } = require('../../../models')


const router = new Router({ mergeParams: true })

function getByQuizId(id) {
  id += ''
  const arr = Question.get()
  const indexes = []; let i
  for (i = 0; i < arr.length; i++) {
    if ((arr[i].quizId === id)) {
      arr[i].answers = require('./answers').getByQuestionId(arr[i].id)
      indexes.push(arr[i])
    }
  }
  return indexes
}

router.get('/:idQ', (req, res) => {
  try {
    const question = Question.getById(req.params.id)
    const answers = require('./answers').getByQuestionId(question.id)
    question.answers = answers != null ? answers : []
    res.status(200).json(question)
  } catch (err) {
    res.status(500).json(err)
  }
})
router.get('/', (req, res) => {
  try {
    console.log('here gonna')
    res.status(200).json(getByQuizId(req.params.id))
  } catch (err) {
    res.status(500).json(err)
  }
})
function createQuestion(obj = {}) {
  const { answers } = obj
  delete obj.answers
  const question = Question.create({ ...obj })
  for (let i = 0; i < answers.length; i++) {
    answers[i].questionId = question.id
    require('./answers').createAnswer({ ...answers[i] })
  }
  question.answers = answers
  return question
}
router.post('/', (req, res) => {
  try {
    res.status(201).json(createQuestion({ ...req.body, quizId: req.params.id }))
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
    const tmp = Question.getById(req.params.id)
    Question.delete(req.params.id)
    res.status(201).json(`${tmp.name}(id= )${tmp.id}is deleted`)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})
function updateQuestion(id, obj) {
  const { answers } = obj
  delete obj.answers
  const question = Question.update(id, { ...obj })
  for (let i = 0; i < answers.length; i++) {
    require('./answers').updateAnswer(answers[i].id, { ...answers[i] })
  }
  question.answers = answers
  return question
}
router.put('/:idQ', (req, res) => {
  try {
    res.status(201).json(updateQuestion(req.params.idQ, { ...req.body }))
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.use('/:id/answers', require('./answers').router)

module.exports = {
  createQuestion, updateQuestion, getByQuizId, router,
}
