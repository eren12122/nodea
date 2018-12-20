const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class NewsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'eglencekomutları',
			group: 'bot',
			memberName: 'eglencekomutları',
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
			.setDescription(`Komutların Başına Ayarladığın Prefixi Yazınız Eğer Ayarlamadıysanız **pe!** veya **<@519216364469223434>** Koyunuz!`)
			.addField(`Komutlar`, stripIndents`
            **Eğlence Komutları**\n
            8ball: Sorduğunuz veya Düşündüğünüz Sorulara Rastgele Cevaplar Verir\n
            ascii: Yazınız Değişik Şekiller İle Yazılır \n
            balık-tut: Balık tutarsınız.\n
            düello: Biri ile düello atarsınız.\n
            espri: Espri yapar.\n
            sayıtutmaca: Tuttuğunuz Sayıyı Bilmeye Çalışır.\n
            slot: Slot makinesiyle oynarsınız.\n
            sor: Bota soru sormanızı sağlar.\n
            yaz: Bota yazı yazdırırsınız.\n


`)

			.setColor("RANDOM")
			.setFooter('©' + (new Date()).getFullYear() + 'ProxE', this.client.user.avatarURL)
			.setTimestamp()
			message.channel.send({embed});
		}
	}
};