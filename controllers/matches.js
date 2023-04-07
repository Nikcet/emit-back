const Match = require('../models/matchSchema');
const ValueError = require('../errors/value-error');
const NotFoundError = require('../errors/not-found-error');
// const BadRequestError = require('../errors/bad-request-error');

module.exports.getMatches = (req, res, next) => {
  Match.find({})
    .then((matches) => {
      res.send({ matches });
    })
    .catch(next);
};

module.exports.postMatch = (req, res, next) => {
  const {
    firstCommand,
    secondCommand,
    isRunning,
    isPaused,
    period,
    seconds,
    minutes,
    firstCommandScore,
    secondCommandScore,
  } = req.body;

  Match.create({
    firstCommand,
    secondCommand,
    isRunning,
    isPaused,
    period,
    seconds,
    minutes,
    firstCommandScore,
    secondCommandScore,
  })
    .then((newMatch) => {
      if (newMatch) {
        res.send(newMatch);
      } else {
        throw new ValueError('Value error');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValueError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.getMatch = (req, res, next) => {
  // const { id } = req.params;
  Match.findOne({ isRunning: true })
    .orFail(() => {
      throw new NotFoundError('The match not found.');
    })
    .then((match) => {
      res.send(match);
    })
    .catch(next);
};

module.exports.updateMatch = (req, res, next) => {
  const {
    firstCommand,
    secondCommand,
    isRunning,
    isPaused,
    period,
    seconds,
    minutes,
    firstCommandScore,
    secondCommandScore,
  } = req.body;

  Match.findOneAndUpdate({ isRunning: true }, {
    firstCommand,
    secondCommand,
    isRunning,
    isPaused,
    period,
    seconds,
    minutes,
    firstCommandScore,
    secondCommandScore,
  }, {
    new: true,
    runValidators: true,
  })
    .then((match) => {
      if (!match) {
        throw new NotFoundError('There are no ongoing matches at the moment.');
      }
      res.send({
        firstCommand,
        secondCommand,
        isRunning,
        isPaused,
        period,
        seconds,
        minutes,
        firstCommandScore,
        secondCommandScore,
      });
    })
    .catch((err) => {
      next(err);
    });
};
