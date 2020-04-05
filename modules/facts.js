const axios = require("axios");
const facts = async (bot, msg) => {
    let args = msg.text.split(" ");
    const chatId = msg.chat.id;
    if (args[0] == "/facts") {

        let res = await axios.get(`https://uselessfacts.jsph.pl/random.json?language=en`);
        console.log(res.data);
        console.log(res.data.text);
        bot.sendMessage(chatId, res.data.text);

    }
}
module.exports = facts;