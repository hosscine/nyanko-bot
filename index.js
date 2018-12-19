// node index.js
// forever start index.js

let moment = require("moment")
let { CronJob } = require("cron")
let { WebClient } = require('@slack/client')
let nyanko = require("./assets/js/nyanko.js")
require("dotenv").config()

let todayEvents

/*
  Posting per day
*/
postDay = function() {
  initializeEvents()
  let policy = nyanko.readPolicy()
  let message = nyanko.getDayMessage(todayEvents, policy)
  post(message)
}

/*
  Posting per hour
*/
postHour = function() {
  if (!todayEvents) initializeEvents()
  let policy = nyanko.readPolicy()
  let hour = parseInt(moment().format("HH"))
  let message = nyanko.getHourMessage(hour, todayEvents, policy)
  if(message) post(message)
}

new CronJob("00 00 00 * * *", postDay, null, true)
new CronJob("00 00 * * * *", postHour, null, true)


/*
  Slack API
*/
// An access token (from your Slack app or custom integration - xoxa, xoxp, or xoxb)
const web = new WebClient(process.env.DB_TOKEN)
// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = process.env.DB_CHANNEL

let post = function (message) {
  // See: https://api.slack.com/methods/chat.postMessage
  web.chat.postMessage({ channel: conversationId, text: message })
    // `res` contains information about the posted message
    .then(res => console.log('Message sent: ', res.ts))
    .catch(console.error)
}

let initializeEvents = function() {
  let now = moment()
  let mday = parseInt(now.format("DD"))
  let wday = parseInt(now.format("E"))
  todayEvents = nyanko.getTodayEvents(mday, wday)
}
