const { Command } = require('discord.js-commando')
const commando = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const os = require('os');
const { stripIndents } = require('common-tags');
require('moment-duration-format');

module.exports = class EmbedCommand extends Command {
    constructor(client) {
        super(client, {
			name: 'hakkında',
			aliases: ['istatistik','i', 'd', 'bilgi'],
            group: 'bot',
            memberName: 'hakkında',
            description: 'Bot hakkında bilgi verir.(Botun davet linklerini atar, hakkında bilgi verir ve istatistiklerini gösterir.)',
        }) 
    }

    async run(message) {
		var osType = await os.type();

		if (osType === 'Darwin') osType = 'macOS'
		else if (osType === 'Windows') osType = 'Windows'
		else osType = os.type();

		const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.addField(`❯ Botun İsmi/Adı:`, `ProxE`)
		.addField(`❯ Botun Sahibi/Yapımcısı:`, `<@519210018583609365>`)
		.addField(`❯ Botun Prefixi/Ön-Eki:`, `pe! Yada <@519216364469223434>`)
		.addField(`❯ Açık Kalma Süresi/Çalışma Süresi:`, moment.duration(this.client.uptime).format('D [gün], H [saat], m [dakika], s [saniye]'))
		.addField(`❯ Bellek kullanımı:`, `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`)
		.addField(`❯ Genel istatistikler:`, stripIndents`
		**• Sunucu Sayısı:** ${this.client.guilds.size}
		**• Kanal Sayısı:** ${this.client.channels.size}
		**• Kullanıcı Sayısı:** ${this.client.users.size}
		**• Ping/Gecikme Süresi:** ${this.client.ping ? `${Math.round(this.client.ping)}ms.` : ''}
		`)
		.addField(`❯ Sürümler:`, stripIndents`
		**• Bot:** Beta  Aşamadır!
		**• Discord.js:** v${Discord.version}
		**• Discord.js-commando:** v${commando.version}
		**• Node JS:** ${process.version}

 
		
		`)
        .setFooter('©' + (new Date()).getFullYear() + 'ProxE')
		.setThumbnail(this.client.user.avatarURL)
		message.channel.send({embed});
        }
    };