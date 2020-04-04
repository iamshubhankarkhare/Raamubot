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
    if (args[0] == "/addclass") {


        var date_user = new Date(`${args[2]} ${args[3]}`);
        var temp = JSON.stringify(date_user);

        var inp = `{"sub":"${args[1]}","date":${temp},"read":false}`;
        resp["classes"].push(JSON.parse(inp));
        console.log(resp);
        fs.writeFile("myclass.json", JSON.stringify(resp), function (err) {
            if (err) throw err;
            console.log('Updated! from addclass');
            bot.sendMessage(chatId, `${args[1]} class added`);
        });
    }
    if (args[0] == "/delclass") {
        var removeIndex = resp.classes.map(function (item) { return item.read; }).indexOf(true);
        console.log(removeIndex);
        if (removeIndex != -1) {
            resp.classes.splice(removeIndex, 1);
        }

        console.log(resp);
        fs.writeFile("myclass.json", JSON.stringify(resp), function (err) {
            if (err) throw err;
            console.log('Updated! from delclass');
        });
    }

    //updateclass
    if (args[0] == "/updateclass") {
        for (let i = 0; i < resp.classes.length; i++) {
            if (resp.classes[i].read === false) {
                var ndate = new Date();
                console.log("ndate= " + ndate + " " + typeof (ndate));
                var gh = JSON.parse(JSON.stringify(resp.classes[i].date));
                var cdate = new Date(gh);
                if ((ndate.getTime() - cdate.getTime()) > 0) {
                    resp.classes[i].read = true;
                }
                else {
                    console.log("not yet\n\n");
                }
            }
        }
        fs.writeFile("myclass.json", JSON.stringify(resp), function (err) {
            if (err) throw err;
            console.log('Updated! from update class');
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
                    var rem_msg = `${Math.round((time_diff) / 60000)} min to ${resp.classes[i].sub} class`;
                    console.log(rem_msg);
                    bot.sendMessage(chatId, rem_msg);
                }
                else {
                    console.log("no\n\n");
                }
            }
        }

    }
}
module.exports = myclass;