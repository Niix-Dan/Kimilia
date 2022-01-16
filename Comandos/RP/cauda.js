const Discord = require("discord.js");
const request = require("request");

module.exports = {
    name: "cauda",
    aliases: ["tail", "rabo"],
    description: "Balance a sua cauda.",
    async execute(client, message, args) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args.join(" ")) || message.author;

        request.get("https://purrbot.site/api/img/sfw/tail/gif", async (err, resp, body) => {
            if(err) throw new Error("Erro ao conectar com a api https://purrbot.site/api/img/sfw/tail/gif");
            body = JSON.parse(body);
            if(body.error) throw new Error("Api https://purrbot.site/api/img/sfw/tail/gif retornou um erro no json!\n\n"+body.error);

            let embed = new Discord.MessageEmbed()
                .setImage(body.link)
                .setColor("RANDOM")
                .setDescription(`${message.author} ${user != message.author ? `Começou a balançar o cauda para ${user} OwO` : `Está balançando a cauda ;3`}`)
            message.reply({embeds: [embed]});
        })
    }
}

