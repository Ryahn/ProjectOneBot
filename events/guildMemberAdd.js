const settings = require('../auth.json');
module.exports = member => {
	let guild = member.guild;
	guild.channels.get(`${settings.welcomechan}`).send(`${member}, Welcome to the Project 1v1 Community Discord (Managed by Gene Firewind and the Server Staff) [We are not Gearbox Staff]. Please look at <#357545830359760898> once you read <#355082343368884246>. Please type !accept if you have read, understand and agree to abide by the Community Discord rules. `);
};
