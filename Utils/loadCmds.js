const { readdirSync } = require("fs");
const { join } = require("path");
const pixapi = require("pixapi");

module.exports = (client) => {
    let dir = client.cmdsDir;
    let files = readdirSync(dir, { withFileTypes: true });

    console.log(`|=============================================|`)
    console.log(`|                                             |`)
    console.log(`|             Carregando comandos...          |`)
    console.log(`|                   KIMILIA                   |`)
    console.log(`|                                             |`)
    console.log(`|=============================================|`)

    function organize(cat, cmds) {
        let b = `${cat}`,x = `${cmds}`,
        a = "| "+pixapi.replaceString(1, 28 - b.length, b, " ")+"| ",
        c = pixapi.replaceString(1, 16 - x.length, x, " ") + "|";
        return a + c;
    }
    
    for (let file of files) {
        if(file.isDirectory()) {
            let cmds = readdirSync(join(dir, file.name)).filter(fil => fil.endsWith(".js"));
            for(let cmd of cmds) {
                let command = require(join(dir, file.name, `${cmd}`)); 
                command.category = file.name.toUpperCase();
                client.commands.set(command.name, command);
                if(command.aliases) {
                    for(let i = 0 ; i < command.aliases.length ; i++) {
                        client.commands.set(command.aliases[i], command);
                    }
                }
            }
            console.log(organize(`Categoria: [${file.name}]`, `Cmds: [${cmds.length}]`));
        } else {
            console.log(`Carregado ${file.name}`);
            let command = require(join(dir, `${file.name}`)); 
            client.commands.set(command.name, command);
            if(command.aliases) {
                for(let i = 0 ; i < command.aliases.length ; i++) {
                    client.commands.set(command.aliases[i], command);
                }
            }
            console.log(organize(`Categoria: [Nenhuma]`, `${file.name.replace(".js", "")}`));
        }
    }
    console.log(`|=============================================|`)
}