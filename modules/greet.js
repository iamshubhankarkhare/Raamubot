const greet = (bot, msg) => {
    if (msg.new_chat_members) {
      let out = "Hi  ";
      const welcomemsg = msg.new_chat_members.map(usr => {
        out = out + " @" + usr.username +" wassup man! Know more about me by sneding /start or /heyraamu... ";
      });
      bot.sendMessage(msg.chat.id, out);
    }
    if (msg.left_chat_member) {
      bot.sendMessage(msg.chat.id, "Bye @" + msg.left_chat_member.username + " you will be remembered!");
    }
  };
  
  module.exports = greet;