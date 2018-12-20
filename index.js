const { CommandoClient, FriendlyError, SQLiteProvider } = require('discord.js-commando'),
    path = require('path'),
    sqlite = require('sqlite'),
	  oneLine = require('common-tags').oneLine,
      moment = require('moment'),
      dbaapi = require('discord-bots-api'),
	  request = require('request'),
	  snekfetch = require('snekfetch'),
	  { MongoClient } = require('mongodb'),
	  MongoDBProvider = require('commando-provider-mongo'),
	  Jimp = require('jimp'),
      Discord = require('discord.js'),
      fs = require('fs'),
    { RichEmbed } = require('discord.js');
let afkUsers = require('./bin/afk.json');

const ayarlar = require('./data/ayarlar.json');


const client = new CommandoClient({
    commandPrefix: ayarlar.PREFIX,
    unknownCommandResponse: false,
    owner: ayarlar.SAHIP,
    disableEveryone: true
});

client.on('message', (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.channel.type !== 'text') return;
  if (message.content.startsWith(message.guild.commandPrefix)) return;

  if (afkUsers[message.author.id]) {
    if (afkUsers[message.author.id].afk === true) {
      const afk2 = new RichEmbed()
      .setColor("#36393E")
      .setDescription(`<@${message.author.id}> Adlı kullanıcı AFK modundan çıktı! Tekrar hoş geldin!`)
      message.channel.send(afk2)
      afkUsers[message.author.id].afk = false;
    }
  }

  if (message.mentions) {
    message.mentions.users.map((user) => {
      if (afkUsers[user.id]) {
        if (afkUsers[user.id].afk === true) {
          const afk = new RichEmbed()
          .setColor("#36393E")
          .setDescription(`<@${message.author.id}>, <@${user.id}> Adlı kullanıcı **${JSON.stringify(afkUsers[user.id].status.msg)}** sebebi ile AFK!`)
          message.channel.send(afk);
        }
      }
    })
  }
})



const log = msg => {
  logger.log('info', msg)
};





client.dispatcher.addInhibitor(msg => {
	const blacklist = client.provider.get('global', 'userBlacklist', []);
	if (!blacklist.includes(msg.author.id)) return false;
  msg.react('😡');
  msg.reply('**Sen botun kara listesindesin bu yüzden komutlarımı kullanamazsın. Eğer Açmak İstiyor isen <@519210018583609365> Başvur. **')
	return true;
});

client.on("guildMemberAdd", async member => {
  const veri = client.provider.get(member.guild.id, "girisCikisK", []);
  if (veri ==! true) return;
  if (veri === true) {
    const kanalveri = client.provider.get(member.guild.id, "girisCikis", []);
    let username = member.user.username;
    if (member.guild.channels.get(kanalveri) === undefined || member.guild.channels.get(kanalveri) === null) return;
    if (member.guild.channels.get(kanalveri).type === "text") {
      let randname = await randomString(16, 'aA');
      const bg = await Jimp.read("./guildAdd.png");
      const userimg = await Jimp.read(member.user.avatarURL);
      var font;
      if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
      else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
      else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
      await bg.print(font, 430, 170, member.user.tag);
      await userimg.resize(362, 362);
      await bg.composite(userimg, 43, 26).write("./img/"+ randname + ".png");
        setTimeout(function () {
          member.guild.channels.get(kanalveri).send(new Discord.Attachment("./img/" + randname + ".png"));
        }, 1000);
        setTimeout(function () {
        fs.unlink("./img/" + randname + ".png");
        }, 10000);
    }
  }
})

client.on("guildMemberRemove", async member => {
const veri = client.provider.get(member.guild.id, "girisCikisK", []);
if (veri ==! true) return;
if (veri === true) {
  const kanalveri = client.provider.get(member.guild.id, "girisCikis", []);
  let username = member.user.username;
  if (member.guild.channels.get(kanalveri) === undefined || member.guild.channels.get(kanalveri) === null) return;
  if (member.guild.channels.get(kanalveri).type === "text") {
    let randname = await randomString(16, 'aA');
    const bg = await Jimp.read("./guildRemove.png");
    const userimg = await Jimp.read(member.user.avatarURL);
    var font;
    if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    await bg.print(font, 430, 170, member.user.tag);
    await userimg.resize(362, 362);
    await bg.composite(userimg, 43, 26).write("./img/"+ randname + ".png");
      setTimeout(function () {
        member.guild.channels.get(kanalveri).send(new Discord.Attachment("./img/" + randname + ".png"));
      }, 1000);
      setTimeout(function () {
      fs.unlink("./img/" + randname + ".png");
      }, 10000);
  }
}
})

  client.on('guildMemberAdd', member => {
    const hgK = client.provider.get(member.guild.id, 'girisCikis', []);
    if (!hgK) return;
    if (member.guild.channels.get(hgK) === undefined || member.guild.channels.get(hgK) === null) return;
    if (member.guild.channels.get(hgK).type === "text") {
   member.guild.channels.get(hgK).send(`📥 ● <@${member.user.id}> Adlı kullanıcı Sunucu'ya katıldı!`);
      }
    } 
  );
  
  client.on('guildMemberRemove', member => {
    const hgK = client.provider.get(member.guild.id, 'girisCikis', []);
    if (!hgK) return;
    if (member.guild.channels.get(hgK) === undefined || member.guild.channels.get(hgK) === null) return;
    if (member.guild.channels.get(hgK).type === "text") {
   member.guild.channels.get(hgK).send(`📤 ● <@${member.user.id}> Adlı kullanıcı Sunucu'dan ayrıldı!`);
      }
    } 
  );


  client.on('guildMemberAdd', async member => {
    const veri = client.provider.get(member.guild.id, 'girisRolK', []);
    if (veri ==! true) return;
    if (veri === true) {
      const girisrolveri = client.provider.get(member.guild.id, 'girisRol', []);
      if (member.guild.roles.get(girisrolveri) === undefined || member.guild.roles.get(girisrolveri) === null) return;
      member.addRole(girisrolveri);
    }
  })

  client.on('message', msg => {
    if (!msg.guild) return;
    const veri = client.provider.get(msg.guild.id, 'linkEngel', []);
    if (veri !== true) return;
    if (veri === true) {
    const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
    if (swearWords.some(word => msg.content.includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        return;
      }
    }
    var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    if (regex.test(msg.content)==true) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        return msg.reply('Bu sunucuda linkler **ProxE** tarafından engellenmektedir.').then(msg => msg.delete(3000));
      } else {
        return;
      };
    } else {
      return;
    };
    };
  })

  client.on('guildMemberAdd', async member => {
      if (!member.guild) return;
      const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
      if (enabled !== true) return;
      const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
      if (!logCh) return;
      if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
      if (member.guild.channels.get(logCh).type === "text") {
        var embed = new Discord.RichEmbed()
        .setColor("#36393E")
        .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
        .setTitle('Sunucuya yeni bir kişi katıldı!')
        .setDescription(`<@${member.user.id}> Adlı kullanıcı Sunucu'ya katıldı!`)
        .setFooter(`Katılan Kullanıcı ID: ${member.user.id}`)
        .setTimestamp()
        member.guild.channels.get(logCh).send({embed});
      }
    })

    .on('guildMemberRemove', async member => {
      if (!member.guild) return;
      const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
      if (enabled !== true) return;
      const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
      if (!logCh) return;
      if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
      if (member.guild.channels.get(logCh).type === "text") {
        var embed = new Discord.RichEmbed()
        .setColor("#36393E")
        .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
        .setTitle('Sunucudan bir kişi ayrıldı;')
        .setDescription(`<@${member.user.id}> Adlı kullanıcı Sunucu'dan ayrıldı!`)
        .setFooter(`Ayrılan Kullanıcı ID: ${member.user.id}`)
        .setTimestamp()
        member.guild.channels.get(logCh).send({embed});
      }
    })



    .on('guildBanAdd', async (guild, member) => {
      if (!guild) return;
      const enabled = client.provider.get(guild.id, 'logsEnable', []);
      if (enabled !== true) return;
      const logCh = client.provider.get(guild.id, 'logsChannel', []);
      if (!logCh) return;
      if (guild.channels.get(logCh) === undefined || guild.channels.get(logCh) === null) return;
      if (guild.channels.get(logCh).type === "text") {
        var embed = new Discord.RichEmbed()
        .setTitle('Üye yasaklandı.')
        .setColor("#36393E")
        .setDescription(`<@${member.user.id}> adlı kullanıcı yasaklandı!`)
        .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
        .setFooter(`Yasaklanan Kullanıcı ID: ${member.user.id}`)
        .setTimestamp();
        guild.channels.get(logCh).send({embed});

      }
    })

    .on('guildBanRemove', async (guild, member) => {
      if (!guild) return;
      const enabled = client.provider.get(guild.id, 'logsEnable', []);
      if (enabled !== true) return;
      const logCh = client.provider.get(guild.id, 'logsChannel', []);
      if (!logCh) return;
      if (guild.channels.get(logCh) === undefined || guild.channels.get(logCh) === null) return;
      if (guild.channels.get(logCh).type === "text") {
        var embed = new Discord.RichEmbed()
        .setTitle('Üyenin yasaklaması kaldırıldı.')
        .setColor("#36393E")
        .setDescription(`<@${member.user.id}> adlı kullanıcının yasaklanması kaldırıldı!`)
        .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
        .setFooter(`Yasaklanması Kaldırılan Kullanıcı ID: ${member.user.id}`)
        .setTimestamp();
        guild.channels.get(logCh).send({embed});
      }
    })

    .on('messageDelete', async msg => {
      if (!msg.guild) return;
      const enabled = client.provider.get(msg.guild.id, 'logsEnable', []);
      if (enabled !== true) return;
      const logCh = client.provider.get(msg.guild.id, 'logsChannel', []);
      if (!logCh) return;
      if (msg.guild.channels.get(logCh) === undefined || msg.guild.channels.get(logCh) === null) return;
      if (msg.guild.channels.get(logCh).type === "text") {
        if (msg.author.bot) return;
        var embed = new Discord.RichEmbed()
        .setTitle(`Mesaj silindi.`)
        .setColor("#36393E")
        .setDescription(`<#${msg.channel.id}> kanalında <@${msg.author.id}> tarafından gönderilen bir mesaj silindi. \nSilinen Mesaj: \n\`\`\`\n"${msg.content}"\n\`\`\``)
        .setFooter(`Silinen Mesaj ID: ${msg.id} | Mesajı Silen Kullanıcı ID: ${msg.author.id}`)
        msg.guild.channels.get(logCh).send({embed});
      }
    })

    .on('channelCreate', async channel => {
      if (!channel.guild) return;
      const enabled = client.provider.get(channel.guild.id, 'logsEnable', []);
      if (enabled !== true) return;
      const logCh = client.provider.get(channel.guild.id, 'logsChannel', []);
      if (!logCh) return;
      if (channel.guild.channels.get(logCh) === undefined || channel.guild.channels.get(logCh) === null) return;
      if (channel.guild.channels.get(logCh).type === "text") {
        if (channel.type === "text") {
          var embed = new Discord.RichEmbed()
          .setColor("#36393E")
          .setTitle(`Kanal oluşturuldu.`)
          .setDescription(`<@${msg.author.id}> tarafından <#${channel.id}> kanalı oluşturuldu. _(metin kanalı)_`)
          .setFooter(`Oluşturulan Kanal ID: ${channel.id} | Oluşturan Kullanıcı ID: ${msg.author.id}`)
          channel.guild.channels.get(logCh).send({embed});
        };
        if (channel.type === "voice") {
          var embed = new Discord.RichEmbed()
          .setColor("#36393E")
          .setTitle(`Kanal Oluşturuldu.`)
          .setDescription(`<@${msg.author.id}> tarafından ${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
          .setFooter(`Oluşturulan Kanal ID: ${channel.id} | Oluşturan Kullanıcı ID: ${msg.author.id}`)
          channel.guild.channels.get(logCh).send({embed});
        }
      }
    })

    .on('channelDelete', async channel => {
      if (!channel.guild) return;
      const enabled = client.provider.get(channel.guild.id, 'logsEnable', []);
      if (enabled !== true) return;
      const logCh = client.provider.get(channel.guild.id, 'logsChannel', []);
      if (!logCh) return;
      if (channel.guild.channels.get(logCh) === undefined || channel.guild.channels.get(logCh) === null) return;
      if (channel.guild.channels.get(logCh).type === "text") {
        if (channel.type === "text") {
          let embed = new Discord.RichEmbed()
          .setColor("#36393E")
          .setTitle(`Kanal Silindi.`)
          .setDescription(` tarafından <#${channel.id}> kanalı silindi. _(metin kanalı)_`)
          .setFooter(`Silinen Kanal ID: ${channel.id} | Silen Kullanıcı ID: ${msg.author.id}`)
          channel.guild.channels.get(logCh).send({embed});
        };
        if (channel.type === "voice") {
          let embed = new Discord.RichEmbed()
          .setColor("#36393E")
          .setTitle(`Kanal Silindi.`)
          .setDescription(`<@${msg.author.id}> tarafından ${channel.name} kanalı silindi. _(sesli kanal)_`)
          .setFooter(`Silinen Kanal ID: ${channel.id} | Silen Kullanıcı ID: ${msg.author.id}`)
          channel.guild.channels.get(logCh).send({embed});
        }
      }
    })

    .on('messageUpdate', async (oldMsg, newMsg) => {
      if (!oldMsg.guild) return;
      if (oldMsg.author.bot) return;
      const enabled = client.provider.get(oldMsg.guild.id, 'logsEnable', []);
      if (enabled !== true) return;
      const logCh = client.provider.get(oldMsg.guild.id, 'logsChannel', []);
      if (!logCh) return;
      if (oldMsg.guild.channels.get(logCh) === undefined || oldMsg.guild.channels.get(logCh) === null) return;
      if (oldMsg.guild.channels.get(logCh).type === "text") {
          const embed = new RichEmbed()
          .setColor("#36393E")
          .setTitle('Mesaj Düzenlendi.')
          .setDescription(`<@${oldMsg.author.id}> adlı kullanıcı <#${oldMsg.channel.id}> kanalına gönderdiği mesajı düzenledi.`)
          .addField(`Eski Mesaj`, `\`\`\`\n${oldMsg.content}\n\`\`\``)
          .addField(`Yeni Mesaj`, `\`\`\`\n${newMsg.content}\n\`\`\``)
        oldMsg.guild.channels.get(logCh).send({embed});
      }
    }
  );


  client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['bot', 'Bot Komutları'],
    ['kullanıcı', 'Kullanıcı Komutları'],
	  ['eğlence', 'Eğlence Komutları'],
    ['başvuru', 'Başvuru Sistemi'],
    ['sunucu', 'Sunucu Komutları'],
    ['moderasyon', 'Moderasyon Komutları'],
    ['ayarlar', 'Ayarlar'],
    ['genel', 'Genel Komutlar'],
    ['admin', 'Bot Sahibi Komutları'],
    ['destek', 'Destek'],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

  sqlite.open(path.join(__dirname, "database.sqlite3")).then((db) => {
	  client.setProvider(new SQLiteProvider(db));
  });

 
client.on('ready', () => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Aktif, Komutlar yüklendi!`),
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Bot ${client.user.username} ismi ile giriş yaptı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Bot ${client.guilds.size} Sunucu | ${client.users.size} Kullanıcıya hizmet veriyor.`)
  client.user.setStatus('dnd')
  client.setInterval(() => {
      client.user.setActivity("7/24 Aktif Bot!", { type: "WATCHING" });
      client.user.setActivity("Botu Sunucuzunuza Eklemeyi Unutmayın!", { type: "WATCHING" });
      client.user.setActivity(`${client.guilds.size} Sunucu | ${client.users.size} Kullanıcı`, { type: "WATCHING" });
  }, 15000);
});



client.login(process.env.BOT_TOKEN);

async function randomString(length, chars) {
  var mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  var result = '';
  for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
  return result;
}



client.on('guildDelete', guild => {
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle('Bir Sunucudan Ayrıldım :frowning: ')
  .setDescription(`Bot, 》${guild.name}《 sunucudan ayrıldı [${guild.memberCount} Üye]!`)
  .setFooter('ProxE', client.user.avatarURL)
  .setTimestamp()
  client.channels.get('522462732134514747').send(embed);
});

client.on('guildCreate', guild => {
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle('Yeni Bir Sunucuya Katıldım :tada: ')
  .setDescription(`Bot, 》${guild.name}《 sunucuya katıldı [${guild.memberCount} Üye]!`)
  .setFooter('ProxE', client.user.avatarURL)
  .setTimestamp()
  client.channels.get('522462732134514747').send(embed);
});

client.on('guildCreate', guild => {
  const owner = guild.owner
  const mrb = guild.systemChannel
  if (!mrb) return;
  let merhaba = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
  .setAuthor(guild.name, guild.iconURL)
  .addField('**ProxE Artık Sizin Sunucunuzda**', `${owner}`)
  .addField('**İlk Öncelikle Beni Eklediğiniz İçin Teşekkürler!', `**Eğer Komutlar Çalışmaz İse** <@519216364469223434> prefix pe! yazmanız yeterlidir!`)
  .addField('**Botumuzun özelliklerini öğrenmek için**', `**pe!yardım** yazmanız yeterlidir!`)
  mrb.send(merhaba);
});




  