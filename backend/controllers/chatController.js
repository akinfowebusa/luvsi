const mongoose = require('mongoose');
const Chat = require("../models/Chat.js");
const Message = require("../models/message");
const User = require("../models/asifUser");
const message = require('../models/message');
const { error } = require('console');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.user && req.user.id;
    const { toUserId, text, media } = req.body;

    if (!senderId) return res.status(401).json({ message: "Unauthorized" });
    if (!toUserId || !isValidId(toUserId)) return res.status(400).json({ message: 'Invalid toUserId' });
    if (!text && !media) return res.status(400).json({ message: 'Empty Message' });
    if (senderId === toUserId) return res.status(400).json({ message: "Can't message yourself" });

    const recipient = await User.findById(toUserId).select('_id');
    if (!recipient) return res.status(404).json({ message: 'Recipient not found' });

    
    await Message.create({ senderId: senderId, receiverId: toUserId, text: text || '', media: media || null, seen: false });

    
    let chat = await Chat.findOne({ participants: { $all: [senderId, toUserId] } });
    const messageObj = { sender: senderId, text: text || '', media: media || null, read: false, createdAt: new Date() };

    if (!chat) {
      chat = new Chat({ participants: [senderId, toUserId], messages: [] });
    }

    chat.messages.push(messageObj);
    await chat.save();

    const io = req.app && req.app.get && req.app.get('io');
    if (io) {
      io.to(toUserId.toString()).emit('chat:new_message', { chatId: chat._id, message: messageObj });
      io.to(senderId.toString()).emit('chat:message_sent', { chatId: chat._id, message: messageObj });
    }

    return res.status(201).json({ success: true, data: { chatId: chat._id, message: messageObj } });
  } catch (err) {
    console.error('sendMessage error:', err);
    return res.status(500).json({ success: false, message: 'server error', error: err.message });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const { chatId, withUserId } = req.query;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    let chat = null;
    if (chatId && isValidId(chatId)) {
      chat = await Chat.findById(chatId).populate('participants', 'fullName username images');
    } else if (withUserId && isValidId(withUserId)) {
      chat = await Chat.findOne({ participants: { $all: [userId, withUserId] } }).populate('participants', 'fullName username images');
    } else {
      return res.status(400).json({ message: 'chatId or withUserId required' });
    }

    if (!chat) return res.status(404).json({ message: 'Conversation not found' });

    let modified = false;
    chat.messages.forEach((m) => {
      if (!m.read && m.sender.toString() !== userId.toString()) {
        m.read = true;
        modified = true;
      }
    });
    if (modified) await chat.save();
    return res.status(200).json({ success: true, data: chat });
  } catch (err) {
    console.error('get Conversation error:', err);
    return res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};

exports.getConversationList = async (req,res) =>{
  try {
    const userId = req.user && req.user.id;
    if(!userId) return res.status(401).json({message: "Unauthorized"});

    const chats = await Chat.find({participants: userId})
    .populate('participants','fullname username images')
    .sort ({updatedAt : -1});

    if(!chats || chat.length ===0){
      res.status(200).json({success: true ,conversations : []});

    }
    res.status(200).json({success : true , conversations : chats});
  }catch(err){
console.error("getConversationList error", err);
return res.status(500).json({success : false, message: "Server error", error: err.message}) ;
  }
}

exports.markAsRead = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const { chatId } = req.body;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!chatId || !isValidId(chatId)) return res.status(400).json({ message: 'Invalid chatId' });

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    let modified = false;
    chat.messages.forEach((m) => {
      if (!m.read && m.sender.toString() !== userId.toString()) {
        m.read = true;
        modified = true;
      }
    });
    if (modified) await chat.save();
    return res.status(200).json({ success: true, message: 'Marked as read' });
  } catch (err) {
    console.error('markedAsRead error:', err);
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

exports.deleteConversation = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const { chatId } = req.params;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    if (!chatId || !isValidId(chatId)) return res.status(400).json({ message: 'Invalid chatId' });

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(400).json({ message: 'Chat not found' });

    if (chat.participants.length <= 2) {
      await Chat.findByIdAndDelete(chatId);
      return res.status(200).json({ success: true, message: 'Conversation Deleted' });
    }
    chat.participants = chat.participants.filter((p) => p.toString() !== userId.toString());
    await chat.save();

    return res.status(200).json({ success: true, message: "left conversation" });
  } catch (err) {
    console.error('deleteConversation Error:', err);
    return res.status(500).json({ success: false, message: "server error", error: err.message });
  }
};