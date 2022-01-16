!(async () => {
    const Discord = require("discord.js");
    const client = new Discord.Client({
        intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES"]
    });
    const config = require("./config.json");
    const Module = event => require(`./Modulos/${event}.js`);
    const Util = event => require(`./Utils/${event}.js`);

    client.cmdsDir = __dirname + "/Comandos";
    client.commands = new Discord.Collection();
    client.config = config;

    client.on("ready", () => Module("ready")(client));
    client.on("ready", () => Util("loadCmds")(client));
    client.on("messageCreate", async (msg) => Module("message")(client, msg));

    client.login(config.TOKEN);
}) ();