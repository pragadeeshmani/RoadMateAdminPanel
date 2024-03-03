const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('Users', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;