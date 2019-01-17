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
import { NgxHmCalendarEvent, NgxHmCalendarEventCategory, NgxHmCalendarViewMode } from './ngx-hm-calendar.model';
import { NgxHmCalendarMonthViewComponent } from './month/ngx-hm-calendar-month-view/ngx-hm-calendar-month-view.component';
import { NgxHmCalendarWeekViewComponent } from './week/ngx-hm-calendar-week-view/ngx-hm-calendar-week-view.component';
import { NgxHmCalendarDayViewComponent } from './day/ngx-hm-calendar-day-view/ngx-hm-calendar-day-view.component';
import { NgxHmCalendarMonthPopupComponent } from './month/ngx-hm-calendar-month-popup/ngx-hm-calendar-month-popup.component';

const time = '150ms linear';

@Component({
  selector: 'ngx-hm-calendar',
  templateUrl: './ngx-hm-calendar.component.html',
  styleUrls: ['./ngx-hm-calendar.component.scss'],
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
export class NgxHmCalendarComponent {
  @Input()
  weekNames: string[] = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  @Input()
  yearName = '年';
  @Input()
  monthName = '月';
  @Input()
  dayName = '日';
  @Input()
  eventCategorys: NgxHmCalendarEventCategory[] = [];
  @Input()
  weeklyEvents: NgxHmCalendarEvent[] = [];
  @Input()
  events: NgxHmCalendarEvent[] = [];
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
  viewMode: NgxHmCalendarViewMode = NgxHmCalendarViewMode.month;

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

    if (this.viewMode === NgxHmCalendarViewMode.day) {
      result = `${result} ${this.dnow} ${this.dayName}`;
    }

    return result;
  }

  legendOpen = 'flyOut';

  @ViewChild(NgxHmCalendarMonthViewComponent)
  private monthComponent: NgxHmCalendarMonthViewComponent;

  @ViewChild(NgxHmCalendarWeekViewComponent)
  private weekComponent: NgxHmCalendarWeekViewComponent;

  @ViewChild(NgxHmCalendarDayViewComponent)
  private dayComponent: NgxHmCalendarDayViewComponent;

  private monthPopupComponent = this._factory.resolveComponentFactory(
    NgxHmCalendarMonthPopupComponent,
  );

  constructor(private _model: NgxRxModalService, private _factory: ComponentFactoryResolver) {}

  prev(): void {
    switch (this.viewMode) {
      case NgxHmCalendarViewMode.month:
        this.monthComponent.prev();
        break;
      case NgxHmCalendarViewMode.week:
        this.weekComponent.prev();
        break;
      case NgxHmCalendarViewMode.day:
        this.dayComponent.prev();
        break;
    }
  }

  next(): void {
    switch (this.viewMode) {
      case NgxHmCalendarViewMode.month:
        this.monthComponent.next();
        break;
      case NgxHmCalendarViewMode.week:
        this.weekComponent.next();
        break;
      case NgxHmCalendarViewMode.day:
        this.dayComponent.next();
        break;
    }
  }

  openEvent(event: NgxHmCalendarEvent): void {
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
