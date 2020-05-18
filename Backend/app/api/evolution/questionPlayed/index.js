const { Router } = require('express')

const { QuestionPlayed } = require('../../../models')

const router = new Router({ mergeParams: true })
function getById(idQuiz, idQues) {
  const ques = []
  for (let i = 0; i < QuestionPlayed.items.length; i++) {
    if (QuestionPlayed.items[i].id === parseInt(idQues, 10) && QuestionPlayed.items[i].EvolutionId === parseInt(idQuiz, 10)) { ques.push(QuestionPlayed.items[i]) }
  }
  return ques
}

function get(id) {
  const ques = []
  for (let i = 0; i < QuestionPlayed.items.length; i++) {
    if (QuestionPlayed.items[i].EvolutionId === parseInt(id, 10)) {
      let finded = false;
      for (let j=0;j<ques.length;j++){
        if(ques[j].idQuestion==QuestionPlayed.items[i].idQuestion){
          ques[j].trials++;
          finded = true;
          break;
        }
      }
      if(!finded){
        if(QuestionPlayed.items[i].trials>1)
        QuestionPlayed.items[i].trials = 2;
      ques.push(QuestionPlayed.items[i])}
    }
  }
  return ques
}


router.post('/', (req, res) => {
  try {
    const question = QuestionPlayed.create({ ...req.body, EvolutionId: parseInt(req.params.evolutionId, 10) })
    res.status(201).json(question)
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
    const question = get(req.params.evolutionId)
    res.status(200).json(question)
  } catch (err) {
    res.status(500).json(err)
  }
})
router.get('/:idQues', (req, res) => {
  try {
    const question = getById(req.params.evolutionId, req.params.idQues)
    res.status(200).json(question)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
