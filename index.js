// node index.js
// forever start index.js

let Botkit = require('botkit')
require("dotenv").config()

let controller = Botkit.slackbot()
let bot = controller.spawn({
  token: process.env.DB_TOKEN
}).startRTM(function (err, bot, payload) {
  // 初期処理
  if (err) {
    throw new Error('Could not connect to Slack')
  }
})
controller.hears(["hello"], ["direct_message", "direct_mention", "mention"], function (bot, message) {
  // キーワードに反応した処理
  bot.reply(message, 'hello! I am bot!!')
})
console.log("start!!")