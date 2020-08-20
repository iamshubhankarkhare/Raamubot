let jsonData = require('../timetable.json');
const timetable = async (bot, msg) => {
  let args = msg.text.split(' ');
  const chatId = msg.chat.id;
  const date = new Date();
  const curHrs = date.getHours().toString();
  const curMins = date.getMinutes().toString();
  const curTime = curHrs + ':' + curMins;
  if (args[0] == '/timetable') {
    var out = 'This is what we have today fellas..\n\n';
    jsonData.data[date.getDay() - 1].classes.map(el => {
      out = out + `${el.sub} at ${el.time} \n on ${el.meet}\n\n`;
    });
    bot.sendMessage(msg.chat.id, out);
  }
  if (args[0] == '/remindtimetable') {
    const intro = [
      'Bullshit alert!!',
      "I'm telling ya ..Drop the fuck out!!!",
      'Start a startup or Something man',
      'Go attend a class.. shoo',
      'One more!!!',
      'These mfs ...',
      'Mark my proxy bruh..',
      "Shit's real",
      'U got Something better to do??',
      'Just drop out already!!!',
      'I know it sucks...',
    ];
    var flag = false;
    var number = Math.floor(Math.random() * 10);
    var out = `${intro[number]}\n\n`;
    jsonData.data[date.getDay() - 1].classes.map(el => {
      var timeAr = el.time.split(':');
      if (timeAr[0] - curHrs == 1) {
        out =
          out + `${el.sub} in ${60 - curMins} mins \n\nmeet : ${el.meet}\n\n`;
        flag = true;
      }
    });
    if (flag) {
      bot.sendMessage(msg.chat.id, out);
    }
  }
};

module.exports = timetable;
