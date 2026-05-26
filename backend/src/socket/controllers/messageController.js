const appEventEmitter = require("../../utils/appEventEmitter");


const messageController = async (ws, payload) => {

    const savedMessage = {
        id: Date.now(),
        sender: ws.user.id,
        content: payload.message
    };

    appEventEmitter.emit('MESSAGE_CREATED', {
        ws,
        message: savedMessage
    });
};

module.exports = messageController;