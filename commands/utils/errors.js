const Discord = require("discord.js");
const fs = require("fs");
let config = require("../data/ayarlar.json");

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setTitle("Yetersiz izin")
        .setColor(config.red)
        .addField("İzin gerekli", perm);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.equalPerms = (message, user, perms) => {

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor(config.red)
        .setTitle("Hata")
        .addField(`${user} izinleri`, perms);

    message.channel.send(embed).then(m => m.delete(5000));

}

module.exports.botuser = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Hata")
        .setDescription("Sen Botu Banlayamazsın!")
        .setColor(config.red);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.cantfindUser = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Hata")
        .setDescription("Bu kullanıcı bulunamadı.")
        .setColor(config.red);

    channel.send(embed).then(m => m.delete(5000));
}

module.exports.noReason = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Hata")
        .setDescription("Lütfen bir sebep belirtin.")
        .setColor(config.red);

    channel.send(embed).then(m => m.delete(5000));
}