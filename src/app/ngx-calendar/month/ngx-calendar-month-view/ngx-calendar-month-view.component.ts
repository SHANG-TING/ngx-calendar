import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CalendarWeek, CalendarDay, CalendarEvent } from '../../ngx-calendar.model';
import { getCalendar } from '../utils';

@Component({
  selector: 'ngx-calendar-month-view',
  templateUrl: './ngx-calendar-month-view.component.html',
  styleUrls: ['./ngx-calendar-month-view.component.scss', './color.scss']
})
export class NgxCalendarMonthViewComponent implements OnChanges {

  @Input() className = 'black';
  @Input() weekNames: string[] = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  @Input() yearName = '年';
  @Input() monthName = '月';
  @Input() events: CalendarEvent[] = [];
  @Input() nstr = new Date();

  @Output() open: EventEmitter<any> = new EventEmitter();

  calendarData = getCalendar(this.nstr, this.ynow, this.mnow, this.dnow, this.events);

  private eachPresent = 100 / 14;

  get ynow() { return this.nstr.getFullYear(); }
  get mnow() { return this.nstr.getMonth(); }
  get dnow() { return this.nstr.getDate(); }

  constructor() { }

  prev() {
    this.nstr.setMonth(this.nstr.getMonth() - 1);
    this.calendarData = getCalendar(this.nstr, this.ynow, this.mnow, this.dnow, this.events);
  }

  next() {
    this.nstr.setMonth(this.nstr.getMonth() + 1);
    this.calendarData = getCalendar(this.nstr, this.ynow, this.mnow, this.dnow, this.events);
  }

  showEventList(week: CalendarWeek, day: CalendarDay) {
    if (day.events.length) {
      if (week.selectedDay && week.selectedDay === day) {
        week.selectedDay = undefined;
      } else {
        this.calendarData.forEach(w => {
          w.selectedDay = undefined;
        });

        week.selectedDay = day;

        const present = (day.name * 2 + 1) * this.eachPresent;
        week.style = {
          'flex': `1 1 ${present}%`,
          'max-width': `${present}%`,
          'min-width': `${present}%`
        };
      }
    }
  }

  openEvent(event: CalendarEvent) {
    this.open.emit(event);
  }

  trackByFn(index, item) {
    return index;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.events || changes.nstr) {
      this.calendarData = getCalendar(this.nstr, this.ynow, this.mnow, this.dnow, this.events);
    }
  }

}
