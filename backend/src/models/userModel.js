const connection = require('../config/db');
const bcrypt = require('bcrypt');

const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        connection.execute(query, [email], (err, results) => {
            if (err) reject(err);
            if (results.length === 0) resolve(null);
            resolve(results[0]);
        });
    });
};

const createUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const query = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
        connection.execute(query, [username, email, hashedPassword], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const searchUsers = (searchQuery) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id, username FROM users WHERE username LIKE ?';
        connection.execute(query, [`%${searchQuery}%`], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    findUserByEmail,
    createUser,
    searchUsers,
};