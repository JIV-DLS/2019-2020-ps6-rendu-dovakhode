const joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuestionPlayed', {
  id: joi.number(),
  // questionsPlayed: any[],
  EvolutionId: joi.number().required(),

})
