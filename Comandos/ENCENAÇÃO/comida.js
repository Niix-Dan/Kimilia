const Discord = require("discord.js");
const request = require("request");

module.exports = {
    name: "comida",
    aliases: ["feed", "alimentar", "darcomida"],
    description: "De comida na boca de alguém.",
    async execute(client, message, args) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args.join(" "));
        if(!user) return message.reply("**:x: | Mencione alguém para dar comida na boca!**");

        request.get("https://purrbot.site/api/img/sfw/feed/gif", async (err, resp, body) => {
            if(err) throw new Error("Erro ao conectar com a api https://purrbot.site/api/img/sfw/feed/gif");
            body = JSON.parse(body);
            if(body.error) throw new Error("Api https://purrbot.site/api/img/sfw/feed/gif retornou um erro no json!\n\n"+body.error);

            let embed = new Discord.MessageEmbed()
                .setImage(body.link)
                .setColor("RANDOM")
                .setDescription(`${message.author} Deu comida na boca de ${user}`)
            message.reply({embeds: [embed]});
        })
    }
}

