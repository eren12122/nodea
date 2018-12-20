const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class NewsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'muzikkomutları',
			group: 'bot',
			memberName: 'muzikkomutları',
			description: 'komutları gösterir.',
			guildOnly: false,
			throttling: {
				usages: 1,
				duration: 10
			}
		});
	}

	async run(message) {
		if (message.guild) {
			var embed = new RichEmbed()
			.setAuthor('ProxE', this.client.user.avatarURL)
			.setDescription(`Komutların Başına Ayarladığın Prefixi Yazınız Eğer Ayarlamadıysanız **pop!** veya **<@519216364469223434> Koyunuz!`)
			.addField(`Komutlar`, stripIndents`
**Müzik Komutları**
pe!oynat (şarkı linki/adı) \n
pe!durdur (şarkıyı durduru) \n
pe!devam (şarkıyı devam ettirir)\n
pe!kapat (şarkıyı kapatır) \n
pe!kuyuruk (şarkı kuyruğunu gösterir) \n
pe!geç (çalan şarkıyı geçer) \n


`)

			.setColor("RANDOM")
			.setFooter('©' + (new Date()).getFullYear() + ' ProxE', this.client.user.avatarURL)
			.setTimestamp()
			message.channel.send({embed});
		}
	}
};