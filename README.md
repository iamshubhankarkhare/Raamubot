#Raamubot (telegram bot)

Raamubot is a funny friendly telegram bot built on node js.
It keeps a track of all online classes and give timely reminders about the class.
It provides daily covid stats of India.
It gives the users details of a particular movie.
It gives the users some random facts when asked.
It sends polls in the chat for convenience.
It sends response for certain fixed sentences.

#Setup
*Clone the repository with git clone https://github.com/iamshubhankarkhare/Raamubot.git
*npm init
* Request a bot from BotFather in telegram
*Make a new file named as .env and write into it the telegram bot token you receive from the BotFather as TELEGRAM_API_TOKEN = YOUR_TOKEN_HERE
Run node index.js

#Commands

*/start : List all the bot commands available
*/covid :  provides you the current covid stats of india
*/movie <movie title> : Get details about the movie
*/gangsta <sentence>: translate a sentence to gangsta
*/addclass <subject> <mm-dd-yyyy hh:mm> : Keeps a track of this class 
*/showclass : Shows the classes being tracked
*/facts : Hits you with a useless fact

