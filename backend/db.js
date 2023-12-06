const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:', {
    logging: console.log
})

module.exports = sequelize;