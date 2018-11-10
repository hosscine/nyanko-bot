needs(tidyverse)
needs(rvest)
needs(lubridate)

x <- read_html("https://ponos.s3.amazonaws.com/information/appli/battlecats/calendar/index.html")

table <- x %>%
  html_nodes("div.cld_box01") %>% 
  html_node("table") %>% 
  html_table() %>% 
  imap_dfr(~ tibble(wday = rep(.y, nrow(.x[-1,])),
                    time = .x[-1,]$X1,
                    name = .x[-1,]$X2 %>% str_sub(2)))

events <- table$name %>% str_split("・") %>% unlist() %>% unique()
week.day <- today() %>% wday()

check <- input[[1]] %>% unlist

target.event <- table %>% filter(wday == week.day, name %in% events[check])
target.event$time %<>% str_sub(1, -5) %>% paste0(":00~")
target.event$name %<>% map(~ (. == events) %>% which) %>% as.numeric
target.event
