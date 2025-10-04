const {_client} = require('./src/client');
const config = require('./config.json');

const clients = [];

config.tokens.forEach(token => {
    const client = new _client(token);
    clients.push(client);
    client._login();
});