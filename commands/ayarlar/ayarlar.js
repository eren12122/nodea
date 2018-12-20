const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');

module.exports = class channelinfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ayarlar',
			group: 'ayarlar',
			memberName: 'ayarlar',
			description: 'Sunucudaki ayarları gösterir.',
			guildOnly: true,
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(message) {

		const modlog = message.guild.channels.get(message.guild.settings.get('modLog'))
		const logsChannel = message.guild.channels.get(message.guild.settings.get('logsChannel'))
		const girisCikis = message.guild.channels.get(message.guild.settings.get('girisCikis'))
		const girisRol = message.guild.roles.get(message.guild.settings.get('girisRol'))
		const linkEngel = message.guild.settings.get('linkEngel')

		const embed = new RichEmbed()
		.setColor("RANDOM")
		.setAuthor(`${message.guild.name} Adlı Sunucunun Ayarları`)
		.setThumbnail(message.guild.iconURL)
		.addField('❯ Mod-Log Kanalı', modlog ? modlog  : `**pe!mod-log-ayarla #kanal** :x:`, true)
		.addField('❯ Log Kanalı', logsChannel ? logsChannel : `**pe!log-ayarla #kanal** :x:`, true)
		.addField(`❯ Giriş Çıkış Kanalı📤`, girisCikis ? girisCikis : `**pe!giriş-çıkış-ayarla #kanal** :x:`, true)
		.addField(`❯ Oto-Rol/Giriş Rolü`, girisRol ? girisRol : `**pe!oto-rol-ayarla @Rol** :x:`, true)
		.addField(`❯ Link Engelleme Sistemi`, this.client.provider.get(message.guild.id, 'linkEngel', []) ? `Linkleri Engelliyorum ✅` : `**pe!link-engelle** :x:`, true)
		return message.embed(embed)

	}
}
