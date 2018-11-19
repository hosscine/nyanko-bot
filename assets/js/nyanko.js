let todayEvents = {}
let getTodayEvents = function (mday, wday) {
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
console.log("hoge")
let readPolicy = function () {

}

let writePolicy = function() {

}

let getDayMessage = function(events, policy) {
  
}

let getHourMessage = function(hour, events, policy) {

}

let parseWeek = function (event) {
  if (event.event.length === 1)
    return { name: event.event[0], time: event.time }
  let events = []
  for (let name of event.event)
    events.push({ name: name, time: event.time })
  return events
}

let formatDayMessage = function (events) {
  let header = "今日のイベントはこんな感じにゃ\n"
  let contents = events.reduce((a, e) => a + e.time + " " + e.name + "\n", "")
  return header + contents
}