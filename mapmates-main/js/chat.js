// ==================== Chat/Messaging Module ====================

// Initialize messages storage
function initMessages() {
    if (!localStorage.getItem('messages')) {
        localStorage.setItem('messages', JSON.stringify({}));
    }
}

// Get messages for a specific chat
function getMessages(chatId) {
    initMessages();
    const allMessages = JSON.parse(localStorage.getItem('messages'));
    return allMessages[chatId] || [];
}

// Send a message
function sendMessage(chatId, content) {
    initMessages();
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        return false;
    }
    
    const allMessages = JSON.parse(localStorage.getItem('messages'));
    
    if (!allMessages[chatId]) {
        allMessages[chatId] = [];
    }
    
    const newMessage = {
        id: generateId(),
        chatId: chatId,
        senderId: currentUser.id,
        senderName: currentUser.name,
        content: content,
        timestamp: new Date().toISOString(),
        read: false
    };
    
    allMessages[chatId].push(newMessage);
    localStorage.setItem('messages', JSON.stringify(allMessages));
    
    return true;
}

// Delete a message
function deleteMessage(chatId, messageId) {
    initMessages();
    const allMessages = JSON.parse(localStorage.getItem('messages'));
    
    if (!allMessages[chatId]) {
        return false;
    }
    
    allMessages[chatId] = allMessages[chatId].filter(m => m.id !== messageId);
    localStorage.setItem('messages', JSON.stringify(allMessages));
    
    return true;
}

// Mark messages as read
function markMessagesAsRead(chatId, userId) {
    initMessages();
    const allMessages = JSON.parse(localStorage.getItem('messages'));
    
    if (!allMessages[chatId]) {
        return;
    }
    
    allMessages[chatId] = allMessages[chatId].map(msg => {
        if (msg.senderId !== userId) {
            return { ...msg, read: true };
        }
        return msg;
    });
    
    localStorage.setItem('messages', JSON.stringify(allMessages));
}

// Get unread message count for a chat
function getUnreadCount(chatId, userId) {
    const messages = getMessages(chatId);
    return messages.filter(m => m.senderId !== userId && !m.read).length;
}

// Get all conversations for current user
function getUserConversations() {
    initMessages();
    const currentUser = getCurrentUser();
    const allMessages = JSON.parse(localStorage.getItem('messages'));
    const conversations = [];
    
    for (const chatId in allMessages) {
        const messages = allMessages[chatId];
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            const unreadCount = getUnreadCount(chatId, currentUser.id);
            
            conversations.push({
                chatId: chatId,
                lastMessage: lastMessage,
                unreadCount: unreadCount,
                lastMessageTime: lastMessage.timestamp
            });
        }
    }
    
    // Sort by most recent
    conversations.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
    
    return conversations;
}

// Create a chat ID between two users
function createChatId(userId1, userId2) {
    // Sort IDs to ensure consistent chat ID
    const ids = [userId1, userId2].sort();
    return `${ids[0]}_${ids[1]}`;
}

// Get chat participant info
function getChatParticipant(chatId, currentUserId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Extract user IDs from chat ID
    const userIds = chatId.split('_');
    const otherUserId = userIds.find(id => id !== currentUserId);
    
    if (otherUserId) {
        return users.find(u => u.id === otherUserId);
    }
    
    return null;
}

// Search messages
function searchMessages(query) {
    initMessages();
    const allMessages = JSON.parse(localStorage.getItem('messages'));
    const results = [];
    
    for (const chatId in allMessages) {
        const messages = allMessages[chatId];
        const matchingMessages = messages.filter(m => 
            m.content.toLowerCase().includes(query.toLowerCase())
        );
        
        if (matchingMessages.length > 0) {
            results.push({
                chatId: chatId,
                messages: matchingMessages
            });
        }
    }
    
    return results;
}

// Clear chat history
function clearChatHistory(chatId) {
    initMessages();
    const allMessages = JSON.parse(localStorage.getItem('messages'));
    
    if (allMessages[chatId]) {
        delete allMessages[chatId];
        localStorage.setItem('messages', JSON.stringify(allMessages));
        return true;
    }
    
    return false;
}
