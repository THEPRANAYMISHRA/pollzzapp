const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

// const sequelize = new Sequelize('sqlite::memory:', {
//     logging: console.log
// })

module.exports = sequelize;