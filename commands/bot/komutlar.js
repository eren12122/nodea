const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class NewsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'yardım',
			group: 'bot',
			memberName: 'yardım',
			description: 'Bot ile ilgili yeni özellikleri gösterir.',
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
			


            botkomutları ---) Bot Komutlarını Gösterir \n
            kkomutları ---) Kullanıcı Komutlarını Gösterir\n
            eglencekomutları ---) Eğlence Komutlarını Gösterir\n
            sunucukomutları ---) Sunucu ile İlgili Komutları Gösterir\n
            ayarkomutları ---) Ayar Komutlarını Gösterir\n
			      yetkilikomutları ---) Yetkili Komutlarını Gösterir\n
            muzikkomutları ---) Müzik Komutlarını Gösterir!
                                                                               `)

			.setColor("RANDOM")
			.setFooter('©' + (new Date()).getFullYear() + 'ProxE', this.client.user.avatarURL)
			.setTimestamp()
			message.channel.send({embed});
		}
	}
};