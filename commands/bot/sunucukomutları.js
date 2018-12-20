const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class NewsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sunucukomutları',
			group: 'bot',
			memberName: 'sunucukomutları',
			description: 'komutlar.',
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
			.setDescription(`Komutların Başına Ayarladığın Prefixi Yazınız Eğer Ayarlamadıysanız **pe!** veya **<@519216364469223434>** Koyunuz!`)
			.addField(`Komutlar`, stripIndents`
			


            **Sunucu Komutları**\n
davet-oluştur: sunucunun davet linkini verir.\n
roller: Sunucudaki rolleri gösterir.\n
sunucu-bilgi: sunucu hakkında bilgi verir.\n
sunucu-ikon: Sunucunun ikonunu gösterir.\n

`)

			.setColor("RANDOM")
			.setFooter('©' + (new Date()).getFullYear() + 'ProxE', this.client.user.avatarURL)
			.setTimestamp()
			message.channel.send({embed});
		}
	}
};