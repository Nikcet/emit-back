const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMatches,
  postMatch,
  getMatch,
  updateMatch,
} = require('../controllers/matches');

router.get('/', getMatch);

router.patch('/create', celebrate({
  body: Joi.object().keys({
    firstCommand: Joi.string().min(2).max(30),
    secondCommand: Joi.string().min(2).max(30),
    isRunning: Joi.boolean(),
    isPaused: Joi.boolean(),
    period: Joi.number(),
    seconds: Joi.number(),
    minutes: Joi.number(),
    firstCommandScore: Joi.number(),
    secondCommandScore: Joi.number(),
  }),
}), updateMatch);

router.post('/create', celebrate({
  body: Joi.object().keys({
    firstCommand: Joi.string().min(2).max(30),
    secondCommand: Joi.string().min(2).max(30),
    isRunning: Joi.boolean(),
    isPaused: Joi.boolean(),
    period: Joi.number(),
    seconds: Joi.number(),
    minutes: Joi.number(),
    firstCommandScore: Joi.number(),
    secondCommandScore: Joi.number(),
  }),
}), postMatch);

router.get('/results', getMatches);

module.exports = router;
