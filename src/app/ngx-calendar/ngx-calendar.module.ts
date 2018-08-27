import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCalendarComponent } from './ngx-calendar.component';
import { NgxCalendarMonthModule } from './month/ngx-calendar-month.module';
import { NgxCalendarWeekModule } from './week/ngx-calendar-week.module';
import { NgxCalendarDayModule } from './day/ngx-calendar-day.module';
import { NgxRxModalModule } from 'ngx-rx-modal';

@NgModule({
  imports: [
    CommonModule,
    NgxRxModalModule,
    NgxCalendarMonthModule,
    NgxCalendarWeekModule,
    NgxCalendarDayModule
  ],
  declarations: [
    NgxCalendarComponent
  ],
  exports: [
    NgxCalendarComponent
  ]
})
export class NgxCalendarModule { }
