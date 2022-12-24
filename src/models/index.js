'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const users = require('./users.js');

const recordModel=require("./record")



const DataCollection=require("./lib/data-collection");

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);


const userTable = users(sequelize, DataTypes);
const userCollection=new DataCollection(userTable);


const recordsTable = recordModel(sequelize, DataTypes);
const recordCollection=new DataCollection(recordsTable);
//relations//////////////////////////////////////



userTable.hasMany(recordsTable); // user many records
recordsTable.belongsTo(userTable); // record one user


module.exports = {
    db: sequelize,
    users: users(sequelize, DataTypes),
    userCollection:userCollection,
    recordCollection:recordCollection,
    recordsTable:recordsTable
  };