const axios = require("axios");
const movie = async (bot, msg) => {
    let args = msg.text.split(" ");
    const chatId = msg.chat.id;
    if (args[0] == "/movie") {
        delete args[0];
        let title = "";
        args.map((arg) => { title += arg + " "; });

        let res = await axios.get(`https://www.omdbapi.com/?apikey=d8b157cf&t=${title}`);
        //bot.sendMessage(chatId, JSON.stringify(res.data) );
        bot.sendPhoto(chatId, res.data.Poster, { caption: "\nTile: " + res.data.Title + "\nYear: " + res.data.Year + "\nDuration: " + res.data.Runtime + "\nGenre: " + res.data.Genre + "\n\nPlot: " + res.data.Plot + "\n\nRatings: " + res.data.imdbRating });

    }
}
module.exports = movie;