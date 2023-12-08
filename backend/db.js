const Sequelize = require('sequelize');
const databasePath = './database.sqlite';
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: databasePath,
});


// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

// const sequelize = new Sequelize('sqlite::memory:', {
//     logging: console.log
// })

module.exports = sequelize;