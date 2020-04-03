//const resp=require("../static/myclass.json");
const fs=require('fs');
const path =require("path");
const p=path.resolve("myclass.json");
const res=fs.readFileSync(p);
const resp=JSON.parse(res);


const myclass = async (bot, msg) => {
    let args = msg.text.split(" ");
    const chatId = msg.chat.id;
    //for showclass
    if (args[0] == "/showclass") {
        bot.sendMessage(chatId, "myclass running");
        var out=""
        for (let i = 0; i < resp.classes.length; i++) {
            if (resp.classes[i].read===true) {
                 out+="Sub: "+resp.classes[i].sub+"\nDate: "+resp.classes[i].date+"\n\n"; 
            } 
        }
        if(out.length==0)
            out="Naah! No classes"; 
        bot.sendMessage(chatId, out);     
    }
    if(args[0]=="/addclass")
    {
        
        console.log(p);
        resp["classes"].push({
			"sub": "new",
			"date": 30,
			"time": {
				"hours": 316,
				"min": 61
            },
            "read":true
        });
        console.log(resp);
        fs.writeFile("myclass.json", JSON.stringify(resp), function (err) {
            if (err) throw err;
            console.log('Updated!');
          });
    }
}
    module.exports = myclass;