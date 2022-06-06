const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models')


const app = express()
app.use( cors() );
app.use(express.json())
app.listen({ port: 5000 }, async () => {
    console.log('Server up on http://localhost:5000')
    await sequelize.authenticate()
    //await sequelize.sync({alter: true})
    console.log('Database Connected!')
  })