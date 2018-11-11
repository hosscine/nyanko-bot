// node index.js
// forever start index.js

let Botkit = require('botkit')
let moment = require("moment")
let CronJob = require("cron").CronJob
require("dotenv").config()

let check = require("./assets/json/check_list.json")
let monthly = require("./assets/json/monthly_guerrilla.json")
let weekly = require("./assets/json/weekly_guerrilla.json")

let getDayGuerrilla = function (mday, wday) {
  let events = []

  for (let event of weekly)
    if (event.event[0] && event.wday === wday)
      events = events.concat(parseWeek(event))

  for (let event of monthly)
    if (event.mday === mday)
      events.push({
        name: event.event,
        time: event.time + " " +
          (event.event === "逆襲のカバちゃん" ? "(1時間)" : "(12時間)")
      })
  return events
}

let parseWeek = function (event) {
  if (event.event.length === 1)
    return { name: event.event[0], time: event.time }
  let events = []
  for (let name of event.event)
    events.push({ name: name, time: event.time })
  return events
}

// initialize
let controller = Botkit.slackbot()
let bot = controller.spawn({ token: process.env.DB_TOKEN })
  .startRTM(err => { if (err) throw new Error('Could not connect to Slack') })

// hear the direct message
controller.hears(["hello"], ["direct_message", "direct_mention", "mention"],
  (bot, message) => bot.reply(message, 'hello! I am bot!!'))

new CronJob("* 05 02 * * *", () => {
  console.log("hello")
}, null, true)

let notifDay = function () {
  bot.say({
    channel: "bot-notification",
    text: "にゃんこ大戦争"
  })
}

let notifTime = function () {
  bot.say({
    channel: "bot-notification",
    text: event.time + " " + names[event.name - 1]
  })
}

console.log(getDayGuerrilla(11, 1))