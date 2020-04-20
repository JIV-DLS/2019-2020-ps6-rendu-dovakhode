const joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuestionPlayed', {
  id: joi.number(),
  trials: joi.number(),
  idQuestion: joi.number(),
  EvolutionId: joi.number(),
  date: Joi.date()

})
