
const axios = require("axios");
const news = async (bot, msg) => {
    let args = msg.text.split(" ");
    const chatId = msg.chat.id;
    if (args[0] == "/news") {
        if (args[1]) {
            
            const res = await axios.get(`https://newsapi.org/v2/everything?q=${args[i]}&apiKey=${process.env.NEWS_API_KEY}`);
        }
        else{
            const res = await axios.get(`https://newsapi.org/v2/everything?q=corona&apiKey=${process.env.NEWS_API_KEY}`);

        }
        var i = Math.floor(Math.random() * 100);
        let out = `${res.data.articles[i].title}\n\n${res.data.articles[i].description}\n${res.data.articles[i].url}`;
        bot.sendMessage(msg.chat.id, out);

    }
}
module.exports = news;