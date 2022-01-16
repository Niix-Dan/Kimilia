const Discord = require("discord.js");
const request = require("request");

module.exports = {
    name: "dancar",
    aliases: ["dance", "dançar"],
    description: "Faça uma dancinha.",
    async execute(client, message, args) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args.join(" ")) || message.author;

        request.get("https://purrbot.site/api/img/sfw/dance/gif", async (err, resp, body) => {
            if(err) throw new Error("Erro ao conectar com a api https://purrbot.site/api/img/sfw/dance/gif");
            body = JSON.parse(body);
            if(body.error) throw new Error("Api https://purrbot.site/api/img/sfw/dance/gif retornou um erro no json!\n\n"+body.error);

            let embed = new Discord.MessageEmbed()
                .setImage(body.link)
                .setColor("RANDOM")
                .setDescription(`${message.author} ${user != message.author ? `Fez uma dancinha para ${user}` : `Está dançando...`}`)
            message.reply({embeds: [embed]});
        })
    }
}

