const Discord = require("discord.js");

module.exports = async (client, message) => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    if(!message.content.toLowerCase().startsWith(client.config.PREFIX.toLowerCase())) return;

    let args = message.content.slice(client.config.PREFIX.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(client.commands.has(cmd)) {
        try {
            let cmdFile = client.commands.get(cmd);
            cmdFile.execute(client, message, args);
        } catch(err) {
            message.reply("> Desculpe, um erro interno aconteceu. Meus desenvolvedores foram informados!");
            let errsCh = client.channels.cache.get("932136692524122123");
            errsCh.send("Erro no comando: "+cmd+"\n```bash\n"+err.stack+"\n```");
            console.log("Um erro ocorreu");
        }
    }

}

