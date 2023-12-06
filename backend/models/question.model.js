// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');
// const Poll = require('./poll.model')

// const QuestionSet = sequelize.define('QuestionSet', {
//     questionType: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             isIn: [['single selection', 'multiple selection']],
//         },
//     },
//     questionText: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     options: {
//         type: DataTypes.ARRAY,
//         allowNull: true,
//     }
// });

// QuestionSet.belongsTo(Poll, { foreignKey: 'pollId', targetKey: 'id' });
// QuestionSet.sync();

// module.exports = QuestionSet;
