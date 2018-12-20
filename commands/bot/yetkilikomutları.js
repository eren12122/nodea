const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class NewsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'yetkilikomutları',
			group: 'bot',
			memberName: 'yetkilikomutları',
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
			


            **Moderasyon Komutları**\n
            ban: İstediğiniz kişiyi sunucudan yasaklar.\n
            kick: İstediğiniz kişiyi sunucudan atar.\n
            konuştur: İstediğiniz kişinin susturmasını açar\n
            reklam-taraması: Oynuyor mesajlarındaki reklamları arar.\n
            sustur: İstediğiniz kişiyi susturur.\n
            temizle: İstediğiniz sayıda mesaj siler.\n
            uyar: İstediğiniz kişiye uyarı verir.\n
            
`)

			.setColor("RANDOM")
			.setFooter('©' + (new Date()).getFullYear() + 'ProxE', this.client.user.avatarURL)
			.setTimestamp()
			message.channel.send({embed});
		}
	}
};