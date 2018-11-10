// node index.js
// forever start index.js

let Botkit = require('botkit')
let R = require("r-script")
require("dotenv").config()

let names = ["にゃんチケ☆チャンス！", "ゲリラ月曜ステージ", "", "ゲリラ経験値にゃ！",
  "トレジャー☆フェスティバル（日本編）", "超ゲリラ経験値にゃ！", "レンガと宇宙石の洞窟",
  "備長炭と謎の骨の島", "羽根と歯車と黄金の岬", "トレジャー☆フェスティバル（未来編）",
  "ゲリラ火曜ステージ", "ゲリラ水曜ステージ", "ゲリラ木曜ステージ", "ゲリラ金曜ステージ"]
let check = [true, false, false, true,
  false, false, false,
  false, false, false,
  false, false, false, false]

// initialize
let controller = Botkit.slackbot()
let bot = controller.spawn({ token: process.env.DB_TOKEN })
  .startRTM(err => { if (err) throw new Error('Could not connect to Slack') })

// hear the direct message
controller.hears(["hello"], ["direct_message", "direct_mention", "mention"],
  (bot, message) => bot.reply(message, 'hello! I am bot!!'))

let notifDay = function () {
  bot.say({
    channel: "bot-notification",
    text: "にゃんこ大戦争"
  })
}

let notifTime = function () {
  let out = R("scraping.R")
    .data(check)
    .callSync()
  for (let event of out)
    bot.say({
      channel: "bot-notification",
      text: event.time + " " + names[event.name - 1]
    })
}

notifTime()