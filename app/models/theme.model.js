const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Theme', {
    id: Joi.number(),
    label: Joi.string().required(),
    subTheme: Joi.array()
})
