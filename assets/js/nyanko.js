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
    let notify = []
    for (let event of events) {
      let ehour = parseInt(event.time.substring(0, 2))
      if (ehour === hour)
        for (let p of policy)
          if (p.name === event.name)
            if (p.notify)
              notify.push(event)
    }

    if (notify.length === 0) return
    else return this.formatWeekMessage(notify)
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
  },

  formatWeekMessage(events) {
    let time = events[0].time
    let header = "イベントが" + time.substring(0, time.length - 4) + "時から始まるにゃ\n"
    let contents = events.reduce((a, e) => a + "- " + e.name + "\n", "")
    return header + contents.substring(0, contents.length - 1)
  }
}
