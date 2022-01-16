const Discord = require("discord.js");
const request = require("request");

module.exports = {
    name: "cafune",
    aliases: ["cafuné", "pat"],
    description: "Faça um cafunézinho em alguém.",
    async execute(client, message, args) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args.join(" "));
        if(!user) return message.reply("**:x: | Mencione alguém para fazer cafuné!**");

        request.get("https://purrbot.site/api/img/sfw/pat/gif", async (err, resp, body) => {
            if(err) throw new Error("Erro ao conectar com a api https://purrbot.site/api/img/sfw/pat/gif");
            body = JSON.parse(body);
            if(body.error) throw new Error("Api https://purrbot.site/api/img/sfw/pat/gif retornou um erro no json!\n\n"+body.error);


            let embed = new Discord.MessageEmbed()
                .setImage(body.link)
                .setColor("RANDOM")
                .setDescription(`${message.author} Fez cafuné em ${user}`)
            message.reply({embeds: [embed]});
        })
    }
}

