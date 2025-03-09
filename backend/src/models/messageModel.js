const connection = require('../config/db');

const createMessage = (senderId, receiverId, message) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)';
        connection.query(query, [senderId, receiverId, message], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const getMessages = (userId, receiverId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * FROM messages
            WHERE (sender_id = ? AND receiver_id = ?)
               OR (sender_id = ? AND receiver_id = ?)
            ORDER BY timestamp ASC
        `;
        connection.query(query, [userId, receiverId, receiverId, userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


module.exports = { createMessage, getMessages };
