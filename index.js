// node index.js
// forever start index.js

let Botkit = require('botkit')
let moment = require("moment")
let CronJob = require("cron").CronJob
require("dotenv").config()
require("./assets/js/nyanko.js")

let check = require("./assets/json/check_list.json")
let monthly = require("./assets/json/monthly_guerrilla.json")
let weekly = require("./assets/json/weekly_guerrilla.json")

let notifHour = function (hour, todayEvents, eventPolicy) {
  let message = formatHourMessage(hour, todayEvents)
  bot.say({
    channel: "bot-notification",
    text: event.time + " " + names[event.name - 1]
  })
}

// initialize bot
let controller = Botkit.slackbot()
let bot = controller.spawn({ token: process.env.DB_TOKEN })
  .startRTM(err => { if (err) throw new Error('Could not connect to Slack') })

new CronJob("00 00 00 * * *", () => {
  let now = moment()
  let mday = parseInt(now.format("DD"))
  let wday = parseInt(now.format("E"))
  todayEvents = getTodayEvents(mday, wday)
  let policy = getPolicy()

  let message = getDayMessage(todayEvents, eventPolicy)
  bot.say({
    channel: "bot-notification",
    text: message
  })
}, null, true)

new CronJob("00 00 * * * *", () => {
  let now = moment()
  let hour = parseInt(now.format("HH"))
  let policy = getPolicy()

  let message = getHourMessage(hour, todayEvents, eventPolicy)
  bot.say({
    channel: "bot-notification",
    text: message
  })
}, null, true)

// hear the direct message
controller.hears(["hello"], ["direct_message", "direct_mention", "mention"],
  (bot, message) => bot.reply(message, 'hello! I am bot!!'))


const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxa, xoxp, or xoxb)
const token = process.env.DB_TOKEN;

const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = process.env.DB_CHANNEL;

// See: https://api.slack.com/methods/chat.postMessage
web.chat.postMessage({ channel: conversationId, text: 'Hello there', as_user: true })
  .then((res) => {
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);