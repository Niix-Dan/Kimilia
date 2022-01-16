const Discord = require("discord.js");
const request = require("request");

module.exports = {
    name: "corar",
    aliases: ["blush"],
    description: "Fique corado(a).",
    async execute(client, message, args) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args.join(" ")) || message.author;

        request.get("https://purrbot.site/api/img/sfw/blush/gif", async (err, resp, body) => {
            if(err) throw new Error("Erro ao conectar com a api https://purrbot.site/api/img/sfw/blush/gif");
            body = JSON.parse(body);
            if(body.error) throw new Error("Api https://purrbot.site/api/img/sfw/blush/gif retornou um erro no json!\n\n"+body.error);

            let embed = new Discord.MessageEmbed()
                .setImage(body.link)
                .setColor("RANDOM")
                .setDescription(`${message.author} ${user != message.author ? `Ficou corado(a) ao ver ${user}` : `Está corado(a)...`}`)
            message.reply({embeds: [embed]});
        })
    }
}

