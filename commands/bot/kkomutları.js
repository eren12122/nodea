const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class NewsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kkomutları',
			group: 'bot',
			memberName: 'kkomutları',
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
			.setDescription(`Komutların Başına Ayarladığın Prefixi Yazınız Eğer Ayarlamadıysanız **p!e** veya **<@519216364469223434>** Koyunuz!`)
			.addField(`Komutlar`, stripIndents`
			


            **Kullanıcı Komutları**\n
afk: AFK moduna geçersiniz \n
avatar: İstediğiniz kullanıcının avatarının linkini verir.\n
havadurumu: Yazılan konumun hava durumunu gösterir.\n
kullanıcı-bilgi: İstediğiniz bir kişi hakkında bilgi verir.\n
zaman: Tarih ve saati gösterir.\n

            
`)

			.setColor("RANDOM")
			.setFooter('©' + (new Date()).getFullYear() + 'ProxE', this.client.user.avatarURL)
			.setTimestamp()
			message.channel.send({embed});
		}
	}
};