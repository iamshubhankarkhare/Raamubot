
const axios = require("axios");
const news = async (bot, msg) => {
    let args = msg.text.split(" ");
    const chatId = msg.chat.id;
    if (args[0] == "/news") {
        if (args[1]) {
            var i = Math.floor(Math.random() * 100);
            let res = await axios.get(`https://newsapi.org/v2/everything?q=${args[1]}&apiKey=${process.env.NEWS_API_KEY}`);
            let out = `${res.data.articles[i].title}\n\n${res.data.articles[i].description}\n${res.data.articles[i].url}`;
            bot.sendMessage(msg.chat.id, out);

        }
        else{
            var i = Math.floor(Math.random() * 10);
            let res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
            let out = `${res.data.articles[i].title}\n\n${res.data.articles[i].description}\n${res.data.articles[i].url}`;
            bot.sendMessage(msg.chat.id, out);
        }

    }
}
module.exports = news;