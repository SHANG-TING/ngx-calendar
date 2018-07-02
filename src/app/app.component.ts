import { Component } from '@angular/core';
import { CalendarEvent, colors } from './ngx-calendar/@core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  events: CalendarEvent[] = [
    {
      title: '蘭嶼課程-1',
      start: new Date(2018, 6, 13),
      end: new Date(2018, 6, 16),
      color: colors.orange,
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform'
    } as CalendarEvent,
    {
      title: '蘭嶼課程-2',
      start: new Date(2018, 6, 24),
      end: new Date(2018, 6, 27),
      color: colors.orange,
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform'
    } as CalendarEvent,
    {
      title: '蘭嶼海訓-1',
      start: new Date(2018, 5, 26),
      end: new Date(2018, 5, 28),
      color: colors.blue,
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform'
    } as CalendarEvent,
    {
      title: '蘭嶼海訓-2',
      start: new Date(2018, 5, 27),
      end: new Date(2018, 5, 29),
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
}
