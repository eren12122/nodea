const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'giriş-çıkış-kapat',
			aliases: ['hoş-geldin-kapat'],
			group: 'ayarlar',
			memberName: 'giriş-çıkış-kapat',
			description: 'Giriş çıkış kanalı kapatmanızı.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'kanal',
					prompt: 'Giriş çıkış kanalı kaldırılsın mı? (onay vermek için herhangi birşey yazınız!)\n',
					type: 'string',
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(message, args) {
			const vt = this.client.provider.get(message.guild.id, 'girisCikis', []);
			const db = this.client.provider.get(message.guild.id, 'girisCikisK', []);
			if (vt === args.kanal.id) {
				this.client.provider.set(message.guild.id, 'girisCikisK', true);
				message.channel.send(`Giriş Çıkış Kanalı Kaldırıldı **ProxE**`);
			} else {
				this.client.provider.set(message.guild.id, 'girisCikis', args.kanal.id);
				this.client.provider.set(message.guild.id, 'girisCikisK', true);
				return message.channel.send(`Giriş Çıkış Kanalı Kaldırıldı **ProxE Bot**`);
			}
	}
};