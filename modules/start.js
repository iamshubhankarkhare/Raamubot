const start = async (bot, msg) => {
    let args = msg.text.split(" ");
    const chatId = msg.chat.id;
    if (args[0] == "/start" || args[0] == "/heyraamu") {
        var start = `Hi! I'm Raamu. Your quarantine partner.\nHere are a few commands to get the best out of me:\n
  /covid : I'll provide you the current covid stats of india\n
  /movie <movie title> : Get details about the movie\n
  /gangsta : I be bout ta translate yo' lyrics ta gangsta\n
  /addclass <subject> <mm-dd-yyyy hh:mm> : I'll keep a track of this class \n
  /showclass : I'm keeping a track of all these classes\n
  I got more features, let'em be a surprise though XD`;
        
        bot.sendMessage(msg.chat.id, start);



    }

}
module.exports = start;