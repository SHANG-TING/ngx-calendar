import { Component } from '@angular/core';
import { CalendarEvent, colors } from './ngx-calendar/@core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  theme = 'black';
  title = 'app';
  events: CalendarEvent[] = [
    {
      title: '蘭嶼課程-A',
      start: new Date(2018, 6, 13, 9, 0),
      end: new Date(2018, 6, 16, 18, 0),
      color: colors.orange,
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform'
    } as CalendarEvent,
    {
      title: '蘭嶼課程-B',
      start: new Date(2018, 6, 16, 13, 30),
      end: new Date(2018, 6, 16, 22, 0),
      color: colors.orange,
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform'
    } as CalendarEvent,
    {
      title: '蘭嶼海訓-A',
      start: new Date(2018, 6, 16, 10, 30),
      end: new Date(2018, 6, 20, 16, 30),
      color: colors.blue,
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform'
    } as CalendarEvent,
    {
      title: '蘭嶼海訓-B',
      start: new Date(2018, 6, 7, 7, 30),
      end: new Date(2018, 6, 29, 11, 30),
      color: colors.blue,
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform'
    } as CalendarEvent
  ];

  addEvent() {
    const newEvents = this.events.slice();
    newEvents.push(this.events[0]);
    this.events = newEvents;
  }

  onOpenEvent($event: CalendarEvent) {
    // alert(JSON.stringify($event));
    window.open($event.url);
  }

  changeTheme() {
    this.theme = this.theme === 'black' ? 'white' : 'black';
  }
}
