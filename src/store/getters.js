export default {
    profile: state => state.profile,
    friends: state => state.friends,
    currentChatRoomId: state => state.currentChatRoom.id,
    currentChatRoom: state => state.currentChatRoom,
    chatHistoryRooms: state => state.chatHistoryRooms,
    chatHistory: state => state.chatHistory,
    mode: state => state.mode,
    notification: state => state.notification
};