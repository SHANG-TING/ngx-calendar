import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { CalendarEvent, CalendarWeekDay } from '../../@core/models';

@Component({
  selector: 'ngx-calendar-week-view',
  templateUrl: './ngx-calendar-week-view.component.html',
  styleUrls: ['./ngx-calendar-week-view.component.scss']
})
export class NgxCalendarWeekViewComponent implements OnInit, OnChanges {

  @Input() className = 'black';
  @Input() dayName = '號';
  @Input() weekNames: string[] = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  @Input() events: CalendarEvent[] = [];
  @Input() nstr = new Date();

  weekDays: CalendarWeekDay[] = [];
  weekEvents: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setWeekDays();
  }

  setWeekDays() {
    const today = new Date();
    const nstrDay = this.nstr.getDay();
    const startDate = new Date(this.nstr.getTime());

    startDate.setDate(startDate.getDate() + (0 - nstrDay));

    this.weekDays = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate.getTime());

      date.setDate(date.getDate() + i);

      this.weekDays.push({
        date,
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        isToday: date.toDateString() === today.toDateString()
      } as CalendarWeekDay);
    }

    this.setWeekEvents();
  }

  setWeekEvents() {
    const firstWeekDay = this.weekDays[0];
    const firstdate = new Date(firstWeekDay.year, firstWeekDay.month, firstWeekDay.day);
    const firstday = firstdate.getDay();

    const lastWeekDay = this.weekDays[6];
    const lastdate = new Date(lastWeekDay.year, lastWeekDay.month, lastWeekDay.day);
    const lastday = lastdate.getDay();
    lastdate.setDate(lastdate.getDate() + 1);

    this.weekEvents = this.events
      .filter(e => {
        if (!e.end) {
          return firstdate <= e.start && e.start < lastdate;
        }
        return (e.start >= firstdate && e.start < lastdate) ||
          (firstdate >= e.start && firstdate <= e.end) ||
          (e.start <= firstdate && lastdate < e.end);
      })
      .sort((e1, e2) => e1.start.getTime() - e2.start.getTime())
      .map(e => {
        const event = {
          width: (1 / 7) * 100 + '%',
          left: (e.start.getDay() - firstday) / 7 * 100 + '%',
          startsBeforeWeek: true,
          endsAfterWeek: true,
          title: e.title,
          color: e.color,
          url: e.url
        };

        if (e.end) {

          if (e.start >= firstdate && e.end < lastdate) {

            event.width = ((e.end.getDay() - e.start.getDay() + 1) / 7) * 100 + '%';
            event.left = ((e.start.getDay() - firstday) / 7) * 100 + '%';

          } else if (e.start < firstdate && (firstdate <= e.end && e.end < lastdate)) {

            event.width = ((e.end.getDay() - firstday + 1) / 7) * 100 + '%';
            event.left = 0 + '%';
            event.startsBeforeWeek = false;

          } else if ((e.start >= firstdate && e.start < lastdate) && e.end >= lastdate) {

            event.width = ((lastday - e.start.getDay() + 1) / 7) * 100 + '%';
            event.left = ((e.start.getDay() - firstday) / 7) * 100 + '%';
            event.endsAfterWeek = false;

          } else if (e.start <= firstdate && lastdate < e.end) {

            event.width = '100%';
            event.left = '0%';
            event.startsBeforeWeek = false;
            event.endsAfterWeek = false;

          }
        }

        return event;
      });
  }

  prev() {
    this.nstr.setDate(this.nstr.getDate() - 7);
    this.setWeekDays();
  }

  next() {
    this.nstr.setDate(this.nstr.getDate() + 7);
    this.setWeekDays();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nstr || changes.events) {
      this.setWeekDays();
    }
  }
}
