
const joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Profiles', {
  id: joi.number(),
  nom: joi.string(),
  prenom: joi.string(),
  age: joi.number(),
  sexe: joi.string(),
  stade: joi.string(),
  recommandations: joi.string(),
  evolId: joi.number(),
  image: joi.string().allow(''),

})
