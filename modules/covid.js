const axios = require("axios");
const covid = async (bot, msg) => {
    let args = msg.text.split(" ");
    const chatId = msg.chat.id;
    if (args[0] == "/covid") {
        bot.sendMessage(chatId, "covid running");
        let res = await axios.get("https://api.covid19india.org/data.json");
        let { cases_time_series } = res.data;
        let {
            dailyconfirmed,
            dailydeceased,
            dailyrecovered,
            totalconfirmed,
            totaldeceased,
            totalrecovered
        } = cases_time_series[cases_time_series.length - 1];
        let output = " " + "Here are the stats for India : \n\nTotal confirmed cases: " + totalconfirmed + "\n\nTotal deaths: " + totaldeceased + "\n\nTotal recovered: " + totalrecovered + "\n\nNew cases today: " + dailyconfirmed + "\n\nStay home \nStay safe";
        bot.sendMessage(chatId, output);


        //console.log(dataConfirmed);



    }

}
module.exports = covid;