
const { Router } = require('express')

const fs = require('fs')

const { Quiz } = require('../../models')


const router = new Router()

const QuestionsRouter = require('./questions')


const multer = require('../../../middleware/quiz-multer-config')


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
    const questions = QuestionsRouter.getQuestionsByQuizId(req.params.id)
    quiz.questions = questions != null ? questions : []
    res.status(200).json(quiz)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/', (req, res) => {
  try {
    const quizzes = Quiz.get()
    for (let i = 0; i < quizzes.length; i++) { quizzes[i].questions = QuestionsRouter.getQuestionsByQuizId(quizzes[i].id) }
    res.status(200).json(quizzes)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', multer, (req, res) => {
  try {
    res.status(201).json(createQuiz(req.file ? {
      ...req.body.quiz,
      image: `${req.protocol}://${req.get('host')}/images/quiz/${req.file.filename}`,
    } : {
      ...req.body.quiz,
      image: ' ',
    }))
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

function deleteEntireQuiz(id) {
  Quiz.delete(id)
  const questions = QuestionsRouter.getQuestionsByQuizId(id)
  for (let i = 0; i < questions.length; i++) {
    QuestionsRouter.deleteEntireQuestion(questions[i].id)
  }
}


router.delete('/:id', (req, res) => {
  try {
    const tmp = Quiz.getById(req.params.id)
    const filename = tmp.image.split('/images/')[1]
    if (filename != null && filename.length > 1) {
      fs.unlink(`images/quiz/${filename}`, () => {
        deleteEntireQuiz(req.params.id)
      })
    } else {
      deleteEntireQuiz(req.params.id)
    }
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
  delete obj.questions
  delete obj.id
  const quiz = Quiz.update(id, obj)

  for (let i = 0; i < questions.length; i++) {
    questions[i].quizId = quiz.id
    // s'il la question n'existait pas(dans le frontend toute nouvelle question est crée avec l'id 0)
    if (questions[i].id === 0) {
      delete questions[i].id
      questions[i] = QuestionsRouter.createQuestion({ ...questions[i] })
    } else { // si la question existait déja
      const { id } = questions[i]
      questions[i] = QuestionsRouter.updateQuestion(id, { ...questions[i] })
    }
  }

  quiz.questions = questions
  return quiz
}
router.put('/:id', multer, (req, res) => {
  try {
    res.status(201).json(updateQuiz(req.params.id, req.file ? {
      ...JSON.parse(req.body.quiz),
      image: `${req.protocol}://${req.get('host')}/images/quiz/${req.file.filename}`,
    } : {
      ...req.body.quiz,
    }))
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
