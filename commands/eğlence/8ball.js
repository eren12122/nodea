const commando = require('discord.js-commando');
const Discord = require('discord.js')
var espriler = [
'Tabii ki neden olmasın (%100)', 
'Belki (%50)', 
'Sanırım (%25)', 
'Hayır (%5)', 
'Asla (%1)',
'Hiçbir zaman (%0)',
`Tam dilimin ucunda tekrar yap!.`,
`Tekrar Sor Bir Düşeneyim `
]

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: '8ball',
            group: 'eğlence',
            memberName: '8ball',
            description: 'Sorduğunuz veya Düşündüğünüz Sorulara Rastgele Cevaplar Verir',
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
    .setDescription(`${espri}`) 
    message.channel.send({embed})
    }
}