const express = require('express');
const pollRouter = express.Router();
const { handleCreateNewPoll, handleGetAllPolls, handleUpdatePoll, handlePollsAnalaytics, handleSubmitForAPoll, handleGetAllQuestionsForAPolls } = require('../controllers/poll.controller')

pollRouter.post('/polls', handleCreateNewPoll)
pollRouter.get('/polls', handleGetAllPolls)
pollRouter.get('/polls/:pollId/questions', handleGetAllQuestionsForAPolls)
pollRouter.put('/polls/:pollId', handleUpdatePoll)
pollRouter.post('/polls/:pollId/submit', handleSubmitForAPoll)
pollRouter.get('/polls/:pollId/analytics', handlePollsAnalaytics)
pollRouter.get('/polls/analytics', handlePollsAnalaytics)

module.exports = pollRouter;