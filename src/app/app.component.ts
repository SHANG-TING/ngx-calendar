import { Component, OnInit } from '@angular/core';
import { NgxHmCalendarEvent, NgxHmCalendarEventCategory } from 'ngx-hm-calendar';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  theme = 'black';
  title = 'app';
  eventCategorys: NgxHmCalendarEventCategory[] = [];
  weeklyEvents: NgxHmCalendarEvent[] = [];
  events: NgxHmCalendarEvent[] = [
    {
      title: '學科',
      start: new Date(2018, 7, 6, 18, 30),
      end: new Date(2018, 7, 6, 21, 0),
      color: 'orange',
      url:
        'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform',
    },
    {
      title: '學科',
      start: new Date(2018, 7, 4, 9, 30),
      end: new Date(2018, 7, 4, 12, 0),
      color: 'orange',
      url:
        'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform',
    },
    {
      title: '學科',
      start: new Date(2018, 7, 13, 18, 30),
      end: new Date(2018, 7, 13, 21, 0),
      color: 'orange',
      url:
        'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform',
    },
    {
      title: '學科',
      start: new Date(2018, 7, 11, 9, 30),
      end: new Date(2018, 7, 11, 12, 0),
      color: 'orange',
      url:
        'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform',
    },
    {
      title: '學科',
      start: new Date(2018, 7, 20, 18, 30),
      end: new Date(2018, 7, 20, 21, 0),
      color: 'orange',
      url:
        'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform',
    },
    {
      title: '學科',
      start: new Date(2018, 7, 18, 9, 30),
      end: new Date(2018, 7, 18, 12, 0),
      color: 'orange',
      url:
        'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform',
    },
    {
      title: '學科',
      start: new Date(2018, 7, 27, 18, 30),
      end: new Date(2018, 7, 28, 21, 0),
      color: 'orange',
      url:
        'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform',
    },
    {
      title: '學科',
      start: new Date(2018, 7, 25, 9, 30),
      end: new Date(2018, 7, 25, 12, 0),
      color: 'orange',
      url:
        'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform',
    },
  ];

  ngOnInit(): void {
    ajax.getJSON('/assets/data.json').subscribe(({ eventCategorys, weeklyEvents, events }) => {
      this.eventCategorys = eventCategorys;
      this.weeklyEvents = weeklyEvents.map(x => {
        x.start = new Date(x.start);
        x.end = new Date(x.end);
        return x;
      });
      this.events = events.map(x => {
        x.start = new Date(x.start);
        x.end = new Date(x.end);
        return x;
      });
    });
  }

  addEvent() {
    const newEvents = this.events.slice();
    newEvents.push(this.events[0]);
    this.events = newEvents;
  }

  onOpenEvent($event: NgxHmCalendarEvent) {
    // alert(JSON.stringify($event));
    window.open($event.url);
  }

  changeTheme() {
    this.theme = this.theme === 'black' ? 'white' : 'black';
  }
}
