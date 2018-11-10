// node index.js
// forever start index.js

let Botkit = require('botkit')
let R = require("r-script")
require("dotenv").config()

// initialize
let controller = Botkit.slackbot()
let bot = controller.spawn({ token: process.env.DB_TOKEN })
  .startRTM(err => { if (err) throw new Error('Could not connect to Slack') })

// hear the direct message
controller.hears(["hello"], ["direct_message", "direct_mention", "mention"],
  (bot, message) => bot.reply(message, 'hello! I am bot!!'))

let notifDay = function() {
  bot.say({
    channel: "bot-notification",
    text: "にゃんこ大戦争"
  })
}

let notifTime = function() {
  let out = R("scraping.R").callSync()
  bot.say({
    channel: "bot-notification",
    text: out
  })
}

notifTime()