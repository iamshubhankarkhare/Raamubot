const greet = (bot, msg) => {
    if (msg.new_chat_members) {
      let out = "Hi  ";
      const welcomemsg = msg.new_chat_members.map(usr => {
        out = out + " wassup man! Know more about me by sending /start or /heyraamu... ";
        console.log(out);
      });
      bot.sendMessage(msg.chat.id, out);
    }
    if (msg.left_chat_member) {
      bot.sendMessage(msg.chat.id, "Bye you will be remembered!");
    }
  };
  
  module.exports = greet;