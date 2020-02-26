const TelegramBot = require('node-telegram-bot-api');
const greet = require("./modules/greet");
const G = require('gizoogle');
const token = '944880131:AAGtLEWa_IIRU4c6C8F13sSdfcOMY6xn4Io';
const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1]; 
  
    bot.sendMessage(chatId, resp);
  });
  bot.onText(/\/gangsta (.+)/, (msg, match) => {
    const resp = match[1]; 
    G.string(resp, function(error, translation) {
      bot.sendMessage(msg.chat.id, translation);
    });
  
  });


  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    greet(bot, msg);
    var bye = "bye";
    //on bye 
    if (msg.text.toString().toLowerCase().includes(bye)) {
     bot.sendMessage(msg.chat.id, "One man down! Bye");
     } 

     //on mess
     if (msg.text.toString().toLowerCase().includes("mess")) {

     bot.sendMessage(msg.chat.id, "I hear mess! Sure you wanna go to mess ?", {
            "reply_markup": {
                "keyboard": [["Gate 1", "Gate 3"],   ["Shipra"], ["Mc Donalds"],["Zomato"]]
                }
            });        
    }
    //on massbunk

    if (msg.text.toString().toLowerCase().includes("bunk")) {
      // bot.sendMessage(msg.chat.id, "I hear mass bunk! Let's see what others have to say.");
      bot.sendPoll(msg.chat.id,"Mass bunk?",[["You son of a bitch, I'm in"], ["Sorry"]]);
      if(err)
      console.log(err);
      }
   


  });
  bot.on("polling_error", err => console.log(err));