import Command from "../../structures/Event.js";
import { WebhookClient, MessageEmbed } from 'discord.js-selfbot-v13';
export default class extends Command {
    constructor(client) {
        super(client, {
            name: 'presenceUpdate',
        })
    }

    run = async (oldPresence, newPresence) => {

const member = newPresence?.member;
  const users = this.client.myusers

  if(!users.includes(member.user.id)) return;

  if(oldPresence?.activities?.length < 1 && newPresence?.activities?.length > 0) {
    const st = newPresence.activities.filter(s => s.id !== 'custom')
    if(!st[0]) return;
    const embed = new MessageEmbed().setDescription(`**User:** ${member.user.username} (${member.user.id})\n**Jogo:** ${st[0]?.name}\n**Tipo:** ${st[0]?.type}\n**Detalhes:** ${st[0]?.details}`).setColor('YELLOW').setTimestamp()
    this.client.sendLog({ embed: embed, type: 'presence'});
  } else if (oldPresence?.status !== newPresence?.status) {
    if (newPresence?.status === 'online') {
      const embed = new MessageEmbed().setDescription(`**User:** ${member.user.username} (${member.user.id})\n**Status:** ${newPresence.status}`).setColor('GREEN').setTimestamp()
      this.client.sendLog({ embed: embed, type: 'presence'});
    } else if (newPresence?.status === 'offline') {
      const embed = new MessageEmbed().setDescription(`**User:** ${member.user.username} (${member.user.id})\n**Status:** ${newPresence.status}`).setColor('DARK_RED').setTimestamp()
      this.client.sendLog({ embed, type: 'presence'});
    } else if(newPresence?.status === 'idle') {
      const embed = new MessageEmbed().setDescription(`**User:** ${member.user.username} (${member.user.id})\n**Status:** ${newPresence.status}`).setColor('YELLOW').setTimestamp()
      this.client.sendLog({ embed: embed, type: 'presence'});
    }  else if(newPresence?.status === 'dnd') {
      const embed = new MessageEmbed().setDescription(`**User:** ${member.user.username} (${member.user.id})\n**Status:** ${newPresence.status}`).setColor('RED').setTimestamp()
      this.client.sendLog({ embed: embed, type: 'presence'});
    }
  }

    }   
}