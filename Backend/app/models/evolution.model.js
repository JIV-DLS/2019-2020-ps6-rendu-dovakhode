const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Evolution', {
  id: Joi.number(),
  questionPlayed: Joi.array(),
  quizId: Joi.number(),
  dateCreation: Joi.date(),
  patientId:Joi.number(),
  quizNom: Joi.string(),
  quizDifficulty : Joi.string(),
  quizQuestion : Joi.number(),

})
