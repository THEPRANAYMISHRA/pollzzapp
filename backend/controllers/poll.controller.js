const { where } = require('sequelize');
const { Poll, QuestionSet } = require('../models/poll.model');

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

const handleGetAllPolls = async (req, res) => {
    let polls = await Poll.findAll()
    let questions = await QuestionSet.findAll()
    return res.status(200).send({ "Polls": polls, "questions": questions })
}


const handleUpdatePoll = async (req, res) => {
    let pollId = req.params.pollId
    let updatedData = req.body
    await Poll.update(updatedData, { where: { id: pollId } })
    return res.status(200).send({ "message": "updated successfully" })
}

const handleSubmitForAPoll = async (req, res) => {
    let pollId = req.params.pollId;
    let answers = req.body.answers;

    let totalsRewards = 0

    for (let key in answers) {
        let question = await QuestionSet.findOne({ where: { pollId: pollId, id: key } });
        if (question.answer == answers[key]) {
            totalsRewards += 100
        }
    }

    return res.send({ "Poll": totalsRewards })
}

const handlePollsAnalaytics = async (req, res) => {
    let polls = await Poll.findAll()
    let totalVotes = 0
    return res.status(200).send({ "Analaytics": polls })
}

module.exports = { handleCreateNewPoll, handleGetAllPolls, handleUpdatePoll, handleSubmitForAPoll, handlePollsAnalaytics }

