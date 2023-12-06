const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Poll = sequelize.define('Poll', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    minimumReward: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        }
    },
    maximumReward: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
});

Poll.sync();


const QuestionSet = sequelize.define('QuestionSet', {
    questionType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['single selection', 'multiple selection']],
        },
    },
    questionText: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    options: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    answer: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

QuestionSet.belongsTo(Poll, { foreignKey: 'pollId', targetKey: 'id' });
QuestionSet.sync();

module.exports = { Poll, QuestionSet };
