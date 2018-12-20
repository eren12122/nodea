const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class NewsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'botkomutları',
			group: 'bot',
			memberName: 'botkomutları',
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
			.setDescription(`Komutların Başına Ayarladığın Prefixi Yazınız Eğer Ayarlamadıysanız **pe!** veya **<@519216364469223434> Koyunuz!`)
			.addField(`Komutlar`, stripIndents`
			**Bot Komutları**
sunucusayı: Botun bulunduğu sunucuların sayısını gösterir.\n
hakkında: Bot hakkında bilgi verir.\n
yardım: Bot ile ilgili Komutları Gösterir\n
mesaj: Bot sahibine  mesaj gönderir.\n
oyver: Oy Vermenizi Sağlayan Linki Verir\n
sunucular: Botun bulunduğu sunucuları görürsünüz\n
sunucutanit: Sunucunuzu Tanıtırsınız\n
çağır: Bot sahibini  çağırır.\n
pe!çevir (dilin kısaltılmış hali örnek: ingilizce = en) (direk çevirmek istediğinizi yazın)
pe!hesapla (işlem)
pe!emoji-yazı (yazı)

`)

			.setColor("RANDOM")
			.setFooter('©' + (new Date()).getFullYear() + 'ProxE', this.client.user.avatarURL)
			.setTimestamp()
			message.channel.send({embed});
		}
	}
};