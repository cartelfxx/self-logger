const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');

class SelfBotClient {
    constructor(token) {
        this.client = new Client();
        this.token = token;
        this.events = new Map();
        this.loadEvents();
    }

    loadEvents() {
        const eventsPath = path.join(__dirname, '../_events');
        
        if (!fs.existsSync(eventsPath)) {
            fs.mkdirSync(eventsPath, { recursive: true });
            return;
        }

        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
        
        eventFiles.forEach(file => {
            const eventPath = path.join(eventsPath, file);
            const event = require(eventPath);
            const eventName = file.split('.')[0];
            
            this.events.set(eventName, event);
            this.client.on(eventName, (...args) => event.execute(this.client, ...args));
        });
    }

    async _login() {
        await this.client.login(this.token);
    }

}

module.exports = {_client: SelfBotClient};
