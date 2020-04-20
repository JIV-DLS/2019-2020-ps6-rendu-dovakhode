const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('SubTheme', {
    id: Joi.number(),
    label: Joi.string().required(),
    themeId: Joi.number().allow(null)
})
