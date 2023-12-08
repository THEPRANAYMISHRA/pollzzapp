const { where } = require('sequelize');
const { Poll, QuestionSet } = require('../models/poll.model');

// this is for creating a new poll and question set
const handleCreateNewPoll = async (req, res) => {
    const { title, category, startDate, endDate, minimumReward, maximumReward, questionSets } = req.body;

    try {
        const poll = await Poll.create({
            title,
            category,
            startDate,
            endDate,
            minimumReward,
            maximumReward
        });

        await Promise.all(questionSets.map(async (questionSet) => {
            const { questionType, questionText, answer, options } = questionSet;

            await QuestionSet.create({
                questionType,
                questionText,
                options,
                answer,
                pollId: poll.id,
            });
        }));

        res.status(201).json({
            message: 'Poll created successfully',
            poll,
            questionSets,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// this is for getting all the available polls
const handleGetAllPolls = async (req, res) => {
    try {
        let polls = await Poll.findAll()
        let questions = await QuestionSet.findAll()
        return res.status(200).send({ "Polls": polls, "questions": questions })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// this is for getting questions from a specific poll

const handleGetAllQuestionsForAPolls = async (req, res) => {
    try {
        let pollId = req.params.pollId
        let pageNumber = parseInt(req.query.page)
        let questionPerPage = 2;
        const startIndex = (pageNumber - 1) * questionPerPage;
        const endIndex = pageNumber * questionPerPage;
        let totalQuestions = await QuestionSet.findAll({ where: { pollId: pollId } });
        let paginatedQuestions = totalQuestions.slice(startIndex, endIndex);
        let totalNumberOfQuestion = totalQuestions.length;
        let totalPages = Math.ceil(totalNumberOfQuestion / questionPerPage);
        return res.status(200).send({ "totalQuestions": paginatedQuestions, "totalPages": totalPages, "currentPage": pageNumber })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// this is for updating a specific poll details
const handleUpdatePoll = async (req, res) => {
    try {
        let pollId = req.params.pollId
        let updatedData = req.body
        await Poll.update(updatedData, { where: { id: pollId } })
        return res.status(200).send({ "message": "updated successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// this is for handling submition of answers for a specific poll
const handleSubmitForAPoll = async (req, res) => {
    try {
        let pollId = req.params.pollId;
        let answers = req.body.answers;
        let totalQuestions = await QuestionSet.findAll({ where: { pollId: pollId } });
        let poll = await Poll.findOne({ where: { id: pollId } });
        let currentVotes = poll.votes;
        let marksPerQuestion = poll.maximumReward / totalQuestions.length
        let totalsRewards = 0

        for (let key in answers) {
            let question = await QuestionSet.findOne({ where: { pollId: pollId, id: key } });
            if (question.questionType == "single selection") {
                if (question.answer[0] == answers[key]) {
                    totalsRewards += marksPerQuestion
                }
            } else {
                let sortedAraayOfAnswer = question.answer.sort((a, b) => a - b)
                let sortedUserAnswers = answers[key].sort((a, b) => a - b)
                let isCorrect = true;
                for (let i = 0; i < sortedAraayOfAnswer.length; i++) {
                    if (sortedAraayOfAnswer[i] !== sortedUserAnswers[i]) {
                        isCorrect = false;
                        break;
                    }
                }
                if (isCorrect) {
                    totalsRewards += marksPerQuestion;
                }
            }
        }

        await poll.update({ votes: currentVotes + 1 })
        return res.send({ "correct": totalsRewards, "total": totalsRewards })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// this for getting analaytics of any poll
const handlePollsAnalaytics = async (req, res) => {
    try {
        let pollId = req.params.pollId;
        if (pollId) {
            let poll = await Poll.findOne({ where: { id: pollId } });
            let totalQuestions = await QuestionSet.findAll({ where: { pollId: pollId } });
            return res.status(200).send({ "Analaytics": poll })
        } else {
            let polls = await Poll.findAll()
            const analytics = polls.reduce((acc, poll) => {
                const { title, votes } = poll;
                if (!acc.hasOwnProperty(title)) {
                    acc[title] = votes;
                } else {
                    acc[title] += votes;
                }
                return acc;
            }, {});
            return res.status(200).send({ "Analaytics": analytics })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { handleCreateNewPoll, handleGetAllPolls, handleUpdatePoll, handleSubmitForAPoll, handlePollsAnalaytics, handleGetAllQuestionsForAPolls }

