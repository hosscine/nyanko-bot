// node index.js
// forever start index.js

let moment = require("moment")
let CronJob = require("cron").CronJob
let WebClient = require('@slack/client');
require("dotenv").config()
require("./assets/js/nyanko.js")

let check = require("./assets/json/check_list.json")
let monthly = require("./assets/json/monthly_guerrilla.json")
let weekly = require("./assets/json/weekly_guerrilla.json")

new CronJob("00 00 00 * * *", () => {
  let now = moment()
  let mday = parseInt(now.format("DD"))
  let wday = parseInt(now.format("E"))
  todayEvents = getTodayEvents(mday, wday)
  let policy = getPolicy()

  let message = getDayMessage(todayEvents, eventPolicy)
  post(message)
}, null, true)

new CronJob("00 00 * * * *", () => {
  let now = moment()
  let hour = parseInt(now.format("HH"))
  let policy = getPolicy()

  let message = getHourMessage(hour, todayEvents, eventPolicy)
  post(message)
}, null, true)

// An access token (from your Slack app or custom integration - xoxa, xoxp, or xoxb)
const web = new WebClient(process.env.DB_TOKEN)
// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = process.env.DB_CHANNEL;

let post = function (message) {
  // See: https://api.slack.com/methods/chat.postMessage
  web.chat.postMessage({ channel: conversationId, text: message, as_user: true })
    // `res` contains information about the posted message
    .then(res => console.log('Message sent: ', res.ts))
    .catch(console.error)
}