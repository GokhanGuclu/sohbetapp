const Chat = require('../models/chatModel');

exports.startChat = async (req, res) => {
    try {
        const { otherUserId } = req.body;
        const userId = req.user.id;
        const chatId = await Chat.startChat(userId, otherUserId);
        res.json({ chatId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

exports.getChats = async (req, res) => {
    try {
        const userId = req.user.id;
        const chats = await Chat.getChats(userId);
        res.json(chats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};