//const resp=require("../static/myclass.json");
const fs = require('fs');
const path = require("path");
const cron = require("node-cron");
const p = path.resolve("myclass.json");
const res = fs.readFileSync(p);
const resp = JSON.parse(res);


const myclass = async (bot, msg) => {
    let args = msg.text.split(" ");
    const chatId = msg.chat.id;
    //for showclass
    if (args[0] == "/showclass") {
        bot.sendMessage(chatId, "myclass running");
        var out = ""
        for (let i = 0; i < resp.classes.length; i++) {
            if (resp.classes[i].read === true) {
                var temp2=new Date(resp.classes[i].date);
                console.log(typeof(temp2));
                console.log("temp2= "+temp2);
                out += "Sub: " + resp.classes[i].sub + "\nDate: " +temp2+ "\n\n";
            }
        }
        if (out.length == 0)
            out = "Naah! No classes";
        bot.sendMessage(chatId, out);
    }
    if (args[0] == "/addclass") {
        //var inp=`{"sub":"${args[1]}","date":12,"time":{"hours":999,"min":99},"read":true}`;
        //     var date = new Date();
        //     console.log("date= "+date+" "+typeof(date));
        //     var date_json=JSON.stringify(date);
        //     console.log("\ndate_json"+date_json+" "+typeof(date_json));
        //     var date2=new Date(JSON.parse(date_json));
        //     console.log("args= "+args[1]+" "+typeof(args[1]));
        //     console.log("date2="+date2+" "+typeof(date2));
        //    // var temp=""+args[1]+"-06:00";
        //     var date_user=new Date(2020, 04, 03, 19);
        //     console.log(" \n\ndate_user= "+date_user+" "+typeof(date_user));
        //     console.log(JSON.stringify(date_user));
        //     var date3=new Date(JSON.parse(JSON.stringify(date_user)));
        //     console.log("date3"+date3);


        //     var fdate=new Date(2020, 04, 03, 22);
        //     var edate=new Date(2020, 04, 03, 21);
        //     console.log("fdate = 0"+fdate);
        //     console.log("edate = 0"+edate);
        //     console.log("\n\n"+fdate.getTime()-edate.getTime());

        var date_user=new Date(`${args[2]} ${args[3]}`);
        console.log(" \n\ndate_user= "+date_user+" "+typeof(date_user));
        var temp=JSON.stringify(date_user);
        console.log("temp= "+temp+" "+typeof(temp));
        
        var inp=`{"sub":"${args[1]}","date":${temp},"read":true}`;
        resp["classes"].push(JSON.parse(inp));
        console.log(resp);
        fs.writeFile("myclass.json", JSON.stringify(resp), function (err) {
                if (err) throw err;
                console.log('Updated!');
            });









        // console.log(p);
        // resp["classes"].push(JSON.parse(inp));
        // console.log(resp);
        // fs.writeFile("myclass.json", JSON.stringify(resp), function (err) {
        //     if (err) throw err;
        //     console.log('Updated!');
        // });
    }
    if (args[0] == "/delclass") {

        console.log(resp.classes.length);
        var removeIndex = resp.classes.map(function (item) { return item.read; }).indexOf(true);
        console.log(removeIndex);
        resp.classes.splice(removeIndex, 1);



        cron.schedule("* * * * * ", async () => {
            var removeIndex = resp.classes.map(function (item) { return item.read; }).indexOf(true);
            console.log(removeIndex);
            if (removeIndex != -1) {
                await resp.classes.splice(removeIndex, 1);
            }

            console.log(resp);
            fs.writeFile("myclass.json", JSON.stringify(resp), function (err) {
                if (err) throw err;
                console.log('Updated!');
            });
        });

        console.log(resp.classes.length);

        console.log(resp);

    }
}
module.exports = myclass;