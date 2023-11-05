const express = require('express');
const bodyParser = require('body-parser');
const playerRoute=require('./routes/player')

const sequelize=require('./util/database')
var cors=require('cors')

const app = express();

app.use(cors())

app.use(bodyParser.json({ extended: false }));

app.use('/player',playerRoute)

sequelize.sync({force:false}).then((result)=>{
    app.listen(3000);
}).catch((err)=>{
    console.log(err)
})
