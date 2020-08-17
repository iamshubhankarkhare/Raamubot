const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const greet = require('./modules/greet');
const start = require('./modules/start');
const covid = require('./modules/covid');
const news = require('./modules/news');
const myclass = require('./modules/myclass');
const movie = require('./modules/movie');
const facts = require('./modules/facts');
const timetable = require('./modules/timetable');
const G = require('gizoogle');
const cron = require('node-cron');
require('dotenv').config();
const token = process.env.TELEGRAM_API_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const read = fs.readFileSync(path.resolve('myclass.json'));
const resp = JSON.parse(read);

bot.onText(/\/echo (.+)/, (msg, match) => {
  chatId = msg.chat.id;
  const res = match[1];

  bot.sendMessage(chatId, res);
});

//gangsta
bot.onText(/\/gangsta (.+)/, (msg, match) => {
  const res = match[1];
  if (res == '') {
    bot.sendMessage(
      msg.chat.id,
      "what is I supposed ta translate ..fo' realz man? Give me a sentence."
    );
  } else {
    G.string(res, function (error, translation) {
      bot.sendMessage(msg.chat.id, translation);
    });
  }
});

var chatId = '';
bot.on('message', (msg) => {
  chatId = msg.chat.id;
  greet(bot, msg);
  if (msg.text) {
    covid(bot, msg);
    movie(bot, msg);
    myclass(bot, msg);
    start(bot, msg);
    facts(bot, msg);
    news(bot, msg);
    timetable(bot, msg);
  }

  //on bye
  if (msg.text.toString().toLowerCase().includes('bye')) {
    bot.sendMessage(msg.chat.id, 'One man down! Bye');
  }
  if (msg.text.toString().toLowerCase().includes('mess')) {
    bot.sendMessage(msg.chat.id, 'I hear mess! Sure you wanna go to mess ?', {
      reply_markup: {
        keyboard: [
          ['Gate 1', 'Gate 3'],
          ['Shipra'],
          ['Mc Donalds'],
          ['Zomato'],
          ['Mess'],
        ],
      },
    });
  }
  if (msg.text.toString().toLowerCase().includes(' bkl ')) {
    bot.sendMessage(msg.chat.id, 'Abe tu bkl');
  }
  if (msg.text.toString().toLowerCase().includes(' mc ')) {
    bot.sendMessage(msg.chat.id, 'Abe tu mc');
  }
  const rep = 'I hear mess! Sure you wanna go to mess ?';
  if (msg.text.toString().toLowerCase().includes(' bc ')) {
    bot.sendPhoto(msg.chat.id, './static/abeysale.jpeg');
  }
  if (msg.text.toString().toLowerCase().includes(' bunk ')) {
    bot.sendPoll(
      msg.chat.id,
      "I hear mass bunk! Let's see what others have to say.",
      ["You son of a bitch , I'm in!", 'short atttendance']
    );
  }
});

//cron job for covid function
cron.schedule('1 10 * * */1', async () => {
  bot.sendMessage(chatId, 'Todays report on covid ...');
  var msg = { text: '/covid', chat: { id: chatId } };
  await covid(bot, msg);
});
//cron job for delclasss function
cron.schedule('*/30 * * * 0-6 ', async () => {
  var msg = { text: '/delclass', chat: { id: chatId } };
  await myclass(bot, msg);
});
//cron job for update function
cron.schedule('*/14 * * * * ', async () => {
  var msg = { text: '/updateclass', chat: { id: chatId } };
  await myclass(bot, msg);
});
//cron job for reminder function
cron.schedule('*/15 * * * *', async () => {
  var msg = { text: '/remclass', chat: { id: chatId } };
  await myclass(bot, msg);
});

bot.on('polling_error', (err) => console.log(err));
