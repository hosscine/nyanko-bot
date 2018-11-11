Sys.setenv(LANGUAGE="CP932")
library(tidyverse)
library(rvest)
library(lubridate)
library(magrittr)

x <- read_html("https://ponos.s3.amazonaws.com/information/appli/battlecats/calendar/index.html")

table <- x %>%
  html_nodes("div.cld_box01") %>%
  html_node("table") %>%
  html_table() %>%
  imap_dfr(~ tibble(wday = rep(.y, nrow(.x[-1,])),
                    time = .x[-1,]$X1,
                    event = .x[-1,]$X2 %>% str_sub(2)))

other <- x %>%
  html_node("div.block") %>%
  html_text() %>% 
  {reduce( c("\n", "\r", "\t"), str_remove_all, .init = .)} %>% 
  str_split("\u25cf") %>%
  extract2(1) %>%
  extract(2:3) %>%
  str_extract_all(regex(".\u65e5\uff08\\d+"), F) %>%
  map(str_split, "\u65e5\uff08", Inf, T) %>% 
  imap_dfr(~ tibble(mday = .[,2], time = .[,1], event = .y))

events <- table$event %>% str_split("?E") %>% unlist() %>% unique()
week.day <- today() %>% wday()
month.day <- today() %>% mday()

check <- c(TRUE, FALSE, FALSE, TRUE,
           FALSE, FALSE, FALSE,
           FALSE, FALSE, FALSE,
           FALSE, FALSE, FALSE, FALSE)

week.event <- table %>% filter(wday == week.day, event %in% events[check])
week.event$time %<>% str_sub(1, -5) %>% paste0(":00~")
week.event$event %<>% map(~ (. == events) %>% which) %>% as.numeric

month.event <- other %>% filter(mday == 6)

list(week = week.event, month = month.event)
