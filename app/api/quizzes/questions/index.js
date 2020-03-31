
const { Router } = require('express')
const { Question } = require('../../../models')
const { Answer } = require('../../../models')


const AnswersRouter = require('./answers')


const router = new Router({ mergeParams: true })

function getQuestionsByQuizId(id) {
  const idN = parseInt(id, 10)
  const arr = Question.get()
  const indexes = []; let i
  for (i = 0; i < arr.length; i++) {
    if ((arr[i].quizId == idN)) {
      arr[i].answers = AnswersRouter.getAnswersByQuestionId(arr[i].id)
      indexes.push(arr[i])
    }
  }
  return indexes
}

router.get('/:idQ', (req, res) => {
  try {
    const question = Question.getById(req.params.idQ)
    const answers = AnswersRouter.getAnswersByQuestionId(question.id)
    question.answers = answers != null ? answers : []
    res.status(200).json(question)
  } catch (err) {
    res.status(500).json(err)
  }
})
router.get('/', (req, res) => {
  try {
    res.status(200).json(getQuestionsByQuizId(req.params.id))
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
    AnswersRouter.createAnswer({ ...answers[i] })
  }
  question.answers = answers
  return question
}
router.post('/', (req, res) => {
  try {
    res.status(201).json(createQuestion({ ...req.body, quizId: parseInt(req.params.id) }))
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

function deleteEntireQuestion(id) {
  Question.delete(id)
  const answers = AnswersRouter.getAnswersByQuestionId(id)
  if (answers != null) {
    for (let i = 0; i < answers.length; i++) {
      Answer.delete(answers[i].id)
    }
  }
}
router.delete('/:idQ', (req, res) => {
  try {
    const tmp = Question.getById(req.params.idQ)
    deleteEntireQuestion(req.params.idQ)
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
    answers[i].quizId = question.quizId
    answers[i].questionId = question.id
    // s'il la question n'existait pas(dans le frontend toute nouvelle question est crée avec l'id 0)
    if (answers[i].id === 0) {
      delete answers[i].id
      answers[i] = AnswersRouter.createAnswer({ ...answers[i] })
    } else { // si la question existait déja
      const { id } = answers[i]
      answers[i] = AnswersRouter.updateAnswer(id, { ...answers[i] })
    }
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
  createQuestion, updateQuestion, getQuestionsByQuizId, deleteEntireQuestion, router,
}
