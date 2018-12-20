const {Command} = require('discord.js-commando'),
  {stripIndents} = require('common-tags');
const { RichEmbed } = require('discord.js');

module.exports = class CheckGuildsCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'oyver',
      aliases: ['oyver'],
      memberName: 'oyver',
      group: 'bot',
      description: 'oyver',
    });
  }

  run (message) {

    const embed = new RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(this.client.user.avatarURL)
    .setAuthor(`ProxE | Oy Ver`, this.client.user.avatarURL)    
    .setDescription(`https://discordbots.org/bot/519216364469223434`)


    return message.embed(embed)
  }
};