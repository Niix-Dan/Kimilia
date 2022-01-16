const Discord = require("discord.js");
const request = require("request");

module.exports = {
    name: "abracar",
    aliases: ["abraçar", "hug", "abraço", "abraco"],
    description: "Dê um abraço quentinho.",
    async execute(client, message, args) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args.join(" ")) || message.author;
        if(!user) return message.reply("**:x: | Mencione alguém para dar um abraço!**");

        request.get("https://purrbot.site/api/img/sfw/hug/gif", async (err, resp, body) => {
            if(err) throw new Error("Erro ao conectar com a api https://purrbot.site/api/img/sfw/hug/gif");
            body = JSON.parse(body);
            if(body.error) throw new Error("Api https://purrbot.site/api/img/sfw/hug/gif retornou um erro no json!\n\n"+body.error);

            let embed = new Discord.MessageEmbed()
                .setImage(body.link)
                .setColor("RANDOM")
                .setDescription(`${message.author} Deu um abraço quentinho em ${user}`)
            message.reply({embeds: [embed]});
        })
    }
}

