const Discord = require('discord.js');
const client = new Discord.Client({
	forceFetchUsers: true,
	autoReconnect: true,
	disableEveryone: true,
});
const settings = require('./auth.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

client.on('message', function (message)
{
	if (message.channel.isPrivate) {
		return;
	}
	if (message.everyoneMentioned) {
		return;
	}
	if (message.type === 'dm') {
		return;
	}
});

const log = message => {
	console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
	if (err) console.error(err);
	log(`Loading a total of ${files.length} commands.`);
	files.forEach(f => {
		let props = require(`./commands/${f}`);
		log(`Loading Command: ${props.help.name}. ✔️`);
		client.commands.set(props.help.name, props);
		props.conf.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
	});
});

client.reload = command => {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(`./commands/${command}`)];
			let cmd = require(`./commands/${command}`);
			client.commands.delete(command);
			client.aliases.forEach((cmd, alias) => {
				if (cmd === command) client.aliases.delete(alias);
			});
			client.commands.set(command, cmd);
			cmd.conf.aliases.forEach(alias => {
				client.aliases.set(alias, cmd.help.name);
			});
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};

client.elevation = message => {
    /* This function should resolve to an ELEVATION level which
       is then sent to the command handler for verification*/
	if(!message.guild) return;
	let permlvl = 0;
	let serveradminid = settings.serveradminid;
	let rolmanagerid = settings.rolmanagerid;
	let botmanagerid = settings.botmanagerid;
	let staffmemberid = settings.staffmemberid;
	let gbxid = settings.gbxid;
	let memberid = settings.memberid;
	let ownerid = settings.ownerid
	let ownerid2 = settings.ownerid2
	if (serveradminid && message.member.roles.has(serveradminid)) permlvl = 6;
	if (rolmanagerid && message.member.roles.has(rolmanagerid)) permlvl = 5;
	if (botmanagerid && message.member.roles.has(botmanagerid)) permlvl = 4;
	if (staffmemberid && message.member.roles.has(staffmemberid)) permlvl = 3;
	if (gbxid && message.member.roles.has(gbxid)) permlvl = 2;
	if (memberid && message.member.roles.has(memberid)) permlvl = 1;
	if (message.author.id === settings.ownerid) permlvl = 6;
	if (message.author.id === settings.ownerid2) permlvl = 6;
	return permlvl;
};

client.login(settings.token);
