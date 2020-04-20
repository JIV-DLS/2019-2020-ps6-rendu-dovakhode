const Quiz = require('./quiz.model.js')
const Question = require('./question.model.js')
const Answer = require('./answer.model.js')
const Evolution = require('./evolution.model')
const QuestionPlayed = require('./QuestionPlayed.model')
const Profiles = require('./profils.model')
const Theme = require('./theme.model')
const SubTheme = require('./subtheme.model')


module.exports = {
  Quiz, Question, Answer, Evolution, QuestionPlayed, Profiles,SubTheme, Theme
}
