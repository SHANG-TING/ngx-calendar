import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, HostListener } from '@angular/core';
import { CalendarWeek, CalendarDay, CalendarEvent } from '../../@core/models';
import { NgxCalendarService } from '../../ngx-calendar.service';

@Component({
  selector: 'ngx-calendar-month-view',
  templateUrl: './ngx-calendar-month-view.component.html',
  styleUrls: ['./ngx-calendar-month-view.component.scss']
})
export class NgxCalendarMonthViewComponent implements OnChanges {

  @Input() weekNames: string[] = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  @Input() yearName = '年';
  @Input() monthName = '月';
  @Input() events: CalendarEvent[] = [];
  @Input() nstr = new Date();

  @Output() open: EventEmitter<any> = new EventEmitter();

  /**
   * 現在選的dayElm
   */
  nowDayElm;
  /**
   * 現在選的week
   */
  nowWeek;

  calendarData = this._service.getCalendar(this.nstr, this.ynow, this.mnow, this.dnow, this.events);

  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    // 為了隨著視窗大小變更時，去移動三角形的位置。
    if (this.nowWeek && this.nowDayElm) {
      this.nowWeek.style.left = `${this.nowDayElm.offsetLeft + this.nowDayElm.offsetWidth / 2}px`;
    }
  }

  get ynow() { return this.nstr.getFullYear(); }
  get mnow() { return this.nstr.getMonth(); }
  get dnow() { return this.nstr.getDate(); }

  constructor(private _service: NgxCalendarService) { }

  prev() {
    this.nstr.setMonth(this.nstr.getMonth() - 1);
    this.calendarData = this._service.getCalendar(this.nstr, this.ynow, this.mnow, this.dnow, this.events);
  }

  next() {
    this.nstr.setMonth(this.nstr.getMonth() + 1);
    this.calendarData = this._service.getCalendar(this.nstr, this.ynow, this.mnow, this.dnow, this.events);
  }

  showEventList(week: CalendarWeek, day: CalendarDay, dayElm: HTMLElement) {
    if (day.events.length) {
      if (week.selectedDay && week.selectedDay === day) {
        this.nowDayElm = this.nowWeek = undefined;
        week.selectedDay = undefined;
      } else {
        this.calendarData.forEach(w => {
          w.selectedDay = undefined;
        });

        this.nowWeek = week;
        this.nowDayElm = dayElm;
        week.selectedDay = day;
        week.style.left = `${dayElm.offsetLeft + dayElm.offsetWidth / 2}px`;
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
      this.calendarData = this._service.getCalendar(this.nstr, this.ynow, this.mnow, this.dnow, this.events);
    }
  }

}
