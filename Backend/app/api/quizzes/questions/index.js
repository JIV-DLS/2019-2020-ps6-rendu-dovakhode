
const { Router } = require('express')
const fs = require('fs')
const { Question } = require('../../../models')
const { Answer } = require('../../../models')


const AnswersRouter = require('./answers')


const router = new Router({ mergeParams: true })

const multer = require('../../../../middleware/question-multer-config')

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

function getAnswersImage(req) {
  const answersImage = []
  for (let i = 0; i < req.files.length; i++) {
    if (req.files[i].originalname.indexOf('answer') === 0)answersImage.push(req.files[i])
  }
  return answersImage
}
function createQuestion(obj = {}, req, index) {
  const { answers } = obj
  delete obj.tmpUrl
  delete obj.answers
  const question = Question.create({ ...obj })
  const answersImage = getAnswersImage(req)
  for (let i = 0; i < answers.length; i++) {
    let answerImage
    for (let j = 0; j < answersImage.length; j++) {
      let coord = answersImage[j].originalname.split(' ')[0]
      coord = coord.split('_')
      if (+coord[1] === index && +coord[2] === i) {
        answerImage = answersImage[j]
        break
      }
    }
    answers[i].questionId = question.id
    answers[i] = AnswersRouter.createAnswer(answerImage
      ? {
        ...answers[i],
        image: `${req.protocol}://${req.get('host')}/images/answer/${answerImage.filename}`,
      }
      : { ...answers[i] })
  }
  question.answers = answers
  return question
}
router.post('/', multer, (req, res) => {
  try {
    res.status(201).json(createQuestion(req.file ? {
      ...JSON.parse(req.body.question),
      image: `${req.protocol}://${req.get('host')}/images/question/${req.file.filename}`,
    } : {
      ...JSON.parse(req.body.question),
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

function deleteEntireQuestion(id) {
  Question.delete(id)
  const answers = AnswersRouter.getAnswersByQuestionId(id)
  if (answers != null) {
    for (let i = 0; i < answers.length; i++) {
      const tmp = answers[i]
      if (!tmp.image) tmp.image = ''
      const filename = tmp.image.split('/images/answer/')[1]
      if (filename != null && filename.length > 1) {
        fs.unlink(`images/answer/${filename}`, () => {
          Answer.delete(tmp.id)
        })
      } else {
        try {
          Answer.delete(tmp.id)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
}
router.delete('/:idQ', (req, res) => {
  try {
    const tmp = Question.getById(req.params.idQ)
    if (!tmp.image) tmp.image = ''
    const filename = tmp.image.split('/images/question/')[1]
    if (filename != null && filename.length > 1) {
      fs.unlink(`images/question/${filename}`, () => {
        deleteEntireQuestion(req.params.idQ)
      })
    } else {
      try {
        deleteEntireQuestion(req.params.idQ)
      } catch (e) {
        console.log(e)
      }
    }
    res.status(201).json(`${tmp.name}(id= )${tmp.id}is deleted`)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})
function updateQuestion(id, obj, req, index) {
  const { answers } = obj
  delete obj.tmpUrl
  delete obj.answers
  const question = Question.update(id, { ...obj })
  const answersImage = getAnswersImage(req)
  for (let i = 0; i < answers.length; i++) {
    let answerImage
    for (let j = 0; j < answersImage.length; j++) {
      let coord = answersImage[j].originalname.split(' ')[0]
      coord = coord.split('_')
      if (+coord[1] === index && +coord[2] === i) {
        answerImage = answersImage[j]
        break
      }
    }
    answers[i].quizId = question.quizId
    answers[i].questionId = question.id
    // s'il la question n'existait pas(dans le frontend toute nouvelle question est crée avec l'id 0)
    if (answers[i].id === 0) {
      delete answers[i].id
      answers[i] = AnswersRouter.createAnswer(answerImage
        ? {
          ...answers[i],
          image: `${req.protocol}://${req.get('host')}/images/answer/${answerImage.filename}`,
        }
        : { ...answers[i] })
    } else { // si la question existait déja
      const { id } = answers[i]
      answers[i] = AnswersRouter.updateAnswer(id, answerImage
        ? {
          ...answers[i],
          image: `${req.protocol}://${req.get('host')}/images/answer/${answerImage.filename}`,
        }
        : { ...answers[i] })
    }
  }
  question.answers = answers
  return question
}
function getAQuestion(id) {
  const question = Question.getById(id)
  const answers = AnswersRouter.getQuestionsByQuizId(id)
  question.answers = answers != null ? answers : []
  return question
}
router.put('/:id', multer, (req, res) => {
  try {
    updateQuestion(req.params.id, req.file ? {
      ...JSON.parse(req.body.question),
      image: `${req.protocol}://${req.get('host')}/images/question/${req.file.filename}`,
    } : {
      ...JSON.parse(req.body.question),
    })
    res.status(201).json(getAQuestion(req.params.id))
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
