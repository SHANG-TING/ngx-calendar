import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgxRxModalService } from 'ngx-rx-modal';
import { NgxCalendarDayViewComponent } from './day/ngx-calendar-day-view/ngx-calendar-day-view.component';
import { NgxCalendarMonthPopupComponent } from './month/ngx-calendar-month-popup/ngx-calendar-month-popup.component';
import { NgxCalendarMonthViewComponent } from './month/ngx-calendar-month-view/ngx-calendar-month-view.component';
import { CalendarEvent, CalendarEventCategory, CalendarViewMode } from './ngx-calendar.model';
import { NgxCalendarWeekViewComponent } from './week/ngx-calendar-week-view/ngx-calendar-week-view.component';

const time = '150ms linear';

@Component({
  selector: 'ngx-calendar',
  templateUrl: './ngx-calendar.component.html',
  styleUrls: ['./ngx-calendar.component.scss'],
  animations: [
    trigger('animate', [
      state(
        'flyOut',
        style({
          transform: 'translateX(calc(100% - 55px))',
        }),
      ),
      state(
        'flyIn',
        style({
          transform: 'translateX(0)',
        }),
      ),
      transition('flyOut => flyIn', [
        style({
          transform: 'translateX(calc(100% - 55px))',
        }),
        animate(time),
      ]),
      transition('flyIn => flyOut', [
        style({
          transform: 'translateX(0)',
        }),
        animate(time),
      ]),
    ]),
  ],
})
export class NgxCalendarComponent {
  @Input()
  weekNames: string[] = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  @Input()
  yearName = '年';
  @Input()
  monthName = '月';
  @Input()
  dayName = '日';
  @Input()
  eventCategorys: CalendarEventCategory[] = [];
  @Input()
  weeklyEvents: CalendarEvent[] = [];
  @Input()
  events: CalendarEvent[] = [];
  @Input()
  nstr = new Date();
  @Output()
  open: EventEmitter<any> = new EventEmitter();

  @Input()
  className = 'black';
  @Input()
  size = {
    width: '100vw',
    height: '100vh',
  };

  /**
   * 顯示模式
   */
  viewMode: CalendarViewMode = CalendarViewMode.month;

  get ynow() {
    return this.nstr.getFullYear();
  }
  get mnow() {
    return this.nstr.getMonth();
  }
  get dnow() {
    return this.nstr.getDate();
  }
  get monDetail() {
    let result = `${this.ynow} ${this.yearName} ${this.mnow + 1} ${this.monthName}`;

    if (this.viewMode === CalendarViewMode.day) {
      result = `${result} ${this.dnow} ${this.dayName}`;
    }

    return result;
  }

  legendOpen = 'flyOut';

  @ViewChild(NgxCalendarMonthViewComponent)
  private monthComponent: NgxCalendarMonthViewComponent;

  @ViewChild(NgxCalendarWeekViewComponent)
  private weekComponent: NgxCalendarWeekViewComponent;

  @ViewChild(NgxCalendarDayViewComponent)
  private dayComponent: NgxCalendarDayViewComponent;

  private monthPopupComponent = this._factory.resolveComponentFactory(
    NgxCalendarMonthPopupComponent,
  );

  constructor(private _model: NgxRxModalService, private _factory: ComponentFactoryResolver) {}

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

  openSelector($event: MouseEvent): void {
    this._model
      .open(this.monthPopupComponent, {
        disableCloseButton: true,
        panelStyle: {
          top: `${$event.offsetY}px`,
        },
        data: { theme: this.className, containerViewMode: this.viewMode },
      })
      .subscribe(selectedDate => {
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
