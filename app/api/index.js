const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const EvolutionRouter = require('./evolution')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/evolution', EvolutionRouter)
module.exports = router
