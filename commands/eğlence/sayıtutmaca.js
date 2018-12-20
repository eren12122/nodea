const commando = require('discord.js-commando');
const Discord = require('discord.js')
var espriler = [
'12', 
'11', 
'31.', 
'21.', 
'41.',
'10',
'9.',
`Tam dilimin ucunda tekrar yap!.`,
`1.`,
`63.`
]

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'sayıtutmaca',
            group: 'eğlence',
            memberName: 'sayıtutmaca',
            description: 'Tuttuğunuz Sayıyı Bilmeye Çalışır.',
            guildOnly: true,
            throttling: {
                 usages: 1,
                 duration: 10
             },

        });
    }

async run(message) {

    var espri = espriler[Math.floor(Math.random() * espriler.length)];

  	const embed = new Discord.RichEmbed()
  	.setColor("RANDOM")
    .setDescription(`Sanırım Senin Tuttuğun Sayı: ${espri}`) 
    message.channel.send({embed})
    }
}