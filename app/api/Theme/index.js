const { Router } = require('express')
const sousThemeRouter = require('./Subtheme')

const { Theme } = require('../../models')

const router = new Router()

router.get('/', (req, res) => {
    try {
        res.status(200).json(Theme.get())
    } catch (err) {
        res.status(500).json(err)
    }
})
router.get('/:themeId', (req, res) => {
    try {
        const theme = Theme.getById(req.params.themeId)
        res.status(200).json(theme)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/:themeId', (req, res) => {
    try {
        Theme.delete(req.params.themeId)
        res.status(200).json('deleted')
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/:themeId', (req, res) => {
    try {
        delete req.body.subtheme
        const theme = Theme.update(req.params.themeId, { ...req.body })
        res.status(200).json(theme)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', (req, res) => {
    try {
        delete req.body.subtheme
        const theme = Theme.create({ ...req.body })
        res.status(201).json(theme)
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json(err.extra)
        } else {
            res.status(500).json(err)
        }
    }
})
router.use('/:themeId/subThemes', sousThemeRouter)

module.exports = router
