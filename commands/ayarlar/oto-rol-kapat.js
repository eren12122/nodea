const { Command } = require('discord.js-commando');

module.exports = class JoinRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'oto-rol-kapat',
			aliases: ['oto-rol-kapat'],
			group: 'ayarlar',
			memberName: 'oto-rol-kapat',
			description: 'Giriş rolünü Kapamayı Sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'rol',
					prompt: 'Oto-Rol Kapatılsın mı? (onay için herhangi birşey yazınız)\n',
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
			const vt = this.client.provider.get(message.guild.id, 'girisRol', []);
			const db = this.client.provider.get(message.guild.id, 'girisRolK', []);
			if (vt === args.rol.id) {
				this.client.provider.set(message.guild.id, 'girisRolK', true);
				message.channel.send(`Oto-Rol Kapatıldı!`);
			} else {
				this.client.provider.set(message.guild.id, 'girisRol', args.rol.id);
				this.client.provider.set(message.guild.id, 'girisRolK', true);
				return message.channel.send(`Oto-Rol Kapatıldı!`);
			}
	}
};