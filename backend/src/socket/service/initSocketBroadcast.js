const WebSocket = require('ws');
const appEventEmitter = require('../../utils/appEventEmitter');


const initSocketBroadcast = (wss) => {

    appEventEmitter.on('MESSAGE_CREATED', ({ message }) => {

        wss.clients.forEach((client) => {

            if (client.readyState === WebSocket.OPEN) {

                client.send(JSON.stringify({
                    event: 'NEW_MESSAGE',
                    data: message
                }));
            }
        });

    });

};

module.exports = initSocketBroadcast;