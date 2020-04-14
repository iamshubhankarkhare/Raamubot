//const resp=require("../static/myclass.json");
const fs = require('fs');
const path = require("path");
const p = path.resolve("myclass.json");
const res = fs.readFileSync(p);
const resp = JSON.parse(res);


const myclass = async (bot, msg) => {
    let args = msg.text.split(" ");
    const chatId = msg.chat.id;
    //for showclass
    if (args[0] == "/showclass") {
        
        var out = ""
        for (let i = 0; i < resp.classes.length; i++) {
            if (resp.classes[i].read === false) {
                var temp2 = new Date(resp.classes[i].date);
                out += "Sub: " + resp.classes[i].sub + "\nDate: " + temp2 + "\n\n";
            }
        }
        if (out.length == 0)
            out = "Naah! No classes";
        bot.sendMessage(chatId, out);
    }
    //addclass
    if (args[0] == "/addclass") {
        if (args[1]==undefined || args[2]==undefined || args[3]==undefined  )  {
            bot.sendMessage(chatId, `Something's wrong ...i can feel it \n This here is the format:\n /addclass mm-dd-yyyy hh:mm`);
        } else {
            var date_user = new Date(`${args[2]} ${args[3]}`);
            var temp = JSON.stringify(date_user);
    
            var inp = `{"sub":"${args[1]}","date":${temp},"read":false}`;
            resp["classes"].push(JSON.parse(inp));
           
            fs.writeFile("myclass.json", JSON.stringify(resp), function (err) {
                if (err) throw err;
                bot.sendMessage(chatId, `Roger that! I'll keep a track of ${args[1]} class.`);
            });
        }
    }
    if (args[0] == "/delclass") {
        var removeIndex = resp.classes.map(function (item) { return item.read; }).indexOf(true);
       
        if (removeIndex != -1) {
            resp.classes.splice(removeIndex, 1);
        }

       
        fs.writeFile("myclass.json", JSON.stringify(resp), function (err) {
            if (err) throw err;
         
        });
    }

    //updateclass
    if (args[0] == "/updateclass") {
        for (let i = 0; i < resp.classes.length; i++) {
            if (resp.classes[i].read === false) {
                var ndate = new Date();
              
                var gh = JSON.parse(JSON.stringify(resp.classes[i].date));
                var cdate = new Date(gh);
                if ((ndate.getTime() - cdate.getTime()) > 0) {
                    resp.classes[i].read = true;
                }
                else {
                   
                }
            }
        }
        fs.writeFile("myclass.json", JSON.stringify(resp), function (err) {
            if (err) throw err;
          
        });
    }
    //for reminder
    if (args[0] == "/remclass") {
        for (let i = 0; i < resp.classes.length; i++) {
            if (resp.classes[i].read === false) {
                var ndate = new Date();
                var gh = JSON.parse(JSON.stringify(resp.classes[i].date));
                var cdate = new Date(gh);
                var time_diff = cdate.getTime() - ndate.getTime();
                if (time_diff < 900000 && time_diff > 0) {
                    var rem_msg = `You have ${resp.classes[i].sub} class in ${Math.round((time_diff) / 60000)} mins`;
                   
                    bot.sendMessage(chatId, rem_msg);
                }
            }
        }

    }
}
module.exports = myclass;