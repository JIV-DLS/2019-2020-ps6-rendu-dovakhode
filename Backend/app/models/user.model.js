const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')
module.exports = new BaseModel('Quiz', {
  name: Joi.string().required(),
  email: Joi.string().required(),
})
