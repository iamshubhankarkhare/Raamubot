
const axios = require("axios");
const news = async (bot, msg) => {
    let args = msg.text.split(" ");
    const chatId = msg.chat.id;
    if (args[0] == "/news") {
        if (args[1]) {
       // var i=Math.floor(Math.random() * 10);
        let res = await axios.get(`https://newsapi.org/v2/everything?q=${args[1]}&apiKey=${process.env.NEWS_API_KEY}`);
        var out=`${res.data.articles[1].title}\n\n${res.data.articles[1].description}\n${res.data.articles[1].url}`;
        bot.sendMessage(msg.chat.id, out );
        bot.sendPhoto(chatId, res.data.articles[1].urlToImage, { caption: out });

        }
        
    }
}
module.exports = news;