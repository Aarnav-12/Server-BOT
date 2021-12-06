const Discord = require('discord.js');
const bot = new Discord.Client();
const secret = 'OTA0NjMyMzk0MTUyMjgwMDY0.YX-Wkg.1-koyjAohtcxkeK-QCoKAQvNEG4';
const PREFIX = ',';
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const error = 'Invalid Command!';
const version = '1.0';
const fetch = require("node-fetch");
const message = Discord.Message;
const EventEmitter = require('events');
EventEmitter.prototype._maxListeners = 10000;
bot.on('ready', () =>{
    console.log(`Started/updated the bot!`)
    bot.user.setActivity(' ,help ')
});
function getQuote() {
    return fetch("https://zenquotes.io/api/random")
      .then(res => {
        return res.json()
      })
      .then(data => {
        return data[0]["q"] + " -" + data[0]["a"]
      })
  }
  bot.on('message', message=>{
    var nickname = message.content.split (" ").slice (1).join (" ");
  if (message.content.startsWith (',nick')) {
    message.member.setNickname (nickname);
    message.react('✅');  
    }  
bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");
    
    switch(args[0]){
        case 'ping':
            message.channel.send ('pong!');
            message.react('✅');
        break;    


        case 'website':
            message.channel.send('https://aarnav.epizy.com');
            message.channel.send('https://youtube.com/c/funsibling');
            message.react('✅');
        break;

        case 'embed':
            const embed = new Discord.MessageEmbed()
            .setTitle('User Information')
            .addField('Player Name', message.author.username)
            .addField('Version', version)
            .addField('Current Server', message.guild.name)
            .setImage(message.author.avatarURL())
            .setColor(0x00FFD7)
            message.channel.send(embed);
            message.react('✅');
        break;

        case 'quote':
            getQuote().then(quote => message.channel.send(quote));
            message.react('✅');
        break;

        case 'help':
            const Embed = new Discord.MessageEmbed()
            .setTitle("Helper Embed")
            .setColor(0xBA2058)
            .setDescription("You have used the help command!.")
            .addField('Click on the file or link');
            message.channel.send(Embed);
            message.channel.send("https://pastebin.com/LBPVLcsM", { files: ["./commands.txt"] });
            message.react('✅');
        break;        

        case 'info':
            if(args[1] === 'version'){
                message.channel.send(version);
                message.react('✅');       
            }
            if(args[1] === 'author'){
                message.channel.send('Aarnav is my author!');
                message.react('✅');
            }else{
                message.channel.send(error);
                message.react('❌');
            } 
            break;

        
        case 'clear': 
        if(!args[1]) return message.reply(error)
        message.channel.send('Cleared' +args[1]+ 'messages') 
        message.channel.bulkDelete(args[1]);
        message.react('✅');
        break;
        
        case 'code':
        message.channel.send("Da Code", { files: ["./code.txt"] });
        message.channel.send('Should i make it closed source.');
        message.react('✅');
        break;
    }
}) 

})
bot.login(secret);