const settings = require('../auth.json');
const moment = require('moment');
exports.run = (member, message) => {
    let guild = message.guild;
    if(!message.member.roles.has(`${settings.memberid}`)) {
        guild.member(message.author.id).addRole(`${settings.memberid}`).catch(error => console.log(error));
        guild.channels.get(`${settings.logchan}`).send(`${member.user.username} has accepted the rules on ${moment().format('DD-MM-YYYY HH:mm:ss')}`);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: 'accept',
    description: 'Ping/Pong command. I wonder what this does? /sarcasm',
    usage: 'accept'
};
