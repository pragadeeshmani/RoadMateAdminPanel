require('dotenv').config();

const { Sequelize } = require('sequelize');

var host = process.env.DB_HOST;
var port = process.env.DB_PORT;
var user = process.env.DB_USERNAME;
var password = process.env.DB_PASSWORD;
var database = process.env.DB_DATABASE;

const sequelize = new Sequelize(database, user, password, {
    host: host,
    port: port,
    dialect: 'mysql',
    logging: true
});

module.exports = sequelize;