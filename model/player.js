const Sequelize=require('sequelize')

const sequelize=require('../util/database')

const Player=sequelize.define('player',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
    Name:{
        type:Sequelize.STRING,
        allowNull:false
    },

    Photourl:{
        type:Sequelize.TEXT,

    },
    Birthplace:{
        type:Sequelize.STRING,
        
        
    },

    Numberofmatches:{
        type:Sequelize.INTEGER,
        
    },
    Score:{
        type:Sequelize.INTEGER,
        
    },
    Fifties:{
        type:Sequelize.INTEGER,
        
    },
    Centuries:{
        type:Sequelize.INTEGER,

    },
    Wickets:{
        type:Sequelize.INTEGER,
    
    },
    Average:{
        type:Sequelize.INTEGER,
        
    },
    Description:{
        type:Sequelize.TEXT,
        
    },

})
module.exports=Player
