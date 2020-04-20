const { Router } = require('express')
const { SubTheme } = require('../../../models')


const router = new Router({ mergeParams: true })

function getById(idTheme, idSubTheme) {
    const ques = []
    for (let i = 0; i < SubTheme.items.length; i++) {
        if (SubTheme.items[i].id === parseInt(idSubTheme, 10) && SubTheme.items[i].themeId === parseInt(idTheme, 10)) { ques.push(SubTheme.items[i]) }
    }
    return ques
}

function get(id) {
    const ques = []
    for (let i = 0; i < SubTheme.items.length; i++) {

        if (SubTheme.items[i].themeId === parseInt(id, 10)) { ques.push(SubTheme.items[i]) }
    }
    return ques
}
router.put('/:subThemeId', (req, res) => {
    try {
        const subtheme = SubTheme.update(req.params.subThemeId, { ...req.body })
        res.status(200).json(subtheme)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', (req, res) => {
    try {
        const subTheme = SubTheme.create({ ...req.body, themeId:parseInt(req.params.themeId, 10) })
        res.status(201).json(subTheme)
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json(err.extra)
        } else {
            res.status(500).json(err)
        }
    }
})
router.get('/', (req, res) => {
    try {
        const question =  get(req.params.themeId);
        console.log(question.length)
        res.status(200).json(question)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.get('/:idSubTheme', (req, res) => {
    try {
        const question = getById(req.params.themeId, req.params.idSubTheme)
        res.status(200).json(question)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router
