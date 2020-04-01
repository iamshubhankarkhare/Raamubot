const TelegramBot = require('node-telegram-bot-api');
const greet = require("./modules/greet");
const covid = require("./modules/covid");
const movie = require("./modules/movie");
const G = require('gizoogle');
const cron = require("node-cron");
const token = '944880131:AAGtLEWa_IIRU4c6C8F13sSdfcOMY6xn4Io';
const bot = new TelegramBot(token, { polling: true });


bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

//gangsta
bot.onText(/\/gangsta (.+)/, (msg, match) => {
  const resp = match[1];
  G.string(resp, function (error, translation) {
    bot.sendMessage(msg.chat.id, translation);
  });

});

// //covid
// let url="https://api.covid19india.org/data.json";

// bot.onText(/\/covid (.+)/, async (msg, match) => {
//   const resp = match[1]; 
//   let args = msg.text.split(" ");
//   let out=" "+args[1]+"hjsh"+args[2]+"hjsh"+args[3]+"hjsh";
//   await bot.sendMessage(msg.chat.id, out);


// });


bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  greet(bot, msg);
  if (msg.text) {
    covid(bot, msg);
    movie(bot, msg);
  }



  //on bye 
  if (msg.text.toString().toLowerCase().includes("bye")) {
    bot.sendMessage(msg.chat.id, "One man down! Bye");
  }

  //on mess
  if (msg.text.toString().toLowerCase().includes("mess")) {

    bot.sendMessage(msg.chat.id, "I hear mess! Sure you wanna go to mess ?", {
      "reply_markup": {
        "keyboard": [["Gate 1", "Gate 3"], ["Shipra"], ["Mc Donalds"], ["Zomato"], ["Mess"]]
      }
    });
  }
  //on reply

  const rep = "I hear mess! Sure you wanna go to mess ?"
  if (msg.text.toString().toLowerCase().includes("bc")) {
    bot.sendPhoto(msg.chat.id, "/home/shubhankar/Desktop/Raamubot/static/abeysale.jpeg");
  }



  if (msg.text.toString().toLowerCase().includes("bunk")) {
    bot.sendPoll(msg.chat.id, "I hear mass bunk! Let's see what others have to say.", ["You son of a bitch , I'm in!", "short atttendance"]);
  }

});

cron.schedule("35 1 * * * ", async () => { bot.sendMessage(msg.chat.id, "gjhghjghj"); });

bot.on("polling_error", err => console.log(err));