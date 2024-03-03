const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');
const md5 = require('md5');

async function getUserlogin(req, res) {
    const { email, password } = req.body;

    const user = await sequelize.query('SELECT * FROM Users where Email= :Email AND Password=:Password', {
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            Email: email,
            Password: md5(password)
        },
    });
    console.log(user);
    if (user.length !== 0) {
        res.status(200).json({ success: true, message: 'Login successful', user: user });
    } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
}

async function userSignup(req, res) {
    const { email, password, role } = req.body;


    const user = await sequelize.query('SELECT * FROM Users where Email= :Email AND Password=:Password', {
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            Email: email,
            Password: md5(password)
        },
    });

    if (user.length === 0) {
        const user = await sequelize.query('INSERT INTO Users (Email,Password,Role,createdAt,updatedAt) VALUES (:Email, :Password, :Role,:createdAt,:updatedAt)', {
            type: Sequelize.QueryTypes.INSERT,
            replacements: {
                Email: email,
                Password: md5(password),
                Role: role,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        });

        res.status(200).json({ success: true, message: 'Profile Created successful', user: [{Email: email, Password: password}]});
    } else {
        res.status(409).json({ success: false, message: 'User already exists' });
    }
}

module.exports = { getUserlogin, userSignup };