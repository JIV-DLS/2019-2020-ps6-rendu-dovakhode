const { Router } = require('express')

const { Quiz } = require('../../models')

const router = new Router()

const QuestionsRouter = require('./questions')

function createQuiz(obj) {
  const { questions } = obj
  delete obj.questions
  delete obj.id
  const quiz = Quiz.create({ ...obj })

  for (let i = 0; i < questions.length; i++) {
    delete questions[i].id
    questions[i].quizId = quiz.id
    questions[i] = QuestionsRouter.createQuestion({ ...questions[i] })
  }
  quiz.questions = questions
  return quiz
}
router.get('/:id', (req, res) => {
  try {
    const quiz = Quiz.getById(req.params.id)
    const questions = QuestionsRouter.getByQuizId(req.params.id)
    quiz.questions = questions != null ? questions : []
    res.status(200).json(quiz)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/', (req, res) => {
  try {
    const quizzes = Quiz.get()
    for (let i = 0; i < quizzes.length; i++) { quizzes[i].questions = QuestionsRouter.getByQuizId(quizzes[i].id) }
    res.status(200).json(quizzes)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    res.status(201).json(createQuiz({ ...req.body }))
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
    const tmp = Quiz.getById(req.params.id)
    Quiz.delete(req.params.id)
    res.status(201).json(`${tmp.name}(id= ${tmp.id}) is deleted`)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})
function updateQuiz(id, obj) {
  const { questions } = obj
  // eslint-disable-next-line no-param-reassign
  delete obj.questions
  console.log('before')
  console.log(obj)
  const quiz = Quiz.update(id, { ...obj })
  console.log('after')
  console.log(obj)
  for (let i = 0; i < questions.length; i++) {
    QuestionsRouter.updateQuestion(questions[i].id, { ...questions[i] })
  }
  quiz.questions = questions
  return quiz
}
router.put('/:id', (req, res) => {
  try {
    res.status(201).json(updateQuiz(req.params.id, { ...req.body }))
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.use('/:id/questions', QuestionsRouter.router)
module.exports = router
