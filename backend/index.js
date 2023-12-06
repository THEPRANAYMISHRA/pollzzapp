const express = require('express')
const app = express()
const sequelize = require('./db');
const pollRouter = require('./routes/polls.routes')
app.use(express.json())


app.use("/api", pollRouter)


app.listen(4500, async () => {
    try {
        await sequelize.authenticate();
        console.log("Server is running at 4500")
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})