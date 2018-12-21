import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxRxModalModule } from 'ngx-rx-modal';
import { NgxHmCalendarDayModule } from './day/ngx-hm-calendar-day.module';
import { NgxHmCalendarMonthModule } from './month/ngx-hm-calendar-month.module';
import { NgxHmCalendarComponent } from './ngx-hm-calendar.component';
import { NgxHmCalendarWeekModule } from './week/ngx-hm-calendar-week.module';

@NgModule({
  imports: [
    CommonModule,
    NgxRxModalModule,
    NgxHmCalendarMonthModule,
    NgxHmCalendarWeekModule,
    NgxHmCalendarDayModule,
  ],
  declarations: [NgxHmCalendarComponent],
  exports: [NgxHmCalendarComponent],
})
export class NgxHmCalendarModule {}
