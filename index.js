const TelegramBot = require('node-telegram-bot-api');
const mongoose = require("mongoose");
const fs = require('fs');
const path = require("path");
const greet = require("./modules/greet");
const covid = require("./modules/covid");
const myclass = require("./modules/myclass");
const movie = require("./modules/movie");
const G = require('gizoogle');
const cron = require("node-cron");
const token = '944880131:AAGtLEWa_IIRU4c6C8F13sSdfcOMY6xn4Io';
const bot = new TelegramBot(token, { polling: true });

const read = fs.readFileSync(path.resolve("myclass.json"));
const resp = JSON.parse(read);



bot.onText(/\/echo (.+)/, (msg, match) => {
  chatId = msg.chat.id;
  const res = match[1];

  bot.sendMessage(chatId, res);
});

//gangsta
bot.onText(/\/gangsta (.+)/, (msg, match) => {
  const res = match[1];
  G.string(res, function (error, translation) {
    bot.sendMessage(msg.chat.id, translation);
  });

});
var chatId = "";
bot.on('message', (msg) => {
  chatId += msg.chat.id;
  greet(bot, msg);
  if (msg.text) {
    covid(bot, msg);
    movie(bot, msg);
    myclass(bot, msg);
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

  const rep = "I hear mess! Sure you wanna go to mess ?"
  if (msg.text.toString().toLowerCase().includes("bc")) {
    bot.sendPhoto(msg.chat.id, "./static/abeysale.jpeg");
  }



  if (msg.text.toString().toLowerCase().includes("bunk")) {
    bot.sendPoll(msg.chat.id, "I hear mass bunk! Let's see what others have to say.", ["You son of a bitch , I'm in!", "short atttendance"]);
  }

});


//myclass functions start here









//cron job for covid function
cron.schedule("1 10 * * */1", async () => {
  bot.sendMessage(chatId, "/covid");
  console.log(chatId);
  var msg = { text: '/covid', chat: { id: chatId } };
  console.log(msg.chat.id);
  await covid(bot, msg);
});
//cron job for delclasss function
cron.schedule("55 */1 * * 0-6 ", async () => {
  bot.sendMessage(chatId, "/delclass");
  console.log(chatId);
  var msg = { text: '/delclass', chat: { id: chatId } };
  await myclass(bot, msg);
});



//cron job for updation of classes when done
// cron.schedule("* * * * *", async () => {
//   
//  });


bot.on("polling_error", err => console.log(err));