const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const ThemesRouter = require('./Theme')
const EvolutionRouter = require('./evolution')
const ProfilRouter = require('./profil')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/evolution', EvolutionRouter)
router.use('/profil', ProfilRouter)
router.use('/theme', ThemesRouter)
module.exports = router
