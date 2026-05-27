const appEventEmitter = require("../../utils/appEventEmitter");


const messageController = async (ws, data) => {

    const savedMessage = {
        id: Date.now(),
        sender: ws.user.id,
        content: data.message
    };

    appEventEmitter.emit('MESSAGE_CREATED', {
        ws,
        message: savedMessage
    });
};

module.exports = messageController;