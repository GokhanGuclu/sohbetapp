const User = require('../models/userModel');

exports.searchUsers = async (req, res) => {
    try {
        const searchQuery = req.query.search;
        const users = await User.searchUsers(searchQuery);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sunucu hatası', error });
    }
};