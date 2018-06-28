import {
  Component, OnInit, Input, ElementRef, OnChanges, SimpleChanges,
  Output, EventEmitter, HostListener, ComponentFactoryResolver
} from '@angular/core';
import { CalendarWeek, CalendarDay, CalendarEvent, colors } from './@core/models';
import { NgxCalendarService } from './ngx-calendar.service';
import { PopUpService } from './@core/components';
import { NgxCalendarMonthPopupComponent } from './month/ngx-calendar-month-popup/ngx-calendar-month-popup.component';

@Component({
  selector: 'ngx-calendar',
  templateUrl: './ngx-calendar.component.html',
  styleUrls: ['./ngx-calendar.component.css']
})
export class NgxCalendarComponent implements OnInit, OnChanges {
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
  component = this._factory.resolveComponentFactory(NgxCalendarMonthPopupComponent);

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
  get monDetail() { return `${this.ynow} ${this.yearName} ${this.mnow + 1} ${this.monthName}`; }

  constructor(
    private _service: NgxCalendarService,
    private _pop: PopUpService,
    private _factory: ComponentFactoryResolver) { }

  ngOnInit() {
  }

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

  openSelector() {
    this._pop.open(this.component, {
      disableTitle: true,
      disableCloseButton: true,
      data: {},
    }).subscribe(selectedDate => {
      if (selectedDate) {
        this.nstr = selectedDate;
        this.calendarData = this._service.getCalendar(this.nstr, this.ynow, this.mnow, this.dnow, this.events);
      }
    });
  }

  trackByFn(index, item) {
    return index;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.events) {
      this.calendarData = this._service.getCalendar(this.nstr, this.ynow, this.mnow, this.dnow, this.events);
    }
  }

}
