const { GatewayIntentBits, Client } = require('discord.js');
const {token, prefix} = require('./config.json');

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
})

bot.on('ready', () => {
    console.log('ready')
})

bot.on('messageCreate', message => {
    if(!message.content.startsWith(prefix)) return;
    var msg = message.content.substring(1);
    var channel = message.channel;
    fetch(`https://api.simsimi.net/v2/?text=${msg}&lc=vn&cf=false`)
        .then(response => response.json())
        .then(json => {
            channel.send(json.success);
        })
        .catch(ex => {
            console.log(ex);
            channel.send("\`Có lỗi xảy ra\`");    
        });
})

bot.login(token);