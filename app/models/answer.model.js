const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
  value: Joi.string().required(),
  isCorrect: Joi.string(),
  type: Joi.boolean(),
  questionId: Joi.string(),
})
