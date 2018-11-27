let todayEvents
let check = require("../json/check_list.json")
let monthly = require("../json/monthly_guerrilla.json")
let weekly = require("../json/weekly_guerrilla.json")

module.exports = {

  getTodayEvents(mday, wday) {
    let events = []
  
    for (let event of weekly)
      if (event.event[0] && event.wday === wday)
        events = events.concat(this.parseWeek(event))
  
    for (let event of monthly)
      if (event.mday === mday)
        events.push({
          name: event.event,
          time: event.time + " " +
            (event.event === "逆襲のカバちゃん" ? "(1時間)" : "(12時間)")
        })
    return events
  },

  readPolicy() {
    return check
  },

  writePolicy() {

  },

  getDayMessage(events, policy) {
    return this.formatDayMessage(events)
  },

  getHourMessage(hour, events, policy) {

  },

  parseWeek(event) {
    if (event.event.length === 1)
      return { name: event.event[0], time: event.time }
    let events = []
    for (let name of event.event)
      events.push({ name: name, time: event.time })
    return events
  },

  formatDayMessage(events) {
    let header = "今日のイベントはこんな感じにゃ\n"
    let contents = events.reduce((a, e) => a + e.time + " " + e.name + "\n", "")
    return header + contents
  }
}
