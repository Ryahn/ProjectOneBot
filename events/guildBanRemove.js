const settings = require('../auth.json');
module.exports = (guild, user) => {
	guild.channels.get(`${settings.logchan}`).send(`${user.username} was just unbanned!`);
};
