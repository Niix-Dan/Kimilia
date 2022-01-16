const Discord = require("discord.js");
const request = require("request");

module.exports = {
    name: "duelo",
    aliases: ["gunfight"],
    description: "Faça um duelo do velho oeste",
    async execute(client, message, args) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args.join(" "));
        if(!user || user.user.bot || user == message.member) return message.reply("**:x: | Mencione alguém para poder duelar!**");
        

        
        if(client.games.has(message.author.id)) return message.reply("**:x: Termine seu jogo atual para iniciar outro.**");
        if(client.games.has(user.id)) return message.reply(`**:x: Essa pessoa já está em um jogo.**`);

        let words = ["fogo", "atirar", "mirar", "boom", "bang"]
        let word = words[Math.floor(Math.random() * words.length)]
        let embed = new Discord.MessageEmbed()
            .setDescription(`**${user} Para aceitar o pedido de duelo, Clique em ✅**`)
            .setColor("RANDOM")
        let msg = await message.reply({content: `${user}`, embeds: [embed]});
        await msg.react("✅");

        let filter = (reaction, usr) => {
            return reaction.emoji.name === '✅' && usr.id === user.id;
        };
        let coletor = await msg.createReactionCollector({filter, max: 1, time: 30000})
        
        coletor.on("collect", async () => {
            if(client.games.has(message.author.id) || client.games.has(user.id)) return;
            client.games.add(message.author.id, true);
            client.games.add(user.id, true);
            
            embed.description = "**Se preparem...**"
            await message.channel.send({embeds: [embed]});
            await timeout(Math.floor(Math.random() * 14000)+5000);
            embed.description = "**DIGITE ` "+word.toUpperCase()+" ` AGORA!**"
            await message.channel.send({embeds: [embed]});
            const filter2 = m => {
                return m.content.toLowerCase() == word.toLowerCase() && (m.author.id === message.author.id || m.author.id === user.id)
            }
			const winner = await message.channel.awaitMessages({
                filter: filter2,
				max: 1,
				time: 30000
			});
            client.games.delete(message.author.id);
            client.games.delete(user.id);
            embed.description = '**:x: | Ninguém ganhou o duelo.**'
			if (!winner.size) return message.channel.send({embeds: [embed]});
            embed.description = '**:x: | Ninguém ganhou o duelo.**'
            message.channel.send(`🏆🔫 **| ${winner.first().author} Ganhou o duelo contra ${winner.first().author.id === message.author.id ? user : message.author}**`)
        });
    }
}

function timeout(ms) {
    return new Promise(r => {setTimeout(() => {r()}, ms)});
}