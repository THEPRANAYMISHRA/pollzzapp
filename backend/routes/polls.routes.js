const express = require('express');
const pollRouter = express.Router();
const { handleCreateNewPoll, handleGetAllPolls, handleUpdatePoll, handlePollsAnalaytics, handleSubmitForAPoll } = require('../controllers/poll.controller')

pollRouter.post('/polls', handleCreateNewPoll)
pollRouter.get('/polls', handleGetAllPolls)
pollRouter.put('/polls/:pollId', handleUpdatePoll)
pollRouter.post('/polls/:pollId/submit', handleSubmitForAPoll)
// pollRouter.get('/polls/:pollId/analytics',)
pollRouter.get('/polls/analytics', handlePollsAnalaytics)

module.exports = pollRouter;