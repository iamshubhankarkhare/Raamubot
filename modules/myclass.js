const resp=require("../static/myclass.json");
const axios = require("axios");

const myclass = async (bot, msg) => {
    let args = msg.text.split(" ");
    const chatId = msg.chat.id;
    //for showclass
    if (args[0] == "/showclass") {
        bot.sendMessage(chatId, "myclass running");
        var out=""
        for (let i = 0; i < resp.myclass.length; i++) {
            if (resp.myclass[i].read===true) {
                 out+="Sub: "+resp.myclass[i].sub+"\nDate: "+resp.myclass[i].date+"\n\n"; 
            } 
            if(out.length==0)
            out="Naah! No classes"; 
        }
        bot.sendMessage(chatId, out);     
    }
    if(args[0]=="/addclass")
    {
        resp.myclass.sub="algo";
       
        console.log(resp.myclass[resp.myclass.length-1]);
    }
}
    module.exports = myclass;