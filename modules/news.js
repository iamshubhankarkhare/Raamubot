
const axios = require("axios");
const news = async (bot, msg) => {
    let args = msg.text.split(" ");
    const chatId = msg.chat.id;
    if (args[0] == "/news") {
        if (args[1]) {
            
        let res = await axios.get(`https://newsapi.org/v2/everything?q=${args[1]}&apiKey=${process.env.NEWS_API_KEY}`);
        var out=`news: ${res.data.articles.title}`;
        bot.sendMessage(msg.chat.id, "news running" );
        bot.sendMessage(msg.chat.id, out );
        }
        
    }
}
module.exports = news;