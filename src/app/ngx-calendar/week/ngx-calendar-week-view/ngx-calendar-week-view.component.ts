import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { getMutipleEvents } from '../../../ngx-calendar/month/utils';
import { CalendarElmDetial, CalendarEvent, CalendarWeekDay } from '../../ngx-calendar.model';

@Component({
  selector: 'ngx-calendar-week-view',
  templateUrl: './ngx-calendar-week-view.component.html',
  styleUrls: ['./ngx-calendar-week-view.component.scss'],
})
export class NgxCalendarWeekViewComponent implements OnInit, OnChanges {
  @Input()
  className = 'black';
  @Input()
  dayName = '號';
  @Input()
  weekNames: string[] = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  @Input()
  weeklyEvents: CalendarEvent[] = [];
  @Input()
  events: CalendarEvent[] = [];
  @Input()
  nstr = new Date();

  @Output()
  open: EventEmitter<any> = new EventEmitter();

  weekDays: CalendarWeekDay[] = [];
  weekEvents: CalendarElmDetial<string>[] = [];

  constructor() {}

  ngOnInit(): void {
    this.initValue();
  }

  private initValue() {
    this.setWeekDays();
    this.setWeekEvents();
  }

  setWeekDays(): void {
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
        isToday: date.toDateString() === today.toDateString(),
      } as CalendarWeekDay);
    }
  }

  setWeekEvents(): void {
    const firstWeekDay = this.weekDays[0];
    const firstdate = new Date(firstWeekDay.year, firstWeekDay.month, firstWeekDay.day);
    const firstday = firstdate.getDay();

    const lastWeekDay = this.weekDays[6];
    const lastdate = new Date(lastWeekDay.year, lastWeekDay.month, lastWeekDay.day);
    const lastday = lastdate.getDay();
    lastdate.setDate(lastdate.getDate() + 1);

    this.weekEvents = this.events
      .concat(...this.weeklyEvents.map(getMutipleEvents(firstWeekDay.year, firstWeekDay.month)))
      .filter(e => {
        return (
          (e.start >= firstdate && e.start < lastdate) ||
          (firstdate >= e.start && firstdate <= e.end) ||
          (e.start <= firstdate && lastdate < e.end)
        );
      })
      .sort((e1, e2) => e1.start.getTime() - e2.start.getTime())
      .map(e => {
        const event: CalendarElmDetial<number> = {
          style: {
            width: 7,
            left: e.start.getDay() - firstday,
            color: e.color,
          },
          startsBeforeWeek: true,
          endsAfterWeek: true,
          title: e.title,
          url: e.url,
          data: e,
        };

        if (e.start >= firstdate && e.end < lastdate) {
          event.style.width = e.end.getDay() - e.start.getDay() + 1;
          event.style.left = e.start.getDay() - firstday;
        } else if (e.start < firstdate && (firstdate <= e.end && e.end < lastdate)) {
          event.style.width = e.end.getDay() - firstday + 1;
          event.style.left = 0;
          event.startsBeforeWeek = false;
        } else if (e.start >= firstdate && e.start < lastdate && e.end >= lastdate) {
          event.style.width = lastday - e.start.getDay() + 1;
          event.style.left = e.start.getDay() - firstday;
          event.endsAfterWeek = false;
        } else if (e.start <= firstdate && lastdate < e.end) {
          event.style.width = 7;
          event.style.left = 0;
          event.startsBeforeWeek = false;
          event.endsAfterWeek = false;
        }

        return {
          ...event,
          style: {
            width: `${(event.style.width / 7) * 100}%`,
            left: `${(event.style.left / 7) * 100}%`,
            color: e.color,
          },
        };
      });
  }

  prev(): void {
    this.nstr.setDate(this.nstr.getDate() - 7);
    this.initValue();
  }

  next(): void {
    this.nstr.setDate(this.nstr.getDate() + 7);
    this.initValue();
  }

  openEvent(event): void {
    this.open.emit(event);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nstr || changes.events) {
      this.initValue();
    }
  }
}
