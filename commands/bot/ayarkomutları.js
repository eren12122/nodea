const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class NewsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ayarkomutları',
			group: 'bot',
			memberName: 'ayarkomutları',
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
			.setDescription(`Komutların Başına Ayarladığın Prefixi Yazınız Eğer Ayarlamadıysanız **pop!** veya **<@519216364469223434>** Koyunuz!`)
			.addField(`Komutlar`, stripIndents`
			


            **Ayarlar**\n
            ayarlar: Sunucudaki ayarları gösterir.
            giriş-çıkış-ayarla: Giriş çıkış kanalı ayarlamanızı/değiştirmenizi sağlar.\n
            link-engelle: Link engelleme özelliğini açıp/kapatmanızı sağlar.\n
            log-ayarla: Log kanalını değiştirmenizi/ayarlamanızı sağlar.\n
            mod-log-ayarla: Mod-log kanalını değiştirmenizi sağlar.\n
            oto-rol-ayarla: Giriş rolü ayarlamanızı/belirlemenizi sağlar.\n
            giriş-çıkış-kapat: Giriş Çıkış Mesajlarını Kapatır
`)

			.setColor("RANDOM")
			.setFooter('©' + (new Date()).getFullYear() + 'ProxE', this.client.user.avatarURL)
			.setTimestamp()
			message.channel.send({embed});
		}
	}
};