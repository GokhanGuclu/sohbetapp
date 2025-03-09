const Message = require('../models/messageModel');

exports.sendMessage = async (req, res) => {
    try {
        const { receiverId, message } = req.body;
        const senderId = req.user.id;

        // Mesaj oluşturma işlemi
        await Message.createMessage(senderId, receiverId, message);

        res.status(201).json({ message: 'Mesaj gönderildi' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const senderId = req.user.id;   
        const receiverId = req.params.receiverId;

        const messages = await Message.getMessages(senderId, receiverId);

        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};
