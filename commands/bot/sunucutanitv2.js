const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sunucutanit',
            group: 'bot',
            memberName: 'sunucutanit',
            description: 'tanıtırsınız.',
            args: [
                {
                    key: 'tamam',
                    prompt: 'Eğer Sunucunuzu Tanıtmak İstiyorsanız `tamam` Yazın.',
                    type: 'string'
                }
            ]
        });
    }

async run(message, args) {

    let davet;
        if (message.channel.permissionsFor(this.client.user).has("CREATE_INSTANT_INVITE")) {
            await message.channel.createInvite({temporary: false, maxAge: 0, maxUses: 0, unique: false}).then(i => { davet = i.url });
        } else davet = 'Davet linkini almak için yeterli yetkim yok. davet linkini oluşturma yetkisini veriniz.';

    message.reply(`Sunucunuz Tanıtıldı !`);

    const embed = new RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`» Yeni bir Sunucu Tanıt!`)
    .addField(`❯ Sunucu Tanıtı Kullan Kişi`, `• Kullanıcı ID: ${message.author.id} \n• Kullanıcı Adı: ${message.author.tag}`)
    .addField(`❯ Sunucu Adı`, `•  ${message.guild.name}`)
    .addField(`❯ Gönderilen Sunucunun Daveti`, davet)
    .setFooter(`ProxE | Sunucu Tanıt Sistemi`)
    .setTimestamp()
    this.client.channels.get(`520246510873477131`).send({embed})
    }
}