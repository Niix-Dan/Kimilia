const Discord = require("discord.js");
const request = require("request");

module.exports = {
    name: "morder",
    aliases: ["bite"],
    description: "De uma mordida em alguém.",
    async execute(client, message, args) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args.join(" "));
        if(!user) return message.reply("**:x: | Mencione alguém para morder!**");

        request.get("https://purrbot.site/api/img/sfw/bite/gif", async (err, resp, body) => {
            if(err) throw new Error("Erro ao conectar com a api https://purrbot.site/api/img/sfw/bite/gif");
            body = JSON.parse(body);
            if(body.error) throw new Error("Api https://purrbot.site/api/img/sfw/bite/gif retornou um erro no json!\n\n"+body.error);

            let embed = new Discord.MessageEmbed()
                .setImage(body.link)
                .setColor("RANDOM")
                .setDescription(`${message.author} Mordeu ${user}`)
            message.reply({embeds: [embed]});
        })
    }
}

