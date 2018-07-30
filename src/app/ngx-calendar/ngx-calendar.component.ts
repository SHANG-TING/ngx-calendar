import {
  Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, ViewChild, AfterViewInit
} from '@angular/core';
import { CalendarEvent, CalendarViewMode } from './@core/models';
import { PopUpService } from './@core/components';
import { NgxCalendarMonthPopupComponent } from './month/ngx-calendar-month-popup/ngx-calendar-month-popup.component';
import { NgxCalendarMonthViewComponent } from './month/ngx-calendar-month-view';
import { NgxCalendarWeekViewComponent } from './week/ngx-calendar-week-view';
import { NgxCalendarDayViewComponent } from './day/ngx-calendar-day-view';
import { animateFactory } from './@core/animation';

@Component({
  selector: 'ngx-calendar',
  templateUrl: './ngx-calendar.component.html',
  styleUrls: ['./ngx-calendar.component.scss'],
  animations: [
    animateFactory()
  ]
})
export class NgxCalendarComponent implements OnInit, AfterViewInit {

  @Input() weekNames: string[] = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  @Input() yearName = '年';
  @Input() monthName = '月';
  @Input() dayName = '日';
  @Input() events: CalendarEvent[] = [];
  @Input() nstr = new Date();
  @Output() open: EventEmitter<any> = new EventEmitter();

  @Input() className = 'black';
  @Input() size = {
    width: '100vw',
    height: '100vh'
  };

  /**
   * 顯示模式
   */
  viewMode: CalendarViewMode = CalendarViewMode.month;

  get ynow() { return this.nstr.getFullYear(); }
  get mnow() { return this.nstr.getMonth(); }
  get dnow() { return this.nstr.getDate(); }
  get monDetail() {
    let result = `${this.ynow} ${this.yearName} ${this.mnow + 1} ${this.monthName}`;

    if (this.viewMode === CalendarViewMode.day) {
      result = `${result} ${this.dnow} ${this.dayName}`;
    }

    return result;
  }

  @ViewChild(NgxCalendarMonthViewComponent)
  private monthComponent: NgxCalendarMonthViewComponent;

  @ViewChild(NgxCalendarWeekViewComponent)
  private weekComponent: NgxCalendarWeekViewComponent;

  @ViewChild(NgxCalendarDayViewComponent)
  private dayComponent: NgxCalendarDayViewComponent;

  private monthPopupComponent = this._factory.resolveComponentFactory(NgxCalendarMonthPopupComponent);

  legendOpen = 'flyOut';

  constructor(
    private _pop: PopUpService,
    private _factory: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  prev(): void {
    switch (this.viewMode) {
      case CalendarViewMode.month:
        this.monthComponent.prev();
        break;
      case CalendarViewMode.week:
        this.weekComponent.prev();
        break;
      case CalendarViewMode.day:
        this.dayComponent.prev();
        break;
    }
  }

  next(): void {
    switch (this.viewMode) {
      case CalendarViewMode.month:
        this.monthComponent.next();
        break;
      case CalendarViewMode.week:
        this.weekComponent.next();
        break;
      case CalendarViewMode.day:
        this.dayComponent.next();
        break;
    }
  }

  openEvent(event: CalendarEvent): void {
    this.open.emit(event);
  }

  openSelector(): void {
    this._pop.open(this.monthPopupComponent, {
      disableTitle: true,
      disableCloseButton: true,
      data: { theme: this.className, containerViewMode: this.viewMode},
    }).subscribe(selectedDate => {
      if (selectedDate) {
        this.nstr = selectedDate;
      }
    });
  }

  chaneMode(mode: any): void {
    this.viewMode = mode;
  }

  legendToggle(): void {
    this.legendOpen = this.legendOpen === 'flyIn' ? 'flyOut' : 'flyIn';
  }

}
